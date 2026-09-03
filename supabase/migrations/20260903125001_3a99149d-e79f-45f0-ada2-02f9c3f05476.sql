-- AIC-4 conversation continuity: account-owned conversation history.
CREATE TABLE public.companion_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text,
  archived_at timestamptz,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.companion_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.companion_conversations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 8000),
  client_message_id text CHECK (client_message_id IS NULL OR char_length(client_message_id) BETWEEN 8 AND 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX companion_conversations_user_recent_idx
  ON public.companion_conversations (user_id, last_message_at DESC);
CREATE INDEX companion_messages_conversation_idx
  ON public.companion_messages (conversation_id, created_at);
CREATE UNIQUE INDEX companion_messages_client_id_idx
  ON public.companion_messages (conversation_id, client_message_id)
  WHERE client_message_id IS NOT NULL;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.companion_conversations TO authenticated;
GRANT ALL ON public.companion_conversations TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companion_messages TO authenticated;
GRANT ALL ON public.companion_messages TO service_role;

ALTER TABLE public.companion_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companion_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners read their conversations"
  ON public.companion_conversations FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "Owners create their conversations"
  ON public.companion_conversations FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Owners update their conversations"
  ON public.companion_conversations FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Owners delete their conversations"
  ON public.companion_conversations FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Child rows are owned twice over: by the row's own user_id AND by the parent
-- conversation, so a message can never be attached to somebody else's thread.
CREATE POLICY "Owners read their messages"
  ON public.companion_messages FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.companion_conversations c
      WHERE c.id = companion_messages.conversation_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Owners create their messages"
  ON public.companion_messages FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.companion_conversations c
      WHERE c.id = companion_messages.conversation_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Owners update their messages"
  ON public.companion_messages FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.companion_conversations c
      WHERE c.id = companion_messages.conversation_id AND c.user_id = auth.uid()
    )
  )
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.companion_conversations c
      WHERE c.id = companion_messages.conversation_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Owners delete their messages"
  ON public.companion_messages FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.companion_conversations c
      WHERE c.id = companion_messages.conversation_id AND c.user_id = auth.uid()
    )
  );

-- Ownership is never transferable, and a saved message may not be moved into
-- another conversation.
CREATE OR REPLACE FUNCTION public.validate_companion_conversation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'A conversation cannot change owner' USING ERRCODE = '42501';
  END IF;
  NEW.title := nullif(btrim(coalesce(NEW.title, '')), '');
  IF NEW.title IS NOT NULL AND char_length(NEW.title) > 120 THEN
    NEW.title := substr(NEW.title, 1, 120);
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_companion_message()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_owner uuid;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      RAISE EXCEPTION 'A message cannot change owner' USING ERRCODE = '42501';
    END IF;
    IF NEW.conversation_id IS DISTINCT FROM OLD.conversation_id THEN
      RAISE EXCEPTION 'A message cannot move to another conversation' USING ERRCODE = '42501';
    END IF;
  END IF;

  SELECT user_id INTO v_owner FROM public.companion_conversations WHERE id = NEW.conversation_id;
  IF v_owner IS NULL OR v_owner IS DISTINCT FROM NEW.user_id THEN
    RAISE EXCEPTION 'That conversation could not be found on this account' USING ERRCODE = '42501';
  END IF;

  NEW.content := btrim(NEW.content);
  IF NEW.content = '' THEN
    RAISE EXCEPTION 'There is nothing to save yet' USING ERRCODE = '22023';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER companion_conversations_validate
  BEFORE INSERT OR UPDATE ON public.companion_conversations
  FOR EACH ROW EXECUTE FUNCTION public.validate_companion_conversation();
CREATE TRIGGER companion_conversations_set_updated_at
  BEFORE UPDATE ON public.companion_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER companion_messages_validate
  BEFORE INSERT OR UPDATE ON public.companion_messages
  FOR EACH ROW EXECUTE FUNCTION public.validate_companion_message();
CREATE TRIGGER companion_messages_set_updated_at
  BEFORE UPDATE ON public.companion_messages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Keep the conversation's recency marker in step with its messages.
CREATE OR REPLACE FUNCTION public.touch_companion_conversation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
BEGIN
  UPDATE public.companion_conversations
     SET last_message_at = greatest(last_message_at, NEW.created_at),
         updated_at = now()
   WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER companion_messages_touch_conversation
  AFTER INSERT ON public.companion_messages
  FOR EACH ROW EXECUTE FUNCTION public.touch_companion_conversation();