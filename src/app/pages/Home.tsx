import SEOHead from "../../components/seo/SEOHead";
import HeroSection from "../../components/home/HeroSection";
import WhyBeautifulCarousel from "../../components/home/WhyBeautifulCarousel";
import HandwrittenReviews from "../../components/home/HandwrittenReviews";
import CoreProgramsCarousel from "../../components/home/CoreProgramsCarousel";
import DoctorYoutubeSection from "../../components/home/DoctorYoutubeSection";
import QuickLinkList from "../../components/home/QuickLinkList";

// 헤더·햄버거·BottomActionBar는 Root.tsx에서 전역 처리
export default function Home() {
  return (
    <>
      <SEOHead
        title="뷰티풀한방병원 | 국립암센터 인근 암요양병원 · 통합 암 면역 회복"
        description="국립암센터 차량 15분, 경기도 파주시 암요양병원. 수술·항암·방사선 치료 후 면역과 체력 회복을 돕는 통합 암 면역 회복 전문 한방병원. 호텔형 입원실, 24시간 의료진 상주, 양·한·치과 통합진료."
        keywords="암요양병원,국립암센터근처암요양병원,파주암요양병원,일산암요양병원,고양암요양병원,경기암요양병원,한방암치료,면역암치료,항암후관리,암회복,뷰티풀한방병원,국립암센터근처병원,통합암치료,암환자재활,암요양,항암부작용관리"
        ogUrl="https://www.btful.co.kr/"
        canonical="https://www.btful.co.kr/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "뷰티풀한방병원",
          "alternateName": "Beautiful Korean Medicine Hospital",
          "url": "https://www.btful.co.kr",
          "publisher": {
            "@type": "Hospital",
            "name": "뷰티풀한방병원",
            "telephone": "031-945-2000",
          },
        }}
      />

      {/* 페이지 본문 — BottomActionBar 높이만큼 하단 여백 */}
      <div
        className="bg-[#FAF6EE]"
        style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* 1. 히어로 */}
        <HeroSection />

        {/* 2. 왜 뷰티풀이어야 하나요? */}
        <section id="why">
          <WhyBeautifulCarousel />
        </section>

        {/* 3. 자필 후기 */}
        <HandwrittenReviews />

        {/* 4. 핵심 치료 프로그램 */}
        <CoreProgramsCarousel />

        {/* 5. 원장 유튜브 강의 */}
        <DoctorYoutubeSection />

        {/* 6. 빠른 정보 링크 */}
        <QuickLinkList />
      </div>
    </>
  );
}
