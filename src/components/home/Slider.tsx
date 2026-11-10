import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Horizontal swipe slider with prev/next arrows that render only when scrolling is possible in that direction. */
export function Slider({ children, className = "", sliderClassName }: { children: ReactNode; className?: string; sliderClassName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };
  return (
    <div className={`relative ${className}`}>
      <div ref={ref} onScroll={update} className={sliderClassName}>
        {children}
      </div>
      {canPrev && <SliderArrow dir="prev" onClick={() => go(-1)} />}
      {canNext && <SliderArrow dir="next" onClick={() => go(1)} />}
    </div>
  );
}

function SliderArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Προηγούμενο" : "Επόμενο"}
      onClick={onClick}
      className={`slider-arrow absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full min-[760px]:hidden ${dir === "prev" ? "left-1" : "right-1"}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "prev" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
