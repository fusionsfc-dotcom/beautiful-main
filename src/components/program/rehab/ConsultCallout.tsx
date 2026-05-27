const NAVER_TALK_URL = "https://talk.naver.com/ct/wc4u6k"; // TODO: 실제 URL 교체

export default function ConsultCallout() {
  return (
    <section className="bg-[#FAF6EE] py-10 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#F5EEE0] rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          {/* 손바닥 아이콘 */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E8DCC8] flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B3A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </div>

          {/* 텍스트 */}
          <div className="flex-1">
            <p className="text-[17px] lg:text-[19px] font-extrabold text-[#2A1F18] leading-snug mb-1">
              지금 내 몸 상태에 맞는 운동이 궁금하신가요?
            </p>
            <p className="text-[13px] text-[#6B5547] leading-relaxed">
              전문 운동 치료사가 개인별 상황에 맞는 프로그램을 안내해드립니다.
            </p>
          </div>

          {/* CTA 버튼 2개 */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="tel:031-945-2000"
              className="inline-flex items-center justify-center gap-2 bg-[#3D2817] text-white text-[14px] font-bold px-5 py-3 rounded-full whitespace-nowrap"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.02-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              전화 상담
            </a>
            <a
              href={NAVER_TALK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#3D2817] text-[#3D2817] text-[14px] font-bold px-5 py-3 rounded-full whitespace-nowrap"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              네이버 톡톡
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
