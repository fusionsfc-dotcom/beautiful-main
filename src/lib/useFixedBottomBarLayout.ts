import { useEffect, useState, type RefObject } from "react";

export interface FixedBottomBarLayout {
  top: number;
  left: number;
  width: number;
  /** 레이아웃 뷰포트 하단과 비주얼 하단 사이 빈 공간 (px) */
  gapFillHeight: number;
}

const DEFAULT_HEIGHT = 64;

function measureLayout(ref: RefObject<HTMLElement | null>): FixedBottomBarLayout {
  const el = ref.current;
  const vv = window.visualViewport;
  const height = el?.getBoundingClientRect().height ?? DEFAULT_HEIGHT;

  if (!vv) {
    const top = window.innerHeight - height;
    return { top, left: 0, width: window.innerWidth, gapFillHeight: 0 };
  }

  const top = vv.offsetTop + vv.height - height;
  const gapFillHeight = Math.max(
    0,
    Math.round(window.innerHeight - vv.offsetTop - vv.height)
  );

  return {
    top: Math.max(0, Math.round(top)),
    left: Math.round(vv.offsetLeft),
    width: Math.round(vv.width),
    gapFillHeight,
  };
}

function isSameLayout(a: FixedBottomBarLayout, b: FixedBottomBarLayout) {
  return (
    a.top === b.top &&
    a.left === b.left &&
    a.width === b.width &&
    a.gapFillHeight === b.gapFillHeight
  );
}

/**
 * iOS Chrome/Safari: fixed bottom 대신 visual viewport 하단에 top 기준으로 고정.
 */
export function useFixedBottomBarLayout(ref: RefObject<HTMLElement | null>) {
  const [layout, setLayout] = useState<FixedBottomBarLayout>(() => ({
    top: 0,
    left: 0,
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    gapFillHeight: 0,
  }));

  useEffect(() => {
    let rafId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const next = measureLayout(ref);
        setLayout((prev) => (isSameLayout(prev, next) ? prev : next));
      });
    };

    scheduleUpdate();

    const vv = window.visualViewport;
    vv?.addEventListener("resize", scheduleUpdate);
    vv?.addEventListener("scroll", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate);
    document.addEventListener("touchmove", scheduleUpdate, { passive: true });
    document.addEventListener("touchend", scheduleUpdate, { passive: true });

    const ro = new ResizeObserver(scheduleUpdate);
    const el = ref.current;
    if (el) ro.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      vv?.removeEventListener("resize", scheduleUpdate);
      vv?.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      document.removeEventListener("touchmove", scheduleUpdate);
      document.removeEventListener("touchend", scheduleUpdate);
      ro.disconnect();
    };
  }, [ref]);

  return layout;
}
