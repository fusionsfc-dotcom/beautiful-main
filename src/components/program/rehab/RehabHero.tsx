import { Leaf, Dumbbell } from "lucide-react";

// TODO: 실제 사진 교체 필요 — 트램폴린 위 운동하는 여성 3명 (따뜻한 톤)
const HERO_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";

export default function RehabHero() {
  return (
    <section className="bg-[#FAF6EE] pt-8 pb-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:gap-14">

        {/* 좌측 텍스트 */}
        <div className="flex-1 mb-8 lg:mb-0">
          {/* 브라운 알약 뱃지 */}
          <span className="inline-flex items-center px-4 py-1.5 bg-[#3D2817] text-white text-[12px] font-semibold rounded-full mb-5">
            운동 재활 치료
          </span>

          {/* 메인 타이틀 */}
          <h1 className="text-[30px] lg:text-[40px] font-extrabold text-[#2A1F18] leading-tight mb-2">
            항암 치료를 버티는 힘,
          </h1>
          <h2 className="text-[30px] lg:text-[40px] font-extrabold leading-tight mb-5">
            <span className="text-[#8B2A1F]">운동</span>
            <span className="text-[#2A1F18]">에서 만들어집니다</span>
          </h2>

          {/* 서브 카피 */}
          <p className="text-[15px] text-[#6B5547] leading-relaxed mb-8">
            체력·면역·근육을 회복시키는
            <br />
            필수 재활 프로그램입니다.
          </p>

          {/* 하단 2개 카드 */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#E8DCC8] flex-1">
              <div className="w-9 h-9 rounded-full bg-[#F5EEE0] flex items-center justify-center flex-shrink-0">
                <Leaf size={18} color="#5B3A1F" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#2A1F18]">림프 순환 촉진</p>
                <p className="text-[11px] text-[#6B5547]">부종 완화 & 면역력 향상</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#E8DCC8] flex-1">
              <div className="w-9 h-9 rounded-full bg-[#F5EEE0] flex items-center justify-center flex-shrink-0">
                <Dumbbell size={18} color="#5B3A1F" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#2A1F18]">근육량 증가</p>
                <p className="text-[11px] text-[#6B5547]">체력 강화 & 일상 회복</p>
              </div>
            </div>
          </div>

          {/* 캡션 */}
          <p className="text-[13px] text-[#8B6F47] flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#C9A567] inline-block" />
            치료를 버티는 기본 체력을 만듭니다.
          </p>
        </div>

        {/* 우측 이미지 */}
        <div className="w-full lg:w-[480px] lg:flex-shrink-0 aspect-[4/3] lg:aspect-auto lg:h-[380px] rounded-2xl overflow-hidden shadow-md relative">
          {/* TODO: 실제 사진 교체 필요 — 트램폴린 위에서 운동하는 여성 3명 */}
          <img
            src={HERO_IMAGE}
            alt="운동 재활 치료"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2817]/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
