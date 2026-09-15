ALTER TABLE public.ttc_journeys
  DROP CONSTRAINT IF EXISTS ttc_journeys_ivf_transfer_paired_chk;

ALTER TABLE public.ttc_journeys
  ADD CONSTRAINT ttc_journeys_ivf_transfer_paired_chk
  CHECK (
    (ivf_transfer_date IS NULL AND ivf_transfer_type IS NULL)
    OR (
      ivf_transfer_date IS NOT NULL
      AND ivf_transfer_type IS NOT NULL
      AND ivf_transfer_type IN ('3day','5day')
    )
  );