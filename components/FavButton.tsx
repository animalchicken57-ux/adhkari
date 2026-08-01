"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";
import { FAV_EVENT, type Fav, isFav, toggleFav } from "@/lib/favourites";

type Props = Omit<Fav, "key" | "at">;

export default function FavButton(props: Props) {
  const t = useT();
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  // localStorage غير متاح على الخادم — نقرأ بعد التحميل فقط
  useEffect(() => {
    const sync = () => setOn(isFav(props.kind, props.id));
    sync();
    setReady(true);
    window.addEventListener(FAV_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAV_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [props.kind, props.id]);

  return (
    <button
      onClick={() => setOn(toggleFav(props))}
      aria-pressed={on}
      aria-label={on ? t("fav.remove") : t("fav.add")}
      title={on ? t("fav.remove") : t("fav.add")}
      className={`shrink-0 rounded-xl px-2.5 py-1.5 text-xl leading-none transition active:scale-90 ${
        on
          ? "text-rose-500 hover:bg-rose-500/10"
          : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-rose-400"
      } ${ready ? "" : "opacity-0"}`}
    >
      {on ? "♥" : "♡"}
    </button>
  );
}
