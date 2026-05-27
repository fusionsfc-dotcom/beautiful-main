import { Phone } from "lucide-react";

export default function FloatingConsultButton() {
  return (
    <>
      {/* Desktop Widget */}
      <div className="hidden lg:block sticky top-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="mb-4 text-[#3D2817] font-semibold">빠른 상담</h3>
        
        <div className="space-y-3 mb-6">
          <a
            href="tel:031-945-2000"
            className="flex items-center gap-3 p-4 bg-[#3D2817] rounded-lg hover:bg-[#5B3A1F] transition-colors text-white"
          >
            <Phone className="w-5 h-5" />
            <div>
              <div className="text-sm font-medium">전화 상담</div>
              <div className="text-xs text-white/90">031-945-2000</div>
            </div>
          </a>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-[#3D2817] space-y-2">
            <div>
              <div className="mb-1 font-medium">진료 시간</div>
              <div className="text-xs text-[#6B5547]">
                평일: 09:00 - 18:00<br />
                토요일: 09:00 - 13:00<br />
                일요일/공휴일: 휴진
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Button */}
      <a
        href="tel:031-945-2000"
        className="lg:hidden fixed right-6 w-16 h-16 bg-[#3D2817] text-white rounded-full flex items-center justify-center shadow-lg transition-all z-[9998]"
        style={{ bottom: 'calc(80px + env(safe-area-inset-bottom))' }}
        aria-label="전화 상담"
      >
        <Phone className="w-7 h-7" />
      </a>
    </>
  );
}
