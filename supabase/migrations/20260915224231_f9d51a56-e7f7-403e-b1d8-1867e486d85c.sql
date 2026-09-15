ALTER TABLE public.ttc_journeys
  ADD COLUMN ivf_transfer_date date,
  ADD COLUMN ivf_transfer_type text;

ALTER TABLE public.ttc_journeys
  ADD CONSTRAINT ttc_journeys_ivf_transfer_paired_chk
  CHECK (
    (ivf_transfer_date IS NULL AND ivf_transfer_type IS NULL)
    OR (ivf_transfer_date IS NOT NULL AND ivf_transfer_type IN ('3day','5day'))
  );