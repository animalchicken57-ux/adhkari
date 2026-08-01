// ============================================================
//  المفضّلة — تُحفظ في متصفّح الجهاز (localStorage)
//  Favourites — stored in the device's browser
// ============================================================

export type FavKind = "dua" | "fact" | "prophet" | "book" | "scripture";

export type Fav = {
  /** مفتاح فريد = النوع + معرّف العنصر */
  key: string;
  kind: FavKind;
  id: string;
  title: string;
  /** النص المعروض في صفحة المفضّلة */
  body: string;
  /** سطر صغير أسفل النص (مصدر، مؤلّف، ...) */
  meta?: string;
  icon?: string;
  href: string;
  /** وقت الحفظ — للترتيب من الأحدث */
  at: number;
};

const KEY = "adhkari-favourites";
export const FAV_EVENT = "adhkari:favourites";

export const favKey = (kind: FavKind, id: string) => `${kind}:${id}`;

export function readFavs(): Fav[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Fav[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function write(list: Fav[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* مساحة التخزين ممتلئة أو محظورة */
  }
  // نُعلم بقية الصفحة (الأزرار والعدّاد) بالتغيير
  window.dispatchEvent(new CustomEvent(FAV_EVENT));
}

export function isFav(kind: FavKind, id: string): boolean {
  const k = favKey(kind, id);
  return readFavs().some((f) => f.key === k);
}

/** يضيف أو يزيل — ويُرجع الحالة الجديدة */
export function toggleFav(item: Omit<Fav, "key" | "at">): boolean {
  const key = favKey(item.kind, item.id);
  const list = readFavs();
  const i = list.findIndex((f) => f.key === key);

  if (i >= 0) {
    list.splice(i, 1);
    write(list);
    return false;
  }

  list.unshift({ ...item, key, at: Date.now() });
  write(list);
  return true;
}

export function removeFav(key: string) {
  write(readFavs().filter((f) => f.key !== key));
}

export function clearFavs() {
  write([]);
}
