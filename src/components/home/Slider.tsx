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
      <div ref={ref} onScroll={update} onPointerDown={dragScroll} className={`drag-scroll ${sliderClassName}`}>
        {children}
      </div>
      {canPrev && <SliderArrow dir="prev" onClick={() => go(-1)} />}
      {canNext && <SliderArrow dir="next" onClick={() => go(1)} />}
    </div>
  );
}

/** Mouse drag-to-scroll for a horizontal scroll-snap row: disables snap and text selection while dragging, moves one card on release (>40px) or returns to the original card, and swallows the click after a drag. */
export function dragScroll(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  if (e.pointerType !== "mouse" || e.button !== 0) return;
  const x0 = e.clientX;
  const l0 = el.scrollLeft;
  let moved = false;
  const prevSnap = el.style.scrollSnapType;
  const prevSelect = el.style.userSelect;
  el.style.scrollSnapType = "none";
  el.style.userSelect = "none";
  el.classList.add("is-dragging");
  const noDrag = (de: DragEvent) => de.preventDefault();
  const move = (ev: PointerEvent) => {
    const dx = ev.clientX - x0;
    if (Math.abs(dx) > 4) moved = true;
    el.scrollLeft = l0 - dx;
  };
  const end = (ev: PointerEvent) => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", end);
    window.removeEventListener("pointercancel", end);
    window.removeEventListener("dragstart", noDrag);
    el.classList.remove("is-dragging");
    el.style.userSelect = prevSelect;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const w = (card?.offsetWidth ?? el.clientWidth * 0.8) + gap;
    const dx = ev.type === "pointercancel" ? 0 : ev.clientX - x0;
    const start = Math.round(l0 / w) * w;
    const target = Math.abs(dx) > 40 ? start + Math.sign(-dx) * w : start;
    const max = el.scrollWidth - el.clientWidth;
    const left = Math.max(0, Math.min(max, target));
    let restored = false;
    const restore = () => {
      if (restored) return;
      restored = true;
      el.removeEventListener("scrollend", restore);
      el.style.scrollSnapType = prevSnap;
    };
    if (Math.abs(el.scrollLeft - left) < 1) restore();
    else {
      el.addEventListener("scrollend", restore);
      setTimeout(restore, 600);
      el.scrollTo({ left, behavior: "smooth" });
    }
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
  window.addEventListener("pointerup", end);
  window.addEventListener("pointercancel", end);
  window.addEventListener("dragstart", noDrag);
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
