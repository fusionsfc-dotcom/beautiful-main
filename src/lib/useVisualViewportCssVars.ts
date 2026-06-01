import { useEffect } from "react";

/**
 * iOS Chrome 하단바 보정 — React state 없이 CSS 변수만 갱신 (무한 렌더 방지).
 */
export function useVisualViewportCssVars() {
  useEffect(() => {
    const root = document.documentElement;
    let rafId = 0;

    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const vv = window.visualViewport;
        if (!vv) {
          root.style.setProperty("--vv-bottom-offset", "0px");
          root.style.setProperty("--vv-left-offset", "0px");
          root.style.setProperty("--vv-width", "100%");
          root.style.setProperty("--vv-gap-fill-height", "0px");
          return;
        }

        const gap = Math.max(
          0,
          Math.round(window.innerHeight - vv.height - vv.offsetTop)
        );

        root.style.setProperty("--vv-bottom-offset", `${gap}px`);
        root.style.setProperty("--vv-left-offset", `${Math.round(vv.offsetLeft)}px`);
        root.style.setProperty("--vv-width", `${Math.round(vv.width)}px`);
        root.style.setProperty("--vv-gap-fill-height", `${gap}px`);
      });
    };

    update();

    const vv = window.visualViewport;
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("orientationchange", update);
    document.addEventListener("touchmove", update, { passive: true });
    document.addEventListener("touchend", update, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("orientationchange", update);
      document.removeEventListener("touchmove", update);
      document.removeEventListener("touchend", update);
      root.style.removeProperty("--vv-bottom-offset");
      root.style.removeProperty("--vv-left-offset");
      root.style.removeProperty("--vv-width");
      root.style.removeProperty("--vv-gap-fill-height");
    };
  }, []);
}
