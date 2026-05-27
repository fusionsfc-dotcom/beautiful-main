/** DoctorYoutubeSection — 원장 유튜브 강의 섹션 */
// TODO: 유튜브 실제 링크 및 썸네일 이미지 교체 필요
// TODO: /public/images/redesign/doctor-youtube-thumb.jpg — 원장 사진(안경, 흰가운, 책장)으로 교체

const YOUTUBE_URL = "https://www.youtube.com/@beautifulhospital";
// TODO: 실제 유튜브 채널/영상 URL로 교체 필요
const DOCTOR_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc_ceo.jpeg";

export default function DoctorYoutubeSection() {
  return (
    <section className="bg-[#FAF6EE] py-14 lg:py-20 px-5 lg:px-8 border-t border-[#E8DCC8]">
      <div className="lg:max-w-6xl lg:mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* 좌측 텍스트 */}
        <div className="flex-1 mb-8 lg:mb-0">
          <p className="text-xs text-[#C9A567] tracking-widest mb-3 uppercase">
            YouTube
          </p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[#2A1F18] mb-4">
            암 강의 영상
            <br />
            <span className="text-[#6B5547] font-medium text-xl">
              (유튜브)
            </span>
          </h2>
          <p className="text-lg font-bold text-[#3D2817] leading-snug mb-3">
            암 치료, 한의학적 접근이
            <br />
            중요한 이유
          </p>
          <p className="text-sm text-[#6B5547] leading-relaxed mb-8">
            한의학 박사 이형석 병원장이 직접 설명하는
            <br />
            암 치료와 면역 회복에 관한 강의를 만나보세요.
          </p>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#3D2817] text-[#3D2817] font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#3D2817] hover:text-white transition-colors"
          >
            영상 바로가기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* 우측 유튜브 썸네일 카드 */}
        <div className="flex-1 max-w-md">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-2xl overflow-hidden shadow-xl group"
          >
            {/* TODO: 실제 사진 교체 필요 — 원장 사진 (안경, 흰가운, 책장 배경) */}
            <img
              src={DOCTOR_IMAGE}
              alt="이형석 병원장 유튜브 강의"
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-[#3D2817]/40 group-hover:bg-[#3D2817]/50 transition-colors" />

            {/* 플레이 버튼 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#8B2A1F"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* 하단 캡션 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3D2817]/90 to-transparent p-4">
              <p className="text-white text-sm font-medium leading-snug">
                한의학박사 이형석 병원장의
                <br />
                암 강의
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
