/** CollaborationBanner — 다크 브라운 협진 안내 (재사용 가능) */
import { Users } from "lucide-react";

export default function CollaborationBanner() {
  return (
    <section className="px-5 lg:px-8 py-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl px-7 py-8 flex items-center gap-6"
          style={{ background: "linear-gradient(135deg, #3D2817 0%, #5B3A1F 100%)" }}
        >
          {/* 아이콘 */}
          <div className="w-14 h-14 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center">
            <Users size={26} color="white" strokeWidth={1.8} />
          </div>

          {/* 텍스트 */}
          <div>
            <p className="text-white font-extrabold text-[16px] lg:text-[18px] leading-snug mb-1">
              혼자가 아닙니다. 지금부터 함께입니다
            </p>
            <p className="text-white/70 text-[13px]">
              전문 의료진이 직접 상담해 드립니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
