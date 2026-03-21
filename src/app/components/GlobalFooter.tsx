import { Shield, Clock, TrendingUp, FileText, Phone } from "lucide-react";
import { Link } from "react-router";

export default function GlobalFooter() {
  return (
    <>
      {/* 1️⃣ 공감 메시지 영역 */}
      <section className="relative py-20 px-5 overflow-hidden">
        {/* 배경 이미지 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1580615633399-a69c661568c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBob3NwaXRhbCUyMHJvb20lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzI3MTM5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-[#3E5266]/85" />
        
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
      <section className="py-20 px-5 bg-white">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E5266] mb-4">
            지금 상태를 먼저 확인해보세요
          </h2>
          <p className="text-lg text-[#6B7D8C] mb-10">
            증상과 치료 단계에 따라<br />
            가능한 치료 방향을 안내해드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/health-check"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#E91E7A] text-white font-semibold rounded-full hover:bg-[#d01a6d] transition-colors shadow-lg hover:shadow-xl"
            >
              3분 상태 체크 시작하기
            </Link>
            <Link
              to="/clinics"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#3E5266] font-semibold rounded-full border-2 border-[#3E5266] hover:bg-[#F8F9FA] transition-colors"
            >
              치료 과정 미리 보기
            </Link>
            <Link
              to="/facilities"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#3E5266] font-semibold rounded-full border-2 border-[#3E5266] hover:bg-[#F8F9FA] transition-colors"
            >
              입원 시스템 안내 보기
            </Link>
          </div>

          <p className="text-[#8FA8BA] text-sm">
            충분히 설명을 들은 뒤<br />
            치료 여부를 결정하셔도 됩니다.
          </p>
        </div>
      </section>

      {/* 3️⃣ Footer */}
      <footer className="bg-[#3E5266] text-white py-16 px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* 좌측: 병원정보 */}
            <div>
              <h3 className="text-2xl font-bold mb-6">뷰티풀한방병원</h3>
              
              <div className="space-y-2 text-white/80 text-sm leading-relaxed">
                <p>
                  주소. 경기도 파주시 중양로 94-9 | 사업자 번호. 105-99-68667 | 대표. 이형석
                </p>
                <p>
                  Tel. 031-945-2000 | Fax. 031-944-1990
                </p>
              </div>
            </div>

            {/* 우측: 메뉴 링크 */}
            <div className="lg:flex lg:justify-end">
              <div>
                <h4 className="text-lg font-semibold mb-6">사이트맵</h4>
                <nav className="space-y-3">
                  <Link to="/" className="block text-white/80 hover:text-white transition-colors">
                    홈
                  </Link>
                  <Link to="/clinics" className="block text-white/80 hover:text-white transition-colors">
                    클리닉
                  </Link>
                  <Link to="/facilities" className="block text-white/80 hover:text-white transition-colors">
                    치료환경
                  </Link>
                  <Link to="/columns" className="block text-white/80 hover:text-white transition-colors">
                    커뮤니티
                  </Link>
                  <Link to="/about" className="block text-white/80 hover:text-white transition-colors">
                    병원소개
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* 카피라이트 */}
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>© Beautiful Korean Medicine Hospital</p>
            <p className="mt-1">All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}