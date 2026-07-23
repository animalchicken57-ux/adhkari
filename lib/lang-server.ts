import { cookies } from "next/headers";
import type { Lang } from "./i18n";

// يقرأ اللغة المختارة من الكوكيز (للمكوّنات الخادمية)
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get("lang")?.value === "en" ? "en" : "ar";
}
