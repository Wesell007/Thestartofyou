-- Convert user-callable journey RPCs from SECURITY DEFINER to SECURITY INVOKER.
-- All tables they touch have owner-scoped RLS policies plus authenticated grants,
-- so the elevated definer context is unnecessary and removes an RLS-bypass surface.

CREATE OR REPLACE FUNCTION public.save_pregnancy_journey(p_lmp_date date, p_due_date date)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;
  if p_due_date <= p_lmp_date or p_due_date > p_lmp_date + 300 then
    raise exception 'Invalid pregnancy dates' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));

  insert into public.pregnancy_journeys (user_id, lmp_date, due_date)
  values (v_user_id, p_lmp_date, p_due_date)
  on conflict (user_id) do update
    set lmp_date = excluded.lmp_date,
        due_date = excluded.due_date,
        updated_at = now();

  insert into public.journeys (user_id, lifecycle)
  values (v_user_id, 'pregnancy')
  on conflict (user_id) do update
    set lifecycle = excluded.lifecycle,
        updated_at = now();
end;
$function$;

CREATE OR REPLACE FUNCTION public.save_ttc_journey(p_stage text, p_last_period_date date, p_cycle_length_days integer, p_period_length_days integer, p_cycle_regularity text, p_actively_trying text, p_uses_ovulation_tests text, p_tracks_symptoms text, p_support_status text, p_ivf_consideration text, p_likely_ovulation_date date, p_fertile_window_start date, p_fertile_window_end date, p_expected_period_date date, p_possible_test_date date)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_lifecycle text;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;
  if p_last_period_date is null
     or p_cycle_length_days not between 21 and 45
     or (p_period_length_days is not null and p_period_length_days not between 1 and 14)
     or p_cycle_regularity not in ('regular', 'irregular', 'unsure')
     or p_actively_trying not in ('yes', 'preparing', 'unsure')
     or p_uses_ovulation_tests not in ('yes', 'no', 'sometimes')
     or p_tracks_symptoms not in ('yes', 'not_now')
     or p_support_status not in ('trying_naturally', 'preparing_to_try', 'considering_help', 'in_treatment')
     or p_ivf_consideration not in ('no', 'considering', 'in_treatment', 'prefer_not_to_say') then
    raise exception 'Invalid TTC journey values' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));
  select lifecycle into v_lifecycle
  from public.journeys
  where user_id = v_user_id;

  if v_lifecycle = 'pregnancy' then
    return 'pregnancy_active';
  end if;

  insert into public.ttc_journeys (
    user_id, stage, last_period_date, cycle_length_days, period_length_days,
    cycle_regularity, actively_trying, uses_ovulation_tests, tracks_symptoms,
    support_status, ivf_consideration, current_cycle_start,
    likely_ovulation_date, fertile_window_start, fertile_window_end,
    expected_period_date, possible_test_date
  ) values (
    v_user_id, p_stage, p_last_period_date, p_cycle_length_days, p_period_length_days,
    p_cycle_regularity, p_actively_trying, p_uses_ovulation_tests, p_tracks_symptoms,
    p_support_status, p_ivf_consideration, p_last_period_date,
    p_likely_ovulation_date, p_fertile_window_start, p_fertile_window_end,
    p_expected_period_date, p_possible_test_date
  )
  on conflict (user_id) do update set
    stage = excluded.stage,
    last_period_date = excluded.last_period_date,
    cycle_length_days = excluded.cycle_length_days,
    period_length_days = excluded.period_length_days,
    cycle_regularity = excluded.cycle_regularity,
    actively_trying = excluded.actively_trying,
    uses_ovulation_tests = excluded.uses_ovulation_tests,
    tracks_symptoms = excluded.tracks_symptoms,
    support_status = excluded.support_status,
    ivf_consideration = excluded.ivf_consideration,
    current_cycle_start = excluded.current_cycle_start,
    likely_ovulation_date = excluded.likely_ovulation_date,
    fertile_window_start = excluded.fertile_window_start,
    fertile_window_end = excluded.fertile_window_end,
    expected_period_date = excluded.expected_period_date,
    possible_test_date = excluded.possible_test_date,
    updated_at = now();

  insert into public.journeys (user_id, lifecycle)
  values (v_user_id, 'ttc')
  on conflict (user_id) do update
    set lifecycle = excluded.lifecycle,
        updated_at = now();

  return 'ok';
end;
$function$;

CREATE OR REPLACE FUNCTION public.delete_active_journey(p_lifecycle text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_current_lifecycle text;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;
  if p_lifecycle not in ('pregnancy', 'ttc') then
    raise exception 'Unsupported lifecycle' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));
  select lifecycle into v_current_lifecycle
  from public.journeys
  where user_id = v_user_id;

  if v_current_lifecycle is distinct from p_lifecycle then
    return false;
  end if;

  if p_lifecycle = 'pregnancy' then
    delete from public.pregnancy_journeys where user_id = v_user_id;
    delete from public.saved_journeys where user_id = v_user_id and journey_type = 'pregnancy';
  else
    delete from public.ttc_journeys where user_id = v_user_id;
  end if;
  delete from public.journeys where user_id = v_user_id and lifecycle = p_lifecycle;
  return true;
end;
$function$;

-- Keep the same callable surface: signed-in users only, never anon.
REVOKE ALL ON FUNCTION public.save_pregnancy_journey(date, date) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.save_ttc_journey(text, date, integer, integer, text, text, text, text, text, text, date, date, date, date, date) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.delete_active_journey(text) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.save_pregnancy_journey(date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_ttc_journey(text, date, integer, integer, text, text, text, text, text, text, date, date, date, date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_active_journey(text) TO authenticated;
