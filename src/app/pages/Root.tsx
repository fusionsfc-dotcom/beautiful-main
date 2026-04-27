import { Outlet, useLocation, Link } from "react-router";
import { Home, Building2, BookOpen, Info, Stethoscope } from "lucide-react";
import FloatingConsultButton from "../components/FloatingConsultButton";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Root() {
  const location = useLocation();
  
  // 페이지 전환 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.getElementById("__debug")?.remove();

    const box = document.createElement("div");
    box.id = "__debug";
    box.style.cssText = `
      position: fixed;
      top: 60px;
      right: 4px;
      background: yellow;
      color: black;
      font-size: 10px;
      font-family: monospace;
      z-index: 99999;
      padding: 6px 8px;
      border-radius: 4px;
      line-height: 1.4;
      max-width: 200px;
      white-space: pre-wrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(box);

    const update = () => {
      const nav = document.querySelector("nav.lg\\:hidden");
      if (!nav) {
        box.textContent = "NAV 없음";
        return;
      }

      const c = getComputedStyle(nav);
      const r = nav.getBoundingClientRect();
      const parent = nav.parentElement;

      let transformAncestor = "없음";
      let el = nav.parentElement;
      while (el && el !== document.body) {
        const s = getComputedStyle(el);
        if (s.transform !== "none" || s.willChange.includes("transform") || s.filter !== "none") {
          transformAncestor = `${el.tagName}.${el.className.split(" ")[0]} → ${s.transform !== "none" ? "tr" : ""}${s.willChange.includes("transform") ? " wc" : ""}${s.filter !== "none" ? " fl" : ""}`;
          break;
        }
        el = el.parentElement;
      }

      box.textContent =
        `pos: ${c.position}\n` +
        `bot: ${c.bottom}\n` +
        `nav.top: ${r.top.toFixed(0)}\n` +
        `nav.bot: ${r.bottom.toFixed(0)}\n` +
        `winH: ${innerHeight}\n` +
        `vvH: ${window.visualViewport?.height?.toFixed(0) ?? "-"}\n` +
        `gap: ${(innerHeight - r.bottom).toFixed(0)}\n` +
        `parent: ${parent?.tagName}\n` +
        `tr조상: ${transformAncestor}`;
    };

    update();
    const i = setInterval(update, 200);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      clearInterval(i);
      box.remove();
    };
  }, []);
  
  const tabs = [
    { path: "/", label: "홈", icon: Home },
    { path: "/clinics", label: "클리닉", icon: Stethoscope },
    { path: "/facilities", label: "치료환경", icon: Building2 },
    { path: "/columns", label: "뷰티풀이야기", icon: BookOpen },
    { path: "/about", label: "병원소개", icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col bg-white root-wrapper"
      style={{ paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px))" }}
    >
        {/* Global Header - 모든 페이지 상단에 고정 */}
        <GlobalHeader />

        {/* Main Content with Sidebar on Desktop */}
        <div className="flex-1 lg:flex max-w-screen-xl mx-auto w-full gap-8">
          <main className="flex-1">
            <Outlet />
          </main>
          
          {/* Desktop Sidebar & Mobile Floating Button */}
          <aside className="w-80 flex-shrink-0 lg:p-8">
            <FloatingConsultButton />
          </aside>
        </div>

        {/* Global Footer - 모든 페이지 하단에 공통 적용 */}
        <GlobalFooter />
        
        {/* Bottom Tab Bar - Mobile Only (Portal로 body에 직접 렌더링) */}
        {typeof document !== "undefined" && createPortal(
          <nav
            className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = isActive(tab.path);

                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                      active ? "text-[#E91E7A]" : "text-[#8FA8BA]"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" strokeWidth={active ? 2 : 1.5} />
                    <span className="text-xs">{tab.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>,
          document.body
        )}
      </div>
  );
}