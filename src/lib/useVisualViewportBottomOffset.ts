import { useEffect, useState } from "react";

/**
 * iOS Chrome/Safari에서 fixed bottom 요소가 스크롤 시 떠 보이는 현상 보정.
 * 레이아웃 뷰포트 하단과 visual viewport 하단 사이 gap(px)을 반환한다.
 */
export function useVisualViewportBottomOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const vv = window.visualViewport;
      if (!vv) {
        setOffset(0);
        return;
      }
      const gap = window.innerHeight - vv.height - vv.offsetTop;
      setOffset(Math.max(0, Math.round(gap)));
    };

    update();
    const vv = window.visualViewport;
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return offset;
}
