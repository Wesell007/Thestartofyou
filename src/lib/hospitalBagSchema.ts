export type HospitalBagCategoryKey =
  | "parent"
  | "baby"
  | "partner"
  | "documents"
  | "comfort";

export interface HospitalBagCategoryMeta {
  key: HospitalBagCategoryKey;
  label: string;
  intro: string;
}

export const HOSPITAL_BAG_CATEGORIES: HospitalBagCategoryMeta[] = [
  {
    key: "documents",
    label: "Documents",
    intro: "The paperwork that can help your care team.",
  },
  {
    key: "parent",
    label: "Mum or birthing parent",
    intro: "Things you may want for your comfort during and after birth.",
  },
  {
    key: "baby",
    label: "Baby",
    intro: "A few soft basics for the first hours together.",
  },
  {
    key: "partner",
    label: "Birth partner",
    intro: "So the person with you feels ready to stay by your side.",
  },
  {
    key: "comfort",
    label: "After birth and comfort",
    intro: "Small things that can make the room feel more like yours.",
  },
];


export interface HospitalBagDefaultItem {
  category: HospitalBagCategoryKey;
  item_key: string;
  label: string;
  sort_order: number;
}

const D = (
  category: HospitalBagCategoryKey,
  item_key: string,
  label: string,
  sort_order: number,
): HospitalBagDefaultItem => ({ category, item_key, label, sort_order });

export const HOSPITAL_BAG_DEFAULTS: HospitalBagDefaultItem[] = [
  // Mum or birthing parent (7)
  D("parent", "comfortable-nightwear", "Comfortable nightwear", 10),
  D("parent", "going-home-clothes", "Going home clothes", 20),
  D("parent", "maternity-pads", "Maternity pads", 30),
  D("parent", "toiletries", "Toiletries", 40),
  D("parent", "phone-charger", "Phone charger", 50),
  D("parent", "water-bottle", "Water bottle", 60),
  D("parent", "snacks", "Snacks", 70),
  // Baby (7)
  D("baby", "sleepsuits", "Sleepsuits", 10),
  D("baby", "vests", "Vests", 20),
  D("baby", "nappies", "Nappies", 30),
  D("baby", "wipes-or-cotton-wool", "Wipes or cotton wool", 40),
  D("baby", "hat", "Hat", 50),
  D("baby", "blanket", "Blanket", 60),
  D("baby", "going-home-outfit", "Going home outfit", 70),
  // Birth partner (4)
  D("partner", "snacks-and-drinks", "Snacks and drinks", 10),
  D("partner", "phone-charger", "Phone charger", 20),
  D("partner", "change-of-clothes", "Change of clothes", 30),
  D("partner", "important-contacts", "Important contacts", 40),
  // Documents (4)
  D("documents", "maternity-notes", "Maternity notes", 10),
  D("documents", "birth-plan", "Birth plan", 20),
  D("documents", "hospital-information", "Hospital information", 30),
  D("documents", "important-phone-numbers", "Important phone numbers", 40),
  // Comfort items (5)
  D("comfort", "lip-balm", "Lip balm", 10),
  D("comfort", "hair-ties", "Hair ties", 20),
  D("comfort", "pillow-if-preferred", "Pillow if preferred", 30),
  D("comfort", "music-or-headphones", "Music or headphones", 40),
  D("comfort", "small-calming-item", "A small item that helps you feel calm", 50),
];

export const HOSPITAL_BAG_DEFAULT_COUNT = HOSPITAL_BAG_DEFAULTS.length; // 27

export interface HospitalBagItemRow {
  id: string;
  user_id: string;
  category: HospitalBagCategoryKey;
  item_key: string;
  label: string;
  is_custom: boolean;
  packed_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type HospitalBagStatus =
  | "not-started"
  | "few-packed"
  | "coming-together"
  | "nearly-ready"
  | "ready-enough";

export interface HospitalBagProgress {
  packed: number;
  total: number;
  percent: number;
  status: HospitalBagStatus;
}

export const statusFromProgress = (
  packed: number,
  total: number,
  hasRows: boolean,
): HospitalBagStatus => {
  if (!hasRows || total === 0) return "not-started";
  if (packed === 0) return "not-started";
  const pct = packed / total;
  if (pct >= 0.9) return "ready-enough";
  if (pct >= 0.6) return "nearly-ready";
  if (pct >= 0.3) return "coming-together";
  return "few-packed";
};

export const statusLabel = (status: HospitalBagStatus): string => {
  switch (status) {
    case "not-started":
      return "Not started";
    case "few-packed":
      return "A few things packed";
    case "coming-together":
      return "Coming together";
    case "nearly-ready":
      return "Nearly ready";
    case "ready-enough":
      return "Ready enough";
  }
};

export const calculateProgress = (
  rows: HospitalBagItemRow[],
): HospitalBagProgress => {
  const total = rows.length;
  const packed = rows.filter((r) => Boolean(r.packed_at)).length;
  const percent = total === 0 ? 0 : Math.round((packed / total) * 100);
  const status = statusFromProgress(packed, total, total > 0);
  return { packed, total, percent, status };
};

export const slugifyCustomLabel = (label: string): string => {
  const base = label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const suffix = Math.random().toString(36).slice(2, 8);
  const safe = base.length > 0 ? base : "item";
  return `custom-${safe}-${suffix}`;
};
