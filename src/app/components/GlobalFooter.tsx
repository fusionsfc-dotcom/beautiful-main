import { Link } from "react-router";
import { menuCategories } from "../../data/menuData";

export default function GlobalFooter() {
  return (
    <>
      {/* 1️⃣ 공감 메시지 영역 */}
      <section className="relative py-20 px-5 overflow-hidden">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/site_img.jpeg')`,
          }}
        />
        {/* 브라운 오버레이 */}
        <div className="absolute inset-0 bg-[#6A5542]/38" />

        {/* 컨텐츠 */}
        <div className="relative max-w-screen-xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            뷰티풀한방병원<br />
            국립암센터 등 대학병원치료<br />
            효과를 높이기 위한 통합암케어
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 text-base md:text-lg leading-relaxed text-white/90">
            <p>
              암 수술 후 회복, 항암치료 부작용 개선<br />
              방사선치료 부작용 개선과 동시에<br />
              암 이후의 삶을 위한 다양한 재활을 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* 2️⃣ 행동 유도 영역 (CTA) */}
      <section className="py-20 px-5 bg-[#F8F3EA]">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A5542] mb-4">
            지금 상태를 먼저 확인해보세요
          </h2>
          <p className="text-lg text-[#756A60] mb-10">
            증상과 치료 단계에 따라<br />
            가능한 치료 방향을 안내해드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/health-check"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#8BC31F] text-white font-semibold rounded-full hover:bg-[#75A915] transition-colors shadow-lg hover:shadow-xl"
            >
              3분 상태 체크 시작하기
            </Link>
            <Link
              to="/clinics"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#6A5542] font-semibold rounded-full border-2 border-[#6A5542] hover:bg-[#F5EFE6] transition-colors"
            >
              치료 과정 미리 보기
            </Link>
            <Link
              to="/facilities"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#6A5542] font-semibold rounded-full border-2 border-[#6A5542] hover:bg-[#F5EFE6] transition-colors"
            >
              입원 시스템 안내 보기
            </Link>
          </div>

          <p className="text-[#9A856D] text-sm">
            충분히 설명을 들은 뒤<br />
            치료 여부를 결정하셔도 됩니다.
          </p>
        </div>
      </section>

      {/* 3️⃣ Footer — BottomActionBar(56px) 위 여백 포함 */}
      <footer
        className="bg-[#EFE7DC] text-[#6A5542] pt-16 px-5 border-t border-[#D8CDBE]"
        style={{ paddingBottom: "calc(4rem + 56px + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 mb-12">
            {/* 좌측: 병원 정보 */}
            <div>
              {/* 나비 로고 + 병원명 */}
              <div className="flex items-center gap-2.5 mb-6">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path
                    d="M16 10C16 10 10 4 4 6C2 10 6 16 16 16C6 16 2 22 4 26C10 28 16 22 16 22"
                    stroke="#9A856D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 10C16 10 22 4 28 6C30 10 26 16 16 16C26 16 30 22 28 26C22 28 16 22 16 22"
                    stroke="#9A856D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="16" cy="16" r="1.5" fill="#9A856D" />
                </svg>
                <div>
                  <p className="text-[10px] tracking-widest text-[#9A856D] font-light leading-none">Beautiful</p>
                  <p className="text-lg font-bold text-[#6A5542] leading-none mt-0.5">뷰티풀한방병원</p>
                </div>
              </div>

              <div className="space-y-2 text-[#756A60] text-sm leading-relaxed">
                <p>주소. 경기도 파주시 중양로 94-9 | 사업자 번호. 105-99-68667 | 대표. 이형석</p>
                <p>Tel. 031-945-2000 | Fax. 031-944-1990</p>
              </div>
            </div>

            {/* 우측: 사이트맵 */}
            <div>
              <div>
                <h4 className="text-[#9A856D] text-xs tracking-widest uppercase mb-6">Sitemap</h4>
                <nav className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-3">
                  {menuCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={category.items[0]?.href ?? "/"}
                      className="block text-[#756A60] hover:text-[#9A856D] transition-colors text-sm"
                    >
                      {category.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* 카피라이트 */}
          <div className="border-t border-[#D8CDBE] pt-8 text-center text-[#756A60] text-xs">
            <p>© Beautiful Korean Medicine Hospital</p>
            <p className="mt-1">All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
