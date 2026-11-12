import React, { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

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
      <div ref={ref} onScroll={update} onPointerDown={dragScroll} className={sliderClassName}>
        {children}
      </div>
      {canPrev && <SliderArrow dir="prev" onClick={() => go(-1)} />}
      {canNext && <SliderArrow dir="next" onClick={() => go(1)} />}
    </div>
  );
}

/** Mouse drag-to-scroll for a horizontal scroll-snap row: disables snap while dragging, snaps one card on release (>40px), and swallows the click after a drag. */
export function dragScroll(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    if ( e.pointerType !== "mouse" || e.button !== 0) return;
    const x0 = e.clientX;
    const l0 = el.scrollLeft;
    let moved = false;
    const prevSnap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - x0;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = l0 - dx;
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.style.scrollSnapType = prevSnap;
      const card = el.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const w = (card?.offsetWidth ?? el.clientWidth * 0.8) + gap;
      const dx = ev.clientX - x0;
      el.scrollTo({ left: Math.abs(dx) > 40 ? l0 + Math.sign(-dx) * w : l0, behavior: "smooth" });
      if (moved) {
        const block = (ce: MouseEvent) => {
          ce.preventDefault();
          ce.stopPropagation();
          window.removeEventListener("click", block, true);
        };
        window.addEventListener("click", block, true);
        setTimeout(() => window.removeEventListener("click", block, true), 50);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
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
