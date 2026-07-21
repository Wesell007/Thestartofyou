const configuredUrl = import.meta.env.VITE_JOURNAL_PURCHASE_URL?.trim();

export const JOURNAL_PURCHASE_URL =
  configuredUrl && /^https:\/\//i.test(configuredUrl)
    ? configuredUrl
    : "https://www.amazon.co.uk/s?k=The+Start+of+You+pregnancy+journal";
