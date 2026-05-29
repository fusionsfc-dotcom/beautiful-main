export default function ConsultCallout() {
  return (
    <section className="bg-[#F8F3EA] py-10 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#EFE7DC] rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          {/* 손바닥 아이콘 */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D8CDBE] flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9A856D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </div>

          {/* 텍스트 */}
          <div className="flex-1">
            <p className="text-[17px] lg:text-[19px] font-extrabold text-[#2F2A26] leading-snug mb-1">
              지금 내 몸 상태에 맞는 운동이 궁금하신가요?
            </p>
            <p className="text-[13px] text-[#756A60] leading-relaxed">
              전문 운동 치료사가 개인별 상황에 맞는 프로그램을 안내해드립니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
