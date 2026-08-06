DO $$
DECLARE ids uuid[] := ARRAY[
  '0fc5ad63-180f-4343-abe6-8cfc9a6c4139',
  '716e8814-6a9b-4116-b77a-c850b46d4b61',
  'ff712780-adc1-4751-a21f-23e33b7750b8',
  '82aa636d-4e61-49fe-b5bc-e0876237f04f',
  'a6c1eadd-6ecc-4c25-b126-e8fbc285b0a2',
  '5f65ea2f-6fc5-4700-9079-4e8dd86bb8a0'
]::uuid[];
BEGIN
  DELETE FROM public.babies WHERE user_id = ANY(ids);
  DELETE FROM public.first_year_journeys WHERE user_id = ANY(ids);
  DELETE FROM public.ttc_logs WHERE user_id = ANY(ids);
  DELETE FROM public.ttc_journeys WHERE user_id = ANY(ids);
  DELETE FROM public.saved_journeys WHERE user_id = ANY(ids);
  DELETE FROM public.pregnancy_journeys WHERE user_id = ANY(ids);
  DELETE FROM public.archived_journeys WHERE user_id = ANY(ids);
  DELETE FROM public.journeys WHERE user_id = ANY(ids);
  DELETE FROM public.profiles WHERE user_id = ANY(ids);
END $$;