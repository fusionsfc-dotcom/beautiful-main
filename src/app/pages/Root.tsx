import { Outlet, useLocation, Link } from "react-router";
import { Home, Building2, BookOpen, Info, Stethoscope } from "lucide-react";
import FloatingConsultButton from "../components/FloatingConsultButton";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import { useEffect } from "react";

export default function Root() {
  const location = useLocation();
  
  // 페이지 전환 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const tabs = [
    { path: "/", label: "홈", icon: Home },
    { path: "/clinics", label: "클리닉", icon: Stethoscope },
    { path: "/facilities", label: "치료환경", icon: Building2 },
    { path: "/columns", label: "커뮤니티", icon: BookOpen },
    { path: "/about", label: "병원소개", icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white pb-20 lg:pb-0">
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
        
        {/* Bottom Tab Bar - Mobile Only */}
        <nav 
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[9999] mobile-bottom-safe mobile-bottom-nav-fixed"
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
        </nav>
      </div>
  );
}