export type Category = "morning" | "evening";

export type Adhkar = {
  id: number;
  category: Category;
  title: string;
  body: string;
  repeat: number;
  virtue: string | null;
  sort_order: number;
};

export type Completion = {
  adhkar_id: number;
  day: string; // YYYY-MM-DD
};

export const CATEGORY_LABEL: Record<Category, string> = {
  morning: "أذكار الصباح",
  evening: "أذكار المساء",
};
