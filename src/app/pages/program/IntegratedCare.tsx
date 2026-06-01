import { Helmet } from "react-helmet-async";
import IntegratedHero from "../../../components/program/integrated/IntegratedHero";
import DifferentiationBar from "../../../components/program/integrated/DifferentiationBar";
import SystemSectionHeader from "../../../components/program/integrated/SystemSectionHeader";
import TreatmentCarousel from "../../../components/program/integrated/TreatmentCarousel";
import DentalGridSection from "../../../components/program/integrated/DentalGridSection";
import CombinationMessage from "../../../components/program/integrated/CombinationMessage";
import FinalConsultBar from "../../../components/program/integrated/FinalConsultBar";
import { koreanTreatments, westernTreatments, dentalCares } from "../../../data/integratedCareData";

export default function IntegratedCare() {
  return (
    <>
      <Helmet>
        <title>통합 맞춤 치료 | Beautiful 뷰티풀 암요양병원</title>
        <meta
          name="description"
          content="의사·치과·한의사가 함께 설계하는 의·치·한 3과 협진 항암관리 시스템. 항암 치료의 효과를 높이고, 회복을 앞당깁니다."
        />
      </Helmet>

      <div className="bg-[#F8F3EA] min-h-screen">
        {/* Section 1 — 히어로 */}
        <IntegratedHero />

        {/* Section 2 — 4가지 차별점 바 */}
        <DifferentiationBar />

        {/* Section 3 — 통합 맞춤 치료 시스템 타이틀 */}
        <SystemSectionHeader />

        {/* 구분선 */}
        <div className="border-t border-[#D8CDBE] mx-5 lg:mx-auto lg:max-w-6xl" />

        {/* Section 4 — 한방 치료 캐러셀 (그린) */}
        <TreatmentCarousel group={koreanTreatments} />

        {/* 구분선 */}
        <div className="border-t border-[#D8CDBE] mx-5 lg:mx-auto lg:max-w-6xl" />

        {/* Section 5 — 양방 치료 캐러셀 (블루) */}
        <TreatmentCarousel group={westernTreatments} />

        {/* 구분선 */}
        <div className="border-t border-[#D8CDBE] mx-5 lg:mx-auto lg:max-w-6xl" />

        {/* Section 6 — 치과 관리 그리드 (퍼플) */}
        <DentalGridSection group={dentalCares} />

        {/* Section 7 — 강조 메시지 박스 */}
        <CombinationMessage />

        {/* Section 8 — 최종 협진 안내 + 빠른 액션 */}
        <FinalConsultBar />
      </div>
    </>
  );
}
