import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Check, ClipboardCheck, Syringe, Heart, Stethoscope, Home } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";

type TreatmentStage = "pre-treatment" | "post-surgery" | "chemotherapy" | "radiation" | "hospice" | null;
type StepType = "stage-selection" | "questions" | "result";

interface ChecklistItem {
  id: string;
  label: string;
}

// 치료 단계별 체크리스트
const stageChecklists: Record<Exclude<TreatmentStage, null>, ChecklistItem[]> = {
  "pre-treatment": [
    { id: "anxiety", label: "치료 시작이 두렵고 불안합니다" },
    { id: "weak-body", label: "현재 몸 상태가 약하다고 느낍니다" },
    { id: "need-strength", label: "치료를 잘 버티려면 체력을 키워야 할 것 같습니다" },
    { id: "immune-concern", label: "면역력이 걱정됩니다" },
    { id: "nutrition", label: "영양 관리가 필요합니다" },
  ],
  "post-surgery": [
    { id: "slow-recovery", label: "회복 속도가 느린 것 같습니다" },
    { id: "pain", label: "수술 부위 통증이 지속됩니다" },
    { id: "no-appetite", label: "식욕이 없고 체력이 떨어집니다" },
    { id: "next-treatment", label: "다음 치료(항암/방사선)를 앞두고 있습니다" },
    { id: "complication-worry", label: "합병증이 걱정됩니다" },
  ],
  "chemotherapy": [
    { id: "before-chemo", label: "항암 치료 전입니다" },
    { id: "during-chemo", label: "항암 치료 중입니다" },
    { id: "appetite-vomit", label: "식욕 저하 / 구토가 있습니다" },
    { id: "energy-drop", label: "체력이 급격히 떨어졌습니다" },
    { id: "wbc-low", label: "백혈구 수치 저하 경험이 있습니다" },
    { id: "treatment-delay", label: "치료 일정이 지연된 적 있습니다" },
  ],
  "radiation": [
    { id: "during-radiation", label: "방사선 치료 중입니다" },
    { id: "fatigue", label: "피로가 점점 심해집니다" },
    { id: "skin-inflammation", label: "피부 염증이 생겼습니다" },
    { id: "pain-increase", label: "통증이 증가하고 있습니다" },
    { id: "difficult-continue", label: "치료를 이어가기가 힘듭니다" },
  ],
  "hospice": [
    { id: "when-to-admit", label: "입원 시기를 판단하기 어렵습니다" },
    { id: "home-care-hard", label: "집에서 관리가 힘듭니다" },
    { id: "pain-management", label: "통증 관리가 필요합니다" },
    { id: "quality-of-life", label: "삶의 질 회복이 필요합니다" },
    { id: "caregiver-burden", label: "보호자 부담이 큽니다" },
  ],
};

export default function HealthCheck() {
  const [currentStep, setCurrentStep] = useState<StepType>("stage-selection");
  const [selectedStage, setSelectedStage] = useState<TreatmentStage>(null);
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);

  const handleStageSelect = (stage: Exclude<TreatmentStage, null>) => {
    setSelectedStage(stage);
    setCurrentStep("questions");
    setSelectedChecks([]);
  };

  const handleCheckToggle = (checkId: string) => {
    setSelectedChecks(prev => 
      prev.includes(checkId) 
        ? prev.filter(id => id !== checkId)
        : [...prev, checkId]
    );
  };

  const handleNext = () => {
    if (selectedChecks.length > 0) {
      setCurrentStep("result");
    }
  };

  const handleBack = () => {
    if (currentStep === "questions") {
      setCurrentStep("stage-selection");
      setSelectedStage(null);
      setSelectedChecks([]);
    } else if (currentStep === "result") {
      setCurrentStep("questions");
    }
  };

  const getStepNumber = () => {
    if (currentStep === "stage-selection") return 1;
    if (currentStep === "questions") return 2;
    return 3;
  };

  // STEP 1: 치료 단계 선택 화면
  if (currentStep === "stage-selection") {
    return <StageSelectionScreen onSelect={handleStageSelect} />;
  }

  // STEP 3: 결과 화면
  if (currentStep === "result" && selectedStage) {
    return <ResultScreen stage={selectedStage} selectedChecks={selectedChecks} />;
  }

  // STEP 2: 체크리스트 화면
  const checklist = selectedStage ? stageChecklists[selectedStage] : [];

  return (
    <div className="min-h-[100dvh] bg-white">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center px-5 py-4">
          <button onClick={handleBack} className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#3E5266]" />
          </button>
          <div className="flex-1">
            <h2 className="text-[#3E5266] text-lg font-semibold">상태 체크</h2>
          </div>
        </div>
      </header>

      <div className="px-5 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7D8C] font-medium">
                Step {getStepNumber()} of 3
              </span>
              <span className="text-sm text-[#E91E7A] font-semibold">
                {Math.round((getStepNumber() / 3) * 100)}%
              </span>
            </div>
            <Progress.Root
              value={(getStepNumber() / 3) * 100}
              className="h-2 bg-[#F8F9FA] rounded-full overflow-hidden"
            >
              <Progress.Indicator
                className="h-full bg-[#E91E7A] transition-all duration-300 ease-out"
                style={{ width: `${(getStepNumber() / 3) * 100}%` }}
              />
            </Progress.Root>
          </div>

          {/* Question Title */}
          <div className="mb-8">
            <h2 className="text-[#3E5266] text-2xl font-bold mb-3 leading-tight">
              현재 상태를 선택해주세요
            </h2>
            <p className="text-[#6B7D8C] text-base leading-relaxed">
              해당되는 항목을 모두 선택해주시면<br />
              맞춤 관리 방향을 안내해드립니다
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3 mb-8">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCheckToggle(item.id)}
                className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
                  selectedChecks.includes(item.id)
                    ? "bg-[#E91E7A]/5 border-[#E91E7A] shadow-md"
                    : "bg-[#F8F9FA] border-transparent hover:border-[#8FA8BA]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      selectedChecks.includes(item.id)
                        ? "bg-[#E91E7A] border-[#E91E7A]"
                        : "bg-white border-[#8FA8BA]"
                    }`}
                  >
                    {selectedChecks.includes(item.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className={`text-base leading-relaxed ${
                    selectedChecks.includes(item.id)
                      ? "text-[#3E5266] font-semibold"
                      : "text-[#3E5266]"
                  }`}>
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={selectedChecks.length === 0}
            className={`w-full py-4 rounded-xl text-center font-semibold transition-all ${
              selectedChecks.length > 0
                ? "bg-[#E91E7A] text-white hover:bg-[#d11a6d] shadow-lg"
                : "bg-[#F8F9FA] text-[#8FA8BA] cursor-not-allowed"
            }`}
          >
            다음 단계
          </button>

          {/* Helper Text */}
          {selectedChecks.length === 0 && (
            <p className="text-center text-sm text-[#8FA8BA] mt-4">
              최소 1개 이상 선택해주세요
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// 1️⃣ STEP 1 - 치료 단계 선택 화면
function StageSelectionScreen({ onSelect }: { onSelect: (stage: Exclude<TreatmentStage, null>) => void }) {
  const stages = [
    {
      id: "pre-treatment" as const,
      icon: ClipboardCheck,
      title: "암 진단 후 치료 전 준비",
      description: "치료 시작 전 몸 상태를 정리해야 이후 치료를 버틸 수 있습니다",
    },
    {
      id: "post-surgery" as const,
      icon: Stethoscope,
      title: "암 수술 후 회복",
      description: "수술 이후 회복 속도가 다음 치료에 영향을 줍니다",
    },
    {
      id: "chemotherapy" as const,
      icon: Syringe,
      title: "항암치료 준비 / 관리",
      description: "항암 치료는 버티는 것이 아니라 관리해야 유지됩니다",
    },
    {
      id: "radiation" as const,
      icon: Heart,
      title: "방사선치료 관리",
      description: "치료가 진행될수록 피로와 염증 관리가 중요합니다",
    },
    {
      id: "hospice" as const,
      icon: Home,
      title: "암요양 / 입원 시기 판단",
      description: "입원 시기를 놓치면 회복이 늦어질 수 있습니다",
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-white">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center px-5 py-4">
          <Link to="/" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#3E5266]" />
          </Link>
          <div className="flex-1">
            <h2 className="text-[#3E5266] text-lg font-semibold">상태 체크</h2>
          </div>
        </div>
      </header>

      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto">
          {/* HERO / INTRO */}
          <div className="text-center mb-12">
            <h1 className="text-[#3E5266] text-3xl md:text-4xl font-bold mb-4 leading-tight">
              지금 치료 단계에 따라<br />
              필요한 관리가 달라집니다
            </h1>
            <p className="text-[#6B7D8C] text-lg leading-relaxed">
              암 치료는 단계별로 몸의 상태와 필요한 관리가 다릅니다<br />
              현재 상태를 선택하시면 맞춤 관리 방향을 안내해드립니다
            </p>
          </div>

          {/* Progress indicator */}
          <div className="text-center mb-10">
            <span className="inline-block text-sm text-[#6B7D8C] font-medium px-5 py-2 bg-[#F8F9FA] rounded-full border border-[#E91E7A]/20">
              Step 1 of 3
            </span>
          </div>

          {/* 치료 단계 카드 (5개) */}
          <div className="grid md:grid-cols-2 gap-5">
            {stages.map((stage) => {
              const Icon = stage.icon;
              
              return (
                <button
                  key={stage.id}
                  onClick={() => onSelect(stage.id)}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#E91E7A] hover:shadow-xl transition-all group text-left"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#F8F9FA] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E91E7A]/10 transition-colors">
                    <Icon className="w-7 h-7 text-[#3E5266] group-hover:text-[#E91E7A] transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-[#3E5266] text-lg font-bold mb-2 leading-tight group-hover:text-[#E91E7A] transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-[#6B7D8C] text-sm leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#E91E7A] text-sm font-semibold">
                    <span>선택하기</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* 안내 메시지 */}
          <div className="mt-10 p-6 bg-[#F8F9FA] rounded-2xl text-center border border-[#E91E7A]/10">
            <p className="text-sm text-[#6B7D8C] leading-relaxed">
              간단한 체크만으로 <span className="text-[#E91E7A] font-semibold">맞춤 관리 방향</span>을 안내해드립니다<br />
              2-3분이면 충분합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3️⃣ STEP 3 - 결과 및 방향 제시 화면
function ResultScreen({ stage, selectedChecks }: { stage: Exclude<TreatmentStage, null>, selectedChecks: string[] }) {
  const getResult = () => {
    switch (stage) {
      case "pre-treatment":
        return {
          title: "치료를 시작하기 전 몸 상태 관리가 필요합니다",
          highlight: "치료를 잘 버티려면 지금 준비가 중요합니다",
          description: "치료 시작 전 면역력과 체력을 키우면 치료 과정에서의 부작용을 줄이고 회복 속도를 높일 수 있습니다",
          managementPoints: [
            "면역력 증진 관리",
            "영양 상태 개선",
            "체력 강화 프로그램",
            "불안 및 스트레스 관리",
          ],
        };
      case "post-surgery":
        return {
          title: "수술 후 회복 관리가 필요한 상태입니다",
          highlight: "회복이 늦어지면 다음 치료가 지연될 수 있습니다",
          description: "수술 후 빠른 회복은 다음 치료(항암/방사선)를 제때 시작하는 데 중요합니다. 통증과 체력 관리가 필요합니다",
          managementPoints: [
            "수술 부위 회복 관리",
            "통증 완화",
            "영양 및 식욕 회복",
            "체력 회복 프로그램",
          ],
        };
      case "chemotherapy":
        return {
          title: "치료를 이어가기 위한 관리가 필요한 상태입니다",
          highlight: "체력과 면역이 무너지면 치료는 중단될 수 있습니다",
          description: "현재 상태는 항암 치료를 지속하기 위해 체력과 면역 관리가 필요한 단계입니다. 다음 요소를 중심으로 관리가 필요합니다",
          managementPoints: [
            "면역 및 백혈구 관리",
            "식욕 및 영양 회복",
            "피로 회복",
            "통증 완화",
          ],
        };
      case "radiation":
        return {
          title: "방사선 치료 중 피로 관리가 필요합니다",
          highlight: "치료가 진행될수록 피로가 누적됩니다",
          description: "방사선 치료는 진행될수록 피로와 염증이 증가합니다. 지금 관리하지 않으면 치료 완료가 어려워질 수 있습니다",
          managementPoints: [
            "피로 회복 관리",
            "피부 염증 완화",
            "통증 관리",
            "영양 및 체력 유지",
          ],
        };
      case "hospice":
        return {
          title: "입원 및 요양 관리가 필요한 시기입니다",
          highlight: "입원 시기를 놓치면 회복이 더 늦어질 수 있습니다",
          description: "집에서 관리가 어려운 상태라면 전문 의료진의 24시간 케어가 필요합니다. 통증 관리와 삶의 질 회복이 중요합니다",
          managementPoints: [
            "통증 완화 관리",
            "삶의 질 회복",
            "24시간 의료진 케어",
            "보호자 부담 감소",
          ],
        };
    }
  };

  const result = getResult();

  return (
    <div className="min-h-[100dvh] bg-white">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center px-5 py-4">
          <Link to="/" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-[#3E5266]" />
          </Link>
          <h2 className="text-[#3E5266] text-lg font-semibold">체크 결과</h2>
        </div>
      </header>

      <div className="px-5 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 완료 아이콘 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#E91E7A] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Check className="w-10 h-10 text-white" />
            </div>
            <div className="inline-block px-5 py-2 bg-[#E91E7A]/10 text-[#E91E7A] rounded-full text-sm font-semibold mb-3">
              분석 완료
            </div>
          </div>

          {/* 결과 타이틀 */}
          <div className="mb-6">
            <h1 className="text-[#3E5266] text-2xl md:text-3xl font-bold mb-4 leading-tight text-center">
              {result.title}
            </h1>
          </div>

          {/* 핵심 메시지 (강조 박스) */}
          <div className="p-6 bg-gradient-to-r from-[#E91E7A]/10 to-[#E91E7A]/5 rounded-2xl mb-6 border-2 border-[#E91E7A]/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-[#E91E7A] rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-[#E91E7A] font-bold text-lg leading-relaxed">
                {result.highlight}
              </p>
            </div>
          </div>

          {/* 상세 설명 */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 mb-6 shadow-sm">
            <p className="text-[#6B7D8C] leading-relaxed mb-6">
              {result.description}
            </p>

            {/* 관리 포인트 리스트 */}
            <div className="space-y-3">
              <h3 className="text-[#3E5266] font-semibold mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#E91E7A] rounded-full"></div>
                필요한 관리 항목
              </h3>
              {result.managementPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-[#F8F9FA] rounded-xl">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-[#E91E7A]" />
                  </div>
                  <span className="text-[#3E5266] leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 보조 메시지 */}
          <div className="p-5 bg-[#3E5266] rounded-2xl mb-8 text-center">
            <p className="text-white font-bold text-lg leading-relaxed">
              지금 관리가 다음 치료를 결정합니다
            </p>
          </div>

          {/* CTA 섹션 */}
          <div className="p-8 bg-gradient-to-br from-[#F8F9FA] to-white rounded-2xl border-2 border-[#E91E7A]/20 mb-6">
            <h3 className="text-[#3E5266] text-xl font-bold mb-3 text-center leading-tight">
              지금 상태에 맞는 관리가<br />
              회복 속도를 바꿉니다
            </h3>
            <p className="text-[#6B7D8C] text-sm text-center mb-6 leading-relaxed">
              전문 의료진과 상담하시면 더 정확한 관리 방향을 안내받으실 수 있습니다
            </p>

            {/* CTA 버튼 */}
            <div className="space-y-3">
              <Link
                to="/reservation"
                className="block w-full py-4 bg-[#E91E7A] text-white rounded-xl text-center font-semibold hover:bg-[#d11a6d] transition-colors shadow-lg"
              >
                맞춤 상담 받기
              </Link>
              
              <a
                href="tel:02-1234-5678"
                className="block w-full py-4 bg-white border-2 border-[#3E5266] text-[#3E5266] rounded-xl text-center font-semibold hover:bg-[#F8F9FA] transition-colors"
              >
                전화 상담 (031-945-2000)
              </a>
            </div>
          </div>

          {/* 하단 안내 */}
          <div className="text-center">
            <Link
              to="/"
              className="text-[#6B7D8C] text-sm hover:text-[#3E5266] transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      {/* 고정 CTA 버튼 (스크롤 시) */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200 md:hidden">
        <Link
          to="/reservation"
          className="block w-full py-4 bg-[#E91E7A] text-white rounded-xl text-center font-semibold shadow-lg"
        >
          맞춤 상담 받기
        </Link>
      </div>
    </div>
  );
}
