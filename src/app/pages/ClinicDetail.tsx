import { useParams, Link } from "react-router";
import { useState } from "react";
import { ChevronLeft, Phone, MessageCircle, CheckCircle } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
/** 임시: Vercel 링크테스트용 */
const PLACEHOLDER_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";
/** 왕뜸·약뜸 치료 카드 이미지 */
const WANG_MOXA_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/dd.jpg";
/** 효소 찜질 치료 카드 이미지 */
const ENZYME_STEAM_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/jj.png";
/** 고주파 온열 암 치료 카드 이미지 */
const RF_HYPERTHERMIA_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic_onco.jpeg";
/** 입원 케어 시스템 섹션 이미지 */
const INPATIENT_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room/room2.jpg";
/** 이명·난청·어지럼증·두통 클리닉 헤더 섹션 이미지 */
const TINNITUS_HEADACHE_HEADER_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_1.png";
/** 이명 클리닉 카드 이미지 */
const TINNITUS_CLINIC_CARD_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/lee.png";
/** 난청 클리닉 카드 이미지 */
const DEAFNESS_CLINIC_CARD_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/nan.png";
/** 어지럼증 클리닉 카드 이미지 */
const DIZZINESS_CLINIC_CARD_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/ur.png";
/** 두통 클리닉 카드 이미지 */
const HEADACHE_CLINIC_CARD_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/du.png";

export default function ClinicDetail() {
  const { id } = useParams();

  const clinicData: Record<string, any> = {
    "cancer-immune": {
      title: "암환자 통합 면역 치료 클리닉",
      subtitle: "국립암센터 병행 치료",
      description: "암 치료는 수술, 항암, 방사선 치료로 끝나는 것이 아니라 그 이후의 회복 관리가 매우 중요합니다. 항암 치료 과정에서는 체력 저하, 면역력 감소, 식욕 저하, 통증과 피로 등 다양한 문제가 발생할 수 있습니다.",
      badge: "항암과 회복을 함께 관리하는 암 통합 회복 클리닉",
      headerImage: PLACEHOLDER_IMAGE,
      introMessage: "뷰티풀한방병원은 대학병원 치료를 존중하며 항암 치료와 회복 관리를 함께 진행하는 암 통합 면역 치료 프로그램을 운영합니다.",
      sections: [
        {
          title: "이런 분들께 도움이 됩니다",
          subsections: [
            {
              subtitle: "수술 후 회복 단계",
              content: [
                "암 수술 이후 체력 회복이 더딘 경우",
                "수술 후 통증과 피로가 지속되는 경우",
              ],
            },
            {
              subtitle: "항암 치료 중 관리",
              content: [
                "항암 치료 중 구토와 식욕 저하로 힘든 경우",
                "백혈구 수치 저하로 다음 치료가 지연되는 경우",
              ],
            },
            {
              subtitle: "항암 치료 후 회복",
              content: [
                "항암 치료 이후 극심한 피로가 지속되는 경우",
                "면역력 저하로 감염이 반복되는 경우",
              ],
            },
            {
              subtitle: "진행성 암 환자 케어",
              content: [
                "암 진행으로 통증과 체력 저하가 심한 경우",
                "삶의 질 개선과 회복 관리가 필요한 경우",
              ],
            },
          ],
        },
        {
          title: "통합 면역 치료 프로그램",
          description: "뷰풀한방병원은 한방치료 + 양방치료를 함께 적용하는 통합 면역 치료 프로그램을 운영합니다.",
          subsections: [
            {
              subtitle: "한방 면역 회복 치료",
              isPrimary: true,
              treatments: [
                {
                  name: "왕뜸 · 약뜸 치료",
                  image: WANG_MOXA_CLINIC_IMAGE_URL,
                  description: "열을 전달하여 체내 기혈 순환을 돕고 몸의 기운을 조절하여 면역 균형 회복을 돕는 치료입니다.",
                  effects: ["혈액순환 개선", "면역력 강화", "체력 회복"],
                },
                {
                  name: "효소 찜질 치료",
                  image: ENZYME_STEAM_CLINIC_IMAGE_URL,
                  description: "자연 발효 과정에서 발생하는 약 70도의 따뜻한 열을 이용하여 몸의 혈액과 기혈 순환을 돕고 체내 노폐물 배출을 촉진합니다.",
                  effects: ["혈액순환 개선", "체온 상승", "피로 회복", "해독 작용"],
                },
              ],
            },
            {
              subtitle: "양방 통합 치료",
              isPrimary: true,
              treatments: [
                {
                  name: "고주파 온열 암 치료",
                  image: RF_HYPERTHERMIA_CLINIC_IMAGE_URL,
                  description: "고주파 에너지를 이용하여 암 조직 주변의 온도를 높여 암세포의 성장 환경을 억제하고 면역 반응을 활성화하는 치료입니다.",
                  effects: ["암세포 성장 억제", "면역 활성화", "항암 치료 효과 보조", "통증 완화"],
                  frequency: "주 2~3회, 환자 상태에 맞는 개인 맞춤 프로토콜로 진행합니다.",
                },
              ],
            },
          ],
        },
        {
          title: "암 치료 단계별 회복 관리",
          description: "환자의 치료 단계에 따라 맞춤 회복 프로그램을 진행합니다.",
          isStages: true,
          stages: [
            { 
              stage: "1단계", 
              title: "수술 후 회복 관리",
              description: "수술 이후 체력 회복과 면역 안정 관리"
            },
            { 
              stage: "2단계", 
              title: "항암 치료 중 관리",
              description: "항암 부작용 완화, 면역 및 체력 유지"
            },
            { 
              stage: "3단계", 
              title: "항암 치료 이후 회복 관리",
              description: "면역 회복, 체력 회복 프로그램"
            },
            { 
              stage: "4단계", 
              title: "진행성 암 환자 관리",
              description: "통증 관리, 체력 유지, 삶의 질 개선"
            },
          ],
        },
        {
          title: "암 회복을 위한 입원 케어 시스템",
          description: "환자의 상태에 따라 입원 치료와 외래 치료가 가능합니다.",
          image: INPATIENT_CARE_IMAGE_URL,
          content: [
            "호텔급 1인실 입원 시설",
            "24시간 의료진 상주 케어",
            "환자 맞춤 영양 식단",
            "국립암센터 차량 20분 거리",
          ],
        },
      ],
      faqs: [
        {
          question: "항암 치료와 병행할 수 있나요?",
          answer: "네. 대학병원 치료와 병행하여 회복 관리 치료를 진행할 수 있습니다.",
        },
        {
          question: "입원 기간은 얼마나 되나요?",
          answer: "환자의 상태와 치료 단계에 따라 1주 ~ 수주 단위로 치료 계획을 세웁니다.",
        },
        {
          question: "보험 적용이 되나요?",
          answer: "치료 항목에 따라 보험 적용 여부가 달라질 수 있으며 상담을 통해 자세히 안내드립니다.",
        },
      ],
      finalMessage: {
        title: "암 치료 이후의 회복은 시간과 관리가 필요합니다.",
        description: "뷰티풀한방병원은 환자가 다시 일상으로 돌아갈 수 있도록 회복의 과정을 함께합니다.",
      },
    },
    "stroke-parkinson": {
      title: "중풍·파킨슨병 재활 클리닉",
      subtitle: "막힌 뇌의 통로를 열어, 신경 회복을 돕습니다",
      description: "1:1 집중 재활과 뇌신경계 기반 통합 치료로 일상 복귀를 목표로 합니다.",
      badge: "신경계 통합 재활",
      sections: [
        {
          title: "이 병은 '뇌세포가 약해서'만 생기지 않습니다",
          subsections: [
            {
              subtitle: "마르는 나무와 같은 뇌",
              content: [
                "중풍 후유증이나 파킨슨은 뇌세포 자체의 문제뿐 아니라",
                "뇌에 영양을 공급하고 노폐물을 정리하는 '순환 경로'가",
                "원활하지 않을 때 증상이 오래 지속될 수 있습니다.",
              ],
            },
            {
              subtitle: "도파민 공장과 공급망",
              content: [
                "파킨슨은 '도파민을 만드는 공장'이 멈춘 것처럼 보이지만,",
                "공장으로 가는 원료(영양·순환)가 막히고",
                "노폐물(대사 부산물)이 쌓이면 기능이 떨어질 수 있습니다.",
                "뷰티풀한방병원은 이 '통로' 회복을 치료의 축으로 둡니다.",
              ],
            },
          ],
        },
        {
          title: "우리가 목표로 하는 회복 지표",
          subsections: [
            {
              subtitle: "보행 안정과 균형",
              content: ["걷기와 균형 감각을 회복하여 안전한 이동을 목표로 합니다"],
            },
            {
              subtitle: "손 기능/미세운동 회복",
              content: ["일상 생활에 필요한 손의 미세 운동 기능을 개선합니다"],
            },
            {
              subtitle: "삼킴·발성·호흡(필요 시)",
              content: ["연하 장애, 발성 문제, 호흡 개선이 필요한 경우 집중 관리합니다"],
            },
            {
              subtitle: "피로·수면·통증(신경계 안정)",
              content: ["신경계 안정화를 통해 피로, 수면 장애, 통증을 관리합니다"],
            },
          ],
        },
        {
          title: "중풍·파킨슨 통합 재활 프로그램",
          subsections: [
            {
              subtitle: "1:1 집중 재활",
              content: [
                "운동치료/보행훈련/균형훈련/상지 기능훈련",
                "개인별 목표 설정 → 주간 리포트",
              ],
            },
            {
              subtitle: "뇌혈류·신경 통로 회복",
              content: [
                "턱관절·상부경추 정렬과 신경계 균형을 기반으로",
                "뇌와 신체 간 신호 전달이 원활해지도록 돕습니다",
              ],
            },
            {
              subtitle: "한방 재생·회복 프로그램",
              content: [
                "뇌신경 회복을 돕는 한약",
                "순환/피로/수면/식욕 관리",
              ],
            },
            {
              subtitle: "통증·경직(강직) 관리",
              content: [
                "경직 완화, 관절 가동범위 개선",
                "통증/염증 관리",
                "자율신경 안정화(불안, 긴장, 수면 불편 등 포함)",
              ],
            },
          ],
        },
        {
          title: "치료는 이렇게 진행됩니다",
          isStages: true,
          stages: [
            { stage: "1단계", title: "초기 평가 - 보행·균형·상지 기능·일상 동작 평가 + 생활패턴 확인" },
            { stage: "2단계", title: "개인 맞춤 계획 - 목표 설정 + 주간 루틴 설계" },
            { stage: "3단계", title: "집중 치료 - 1:1 재활 + 신경계 균형 치료 + 피로/수면/영양 관리" },
            { stage: "4단계", title: "유지·재발 방지 - 퇴원/외래 전환 플랜 + 홈프로그램 안내" },
          ],
        },
        {
          title: "보호자가 안심할 수 있는 케어 구조",
          content: [
            "24시간 의료진 상주",
            "장기 입원 케어 시스템",
            "영양 맞춤 식단",
            "안전한 이동/낙상 예방",
          ],
        },
      ],
      faqs: [
        {
          question: "중풍 재활은 언제 시작하는 게 좋나요?",
          answer: "급성기가 지나면 가능한 한 빨리 시작하는 것이 좋습니다. 발병 후 3-6개월이 골든타임이며, 이 시기에 집중 재활을 하면 회복 가능성이 높아집니다.",
        },
        {
          question: "파킨슨은 입원 치료가 필요한가요?",
          answer: "증상 정도에 따라 다르지만, 집중적인 1:1 재활과 신경계 치료를 위해서는 입원 치료가 효과적입니다. 외래 치료도 가능하며, 상태에 따라 상담 후 결정합니다.",
        },
        {
          question: "치료 기간은 얼마나 걸리나요?",
          answer: "일반적으로 최소 4주에서 12주의 집중 치료를 권장합니다. 환자분의 상태와 회복 목표에 따라 기간이 조정될 수 있습니다.",
        },
        {
          question: "기존 병원 치료와 병행할 수 있나요?",
          answer: "네, 대학병원의 표준 치료를 존중하며 병행 재활을 설계합니다. 기존 약물 치료는 유지하면서 재활과 신경계 치료를 함께 진행할 수 있습니다.",
        },
        {
          question: "보호자 동반/간병은 어떻게 되나요?",
          answer: "24시간 의료진이 상주하므로 보호자 간병은 필수가 아닙니다. 다만 가족분이 원하시면 함께 계실 수 있으며, 정기적인 가족 상담과 보호자 교육도 제공합니다.",
        },
      ],
    },
    "tinnitus-headache": {
      title: "이명·난청·어지럼증·두통 클리닉",
      subtitle: "검사에서는 이상이 없는데 증상이 계속된다면",
      description: "이명, 난청, 어지럼증, 두통은 생명을 위협하지 않지만 수면, 집중, 업무, 인간관계를 무너뜨릴 수 있는 증상입니다. 여러 치료를 받았지만 호전이 더딘 경우 몸의 신호와 순환 통로의 균형을 함께 살펴볼 필요가 있습니다.",
      badge: "신경과 순환 통로의 균형을 함께 점검",
      headerImage: TINNITUS_HEADACHE_HEADER_IMAGE_URL,
      // 질환 선택 카드 섹션
      hasConditionCards: true,
      conditionCards: [
        {
          title: "이명 클리닉",
          symptoms: ["귀에서 소리가 들림", "삐 소리 지속", "박동성 소리"],
          image: TINNITUS_CLINIC_CARD_IMAGE_URL,
        },
        {
          title: "난청 클리닉",
          symptoms: ["소리가 작게 들림", "먹먹함", "갑작스러운 청력 저하"],
          image: DEAFNESS_CLINIC_CARD_IMAGE_URL,
        },
        {
          title: "어지럼증 클리닉",
          symptoms: ["세상이 도는 느낌", "균형 불안", "메니에르/이석증"],
          image: DIZZINESS_CLINIC_CARD_IMAGE_URL,
        },
        {
          title: "두통 클리닉",
          symptoms: ["머리가 깨질 듯한 통증", "편두통", "긴장형 두통"],
          image: HEADACHE_CLINIC_CARD_IMAGE_URL,
        },
      ],
      // 증상 자가 체크
      hasSelfCheck: true,
      selfCheckQuestions: [
        {
          question: "귀에서 삐 소리·매미 소리·기계음 같은 소리가 들리나요?",
          options: ["자주 있다", "가끔 있다", "없다"],
          relatedCondition: "이명",
        },
        {
          question: "소리가 먹먹하게 들리거나 작게 들리나요?",
          options: ["그렇다", "가끔 그렇다", "아니다"],
          relatedCondition: "난청",
        },
        {
          question: "가만히 있어도 세상이 도는 느낌, 균형이 흔들리는 느낌이 있나요?",
          options: ["자주 있다", "가끔 있다", "없다"],
          relatedCondition: "어지럼증",
        },
        {
          question: "머리가 조여오는 느낌, 깨질 듯한 통증이 반복되나요?",
          options: ["자주 있다", "가끔 있다", "없다"],
          relatedCondition: "두통",
        },
        {
          question: "목과 어깨가 자주 뻣뻣한가요?",
          options: ["자주 그렇다", "가끔 그렇다", "아니다"],
          relatedCondition: "두통/어지럼/이명",
        },
      ],
      sections: [
        {
          title: "왜 같은 증상이 반복될까요?",
          subtitle: "귀만의 문제가 아니라 신호와 순환 통로 문제일 수 있습니다",
          isStages: true,
          isPrinciple: true,
          stages: [
            {
              stage: "STEP 1",
              title: "신호 전달 문제",
              description: "뇌 → 신경 → 귀. 신호 전달이 불안정하면 이명, 어지럼이 발생할 수 있습니다.",
            },
            {
              stage: "STEP 2",
              title: "상부경추 정렬 문제",
              description: "경추 1번, 2번 정렬이 흐트러지면 신경과 순환 통로가 압박됩니다.",
            },
            {
              stage: "STEP 3",
              title: "통로 압박",
              description: "호스가 꺾이면 물이 흐르지 않습니다. 같은 원리로 신경 신호와 순환이 방해받습니다.",
            },
          ],
        },
        {
          title: "통로의 균형을 회복하는 치료 접근",
          description: "신경계 균형을 중심으로 다음 요소들을 함께 관리합니다",
          isTBTApproach: true,
          tbtElements: [
            { label: "턱관절 균형", icon: "balance" },
            { label: "상부경추 균형", icon: "spine" },
            { label: "신경 안정", icon: "brain" },
            { label: "순환 회복", icon: "circulation" },
          ],
        },
        {
          title: "이런 분들께 도움이 됩니다",
          content: [
            "검사에서는 이상이 없는데 이명이 지속되는 경우",
            "난청과 함께 어지럼이 반복되는 경우",
            "두통과 목 긴장이 함께 나타나는 경우",
            "수 장애와 불안이 동반되는 경우",
            "여러 치료 후에도 호전이 더딘 경우",
          ],
        },
        {
          title: "치료 프로그램",
          subsections: [
            {
              subtitle: "정밀 평가",
              content: [
                "증상 패턴 분석",
                "자세/턱관절/경추 평가",
              ],
            },
            {
              subtitle: "TBT 균형 치료",
              content: [
                "턱관절 균형",
                "상부경추 정렬",
              ],
            },
            {
              subtitle: "자율신경 관리",
              content: [
                "수면·스트레스·피로 관리",
              ],
            },
            {
              subtitle: "근막/경추 치료",
              content: [
                "목·어깨 긴장",
                "두통 관리",
              ],
            },
          ],
        },
        {
          title: "치료 흐름",
          isStages: true,
          stages: [
            {
              stage: "1단계",
              title: "초기 평가",
              description: "30~40분",
            },
            {
              stage: "2단계",
              title: "개인 맞춤 계획",
              description: "증상 유형 분석",
            },
            {
              stage: "3단계",
              title: "집중 치료",
              description: "주 1~2회",
            },
            {
              stage: "4단계",
              title: "유지 관리",
              description: "재발 예방",
            },
          ],
        },
      ],
      faqs: [
        {
          question: "귀 검사에서 이상이 없는데 치료 가능한가요?",
          answer: "네, 가능합니다. 귀 자체에 구조적 이상이 없어도 신경 신호 전달, 순환, 정렬 문제로 증상이 나타날 수 있습니다. 이런 경우 통로의 균형을 회복하는 접근이 도움될 수 있습니다.",
        },
        {
          question: "치료 기간은 얼마나 걸리나요?",
          answer: "증상의 정도와 만성화 기간에 따라 다르지만, 일반적으로 8-12주 정도의 치료 기간을 권장합니다. 개인별 상태에 따라 조정됩니다.",
        },
        {
          question: "어지럼이 심한 날도 치료 가능한가요?",
          answer: "어지럼 증상이 심한 경우에는 치료 강도를 조절하여 진행합니다. 상태에 따라 안정을 취한 후 치료를 시작할 수도 있으며, 의료진과 상담 후 결정합니다.",
        },
        {
          question: "두통 유형도 함께 평가하나요?",
          answer: "네, 초기 평가에서 두통의 패턴, 빈도, 유발 요인을 함께 분석합니다. 긴장형 두통, 편두통 등 유형에 따라 맞춤 치료 계획을 수립합니다.",
        },
        {
          question: "기존 약 복용과 병행 가능한가요?",
          answer: "네, 가능합니다. 현재 복용 중인 약물이 있다면 상담 시 알려주시면, 기존 치료를 유지하면서 병행할 수 있도록 계획을 조율합니다.",
        },
      ],
      finalMessage: {
        title: "증상이 반복된다면 원인을 함께 확인해보세요",
        description: "뷰티풀한방병원은 증상의 근본 원인을 찾아 통로의 균형을 회복하는 치료를 제공합니다.",
      },
    },
    "spine-joint": {
      title: "척추·관절 통증 클리닉",
      subtitle: "허리만 고치면 재발합니다.",
      description: "'꼬인 통로'를 위에서부터 풀어, 전신 밸런스를 회복합니다.",
      badge: "통합 치료",
      sections: [
        {
          title: "혹시 이런 패턴이 반복되나요?",
          content: [
            "치료받을 때는 좋아졌다가 다시 아프다",
            "허리/골반/무릎/어깨 통증이 번갈아 나타난다",
            "자세가 한쪽으로 기울고 다리 길이 차이를 느낀다",
            "목·어깨 긴장과 두통이 함께 있다",
            "오래 앉거나 걸으면 통증이 심해진다",
          ],
          note: "통증의 원인은 다양하며, 정확한 평가는 개인별로 필요합니다.",
        },
        {
          title: "통증이 반복되는 이유",
          subsections: [
            {
              subtitle: "1. 척추는 머리부터 골반까지 연결된 '긴 통로'입니다",
              content: [
                "머리 끝에서 골반까지 이어지는 척추 구조는 신경 신호, 근막(근육의 막), 순환의 흐름이 한 덩어리처럼 연결된 시스템입니다.",
                "중간(허리·무릎)만 반복적으로 치료해도, '통로의 입구'에서 꼬임이 유지되면 보상 패턴이 다시 생길 수 있습니다.",
              ],
            },
            {
              subtitle: "2. '입구'가 비틀리면, 몸은 넘어지지 않기 위해 아래를 비틀어 보상합니다",
              content: [
                "보상작용의 도미노: 경추 중심축이 흔들리면 몸은 균형을 유지하려고 흉추·요추를 반대 방향으로 비틀어 자세를 '버팁니다'.",
                "골반의 왜곡: 보상이 오래 지속되면 골반 높이·회전이 달라지고 한쪽 다리로 체중이 실리며 만성 통증이 생길 수 있습니다.",
                "관절의 과부하: 무릎·고관절·어깨 같은 관절은 정렬이 틀어진 상태에서 반복 사용되며 염증/통증이 악화될 수 있습니다.",
              ],
              note: "입구가 꼬여 있는데, 아래만 잡아당기면 왜 통증이 반복될까요?",
            },
            {
              subtitle: "3. TBT 기반 접근: 윗부분을 풀면, 아래의 긴장이 줄어듭니다",
              content: [
                "경막/근막 긴장 완화 관점: 상부 정렬이 안정되면 전신 연결막의 과긴장이 줄어들 수 있습니다.",
                "신경 신호의 안정(과흥분 완화): 꼬임이 줄면 신경계 과흥분이 완화되어 통증 민감도가 낮아질 수 있습니다.",
                "스스로 정렬되는 자세 패턴(보상 감소): 억지로 맞추기보다 '버티던 자세'가 풀리며 움직임이 편해지는 것을 목표로 합니다.",
              ],
              description: "TBT(턱관절 균형 접근)는 허리를 억지로 '교정'하기보다, 상부의 균형(턱관절·상부경추)을 통해 전신 긴장 패턴이 완화되도록 돕는 방식입니다.",
              note: "개선 정도는 개인의 상태와 원인에 따라 다를 수 있습니다.",
            },
          ],
        },
        {
          title: "이런 분들께 도움이 됩니다",
          content: [
            "만성 허리통증/좌골신경통(저림 동반 포함)",
            "목·어깨 결림과 두통이 함께 있는 경우",
            "골반 틀어짐/자세 비대칭이 느껴지는 경우",
            "무릎·고관절 통증이 반복되는 경우",
            "어깨 통증(가동범위 제한)과 등 통증이 함께 있 경우",
            "수술/주사 이후에도 통증이 남아 회복 관리가 필요한 경우",
          ],
        },
        {
          title: "척추·관절 통증 통합 프로그램",
          subsections: [
            {
              subtitle: "A. 정밀 평가(원인 지도 만들기)",
              content: [
                "통증 위치/방사통/저림 패턴 문진",
                "자세/보행/골반 높이/체중 부하 평가",
                "경추·턱관절·어깨·고관절 가동성 체크",
                "생활 습관(앉는 시간/운동/수면) 분석",
              ],
            },
            {
              subtitle: "B. TBT 기반 균형 치료(핵심 축)",
              content: [
                "턱관절 균형 평가 및 맞춤 치료",
                "상부경추 중심축 안정화 접근",
                "전신 긴장 패턴 완화 목표",
              ],
            },
            {
              subtitle: "C. 척추·관절 통증 집중 치료(국소 + 연결)",
              content: [
                "경추/흉추/요추 통증 관리",
                "관절 주변 염증/부종/근막 긴장 관리",
                "가동범위 회복 및 통증 완화 목표",
              ],
            },
            {
              subtitle: "D. 회복·유지 프로그램(재 관리)",
              content: [
                "운동/스트레칭 처방(집에서 가능한 루틴)",
                "자세 교정 습관 가이드(앉기/걷기/수면)",
                "단계별 재평가 + 목표 업데이트",
              ],
            },
          ],
        },
        {
          title: "치료는 이렇게 진행됩니다",
          isStages: true,
          stages: [
            { stage: "1단계", title: "초기 평가: 통증 패턴/정렬/가동성 체크" },
            { stage: "2단계", title: "맞춤 계획: 우선순위(상부 균형 → 보상 패턴 → 국소 통증) 설정" },
            { stage: "3단계", title: "집중 치료: 주 1~2회(개인별) + 홈루틴 병행" },
            { stage: "4단계", title: "유지 관리: 통증 재발 요인 점검 + 생활루틴 고정" },
          ],
        },
      ],
      faqs: [
        {
          question: "허리 디스크가 있어도 치료를 받을 수 있나요?",
          answer: "네, 가능합니다. 디스크 진단을 받으셨다면 초기 평가에서 상태를 확인하고, 무리한 자극 없이 진행할 수 있는 치료 방법을 선택합니다. TBT 접근은 강한 물리적 힘보다는 전신 균형을 통해 부담을 줄이는 방식입니다.",
        },
        {
          question: "무릎 통증인데 왜 턱관절/목을 보나요?",
          answer: "무릎 통증의 원인이 무릎 자체가 아니라 골반 틀어짐이나 자세 불균형에서 올 수 있기 때문입니다. 상부(턱관절·경추)의 불균형이 보상 패턴을 만들어 무릎에 과부하를 줄 수 있어, 전체적인 평가가 필요합니다.",
        },
        {
          question: "치료 기간은 보통 어느 정도인가요?",
          answer: "통증의 정도와 만성화 기간에 따라 다르지만, 일반적으로 8-12주 정도의 치료 기간을 권장합니다. 주 1-2회 내원하며, 초기 평가 후 개인별 목표와 기간을 설정합니다.",
        },
        {
          question: "치료 중 운동은 해야 하나요?",
          answer: "네, 권장됩니다. 치료 과정에서 개인별 상태에 맞는 스트레칭과 운동을 처방하며, 집에서 실천할 수 있는 루틴을 함께 안내합니다. 운동은 재발 방지와 회복 속도에 중요한 역할을 합니다.",
        },
        {
          question: "주사/수술 치료와 병행이 가능한가요?",
          answer: "네, 가능합니다. 현재 받고 계신 치료가 있다면 상담 시 알려주시면, 병행 가능 여부와 치료 순서를 함께 조율합니다. 필요시 의뢰 기관과 협진할 수도 있습니다.",
        },
        {
          question: "재발을 줄이려면 무엇이 가장 중요하나요?",
          answer: "생활 습관과 자세 관리가 가장 중요합니다. 치료로 통증이 완화되어도 이전의 습관(장시간 앉기, 불균형한 자세 등)이 유지되면 재발할 수 있습니다. 개인별 맞춤 운동과 생활 가이드를 꾸준히 실천하는 것이 핵심입니다.",
        },
      ],
    },
  };

  const clinic = clinicData[id || ""] || clinicData["cancer-immune"];

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center px-5 py-4">
          <Link to="/clinics" className="mr-4">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h2>{clinic.title}</h2>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="px-5 py-8 bg-gradient-to-b from-[#f5f6f8] to-white">
        {clinic.badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E91E7A]/10 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#E91E7A] rounded-full animate-pulse"></div>
            <span className="text-[#E91E7A] font-semibold text-sm">{clinic.badge}</span>
          </div>
        )}
        <h1 className="mb-2">{clinic.title}</h1>
        <p className="text-gray-600 font-semibold mb-4">{clinic.subtitle}</p>
        {clinic.description && (
          <p className="text-[#6B7D8C] leading-relaxed">{clinic.description}</p>
        )}
        {clinic.introMessage && (
          <p className="text-[#3E5266] mt-4 leading-relaxed font-medium">{clinic.introMessage}</p>
        )}
        {clinic.headerImage && (
          <div className="mt-6 rounded-xl overflow-hidden">
            <img 
              src={clinic.headerImage} 
              alt="클리닉 이미지" 
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </div>

      {/* 질환 선택 카드 (이명·난청·어지럼증·두통 전용) */}
      {clinic.hasConditionCards && clinic.conditionCards && (
        <div className="px-5 py-12 bg-white">
          <h2 className="text-center mb-8 text-[#3E5266]">증상별 클리닉</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {clinic.conditionCards.map((card: any, index: number) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#E91E7A] transition-all shadow-sm hover:shadow-lg">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[#3E5266] font-bold text-lg mb-4">{card.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-[#6B7D8C] font-semibold mb-2">대표 증상</p>
                    {card.symptoms.map((symptom: string, sIndex: number) => (
                      <div key={sIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                        <span className="text-[#6B7D8C] text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 증상 자가 체크 (이명·난청·어지럼증·두통 전용) */}
      {clinic.hasSelfCheck && clinic.selfCheckQuestions && (
        <SelfCheckSection questions={clinic.selfCheckQuestions} />
      )}

      {/* Sections */}
      <div className="px-5 py-8 space-y-12">
        {clinic.sections.map((section: any, index: number) => (
          <div key={index}>
            <h2 className="mb-4 text-[#3E5266]">{section.title}</h2>
            {section.description && (
              <p className="text-[#6B7D8C] mb-6 leading-relaxed">{section.description}</p>
            )}
            
            {/* 단계별 구조인 경우 */}
            {section.isStages ? (
              <div className="space-y-4">
                {section.stages.map((stage: any, stageIndex: number) => (
                  <div key={stageIndex} className="relative">
                    <div className="bg-white p-6 rounded-xl border-l-4 border-[#E91E7A] shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E91E7A]/10 flex items-center justify-center">
                          <span className="text-[#E91E7A] font-bold text-sm">{stage.stage}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#3E5266] font-semibold mb-1">{stage.title}</p>
                          {stage.description && (
                            <p className="text-[#6B7D8C] text-sm leading-relaxed">{stage.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {stageIndex < section.stages.length - 1 && (
                      <div className="flex justify-start pl-6 py-2">
                        <div className="w-px h-6 bg-[#E91E7A]/30"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : section.subsections ? (
              /* 서브섹션이 있는 경우 */
              <div className="space-y-6">
                {section.subsections.map((subsection: any, subIndex: number) => (
                  <div key={subIndex}>
                    <h3 className="text-[#3E5266] font-semibold mb-4">{subsection.subtitle}</h3>
                    
                    {/* 치료 프로그램 카드 (treatments) */}
                    {subsection.treatments ? (
                      <div className="space-y-6">
                        {subsection.treatments.map((treatment: any, tIndex: number) => (
                          <div key={tIndex} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            {treatment.image && (
                              <div className="h-40 overflow-hidden">
                                <img 
                                  src={treatment.image} 
                                  alt={treatment.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="p-6">
                              <h4 className="text-[#3E5266] font-bold text-lg mb-3">{treatment.name}</h4>
                              <p className="text-[#6B7D8C] mb-4 leading-relaxed">{treatment.description}</p>
                              
                              {treatment.effects && (
                                <div className="mb-4">
                                  <p className="text-sm text-[#3E5266] font-semibold mb-2">효과</p>
                                  <div className="flex flex-wrap gap-2">
                                    {treatment.effects.map((effect: string, eIndex: number) => (
                                      <span 
                                        key={eIndex}
                                        className="px-3 py-1 bg-[#E91E7A]/10 text-[#E91E7A] text-sm rounded-full"
                                      >
                                        {effect}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {treatment.frequency && (
                                <p className="text-sm text-[#6B7D8C] italic">{treatment.frequency}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* 일반 서브섹션 */
                      <div className="bg-[#F8F9FA] p-6 rounded-xl">
                        {subsection.description && (
                          <p className="text-[#6B7D8C] mb-4 leading-relaxed">{subsection.description}</p>
                        )}
                        <ul className="space-y-3">
                          {subsection.content.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 mr-3 flex-shrink-0" />
                              <span className="text-[#6B7D8C]">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {subsection.note && (
                          <p className="text-xs text-[#8FA8BA] mt-4 italic">{subsection.note}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {section.note && (
                  <p className="text-xs text-[#8FA8BA] italic mt-4">{section.note}</p>
                )}
              </div>
            ) : section.content ? (
              /* 일반 리스트 또는 이미지 포함 */
              <div>
                {section.image && (
                  <div className="mb-6 rounded-xl overflow-hidden">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <ul className="space-y-3 bg-[#F8F9FA] p-6 rounded-xl">
                  {section.content.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 mr-3 flex-shrink-0" />
                      <span className="text-[#6B7D8C]">{item}</span>
                    </li>
                  ))}
                </ul>
                {section.note && (
                  <p className="text-xs text-[#8FA8BA] italic mt-4">{section.note}</p>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="px-5 py-8 bg-[#f5f6f8]">
        <h2 className="mb-6">자주 묻는 질문</h2>
        
        <Accordion.Root type="single" collapsible className="space-y-3">
          {clinic.faqs.map((faq: any, index: number) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl overflow-hidden border border-gray-200"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                  <span className="text-left pr-4">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 data-[state=open]:rotate-180 flex-shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-5 text-gray-600">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      {/* CTA */}
      <div className="px-5 py-8">
        {/* 마지막 메시지 */}
        {clinic.finalMessage && (
          <div className="p-8 bg-gradient-to-br from-[#E91E7A]/5 to-[#3E5266]/5 rounded-2xl border-l-4 border-[#E91E7A]">
            <p className="text-[#3E5266] text-lg font-semibold mb-3 leading-relaxed">
              {clinic.finalMessage.title}
            </p>
            <p className="text-[#6B7D8C] leading-relaxed">
              {clinic.finalMessage.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 자가 체크 섹션 컴포넌트
function SelfCheckSection({ questions }: { questions: any[] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setShowResult(true);
    }
  };

  const getRecommendations = () => {
    const conditions = new Set<string>();
    Object.entries(answers).forEach(([index, answer]) => {
      // "자주 있다" 또는 "그렇다" 선택 시 당 질환 추가
      if (answer === "자주 있다" || answer === "그렇다" || answer === "가끔 있다" || answer === "가끔 그렇다") {
        conditions.add(questions[Number(index)].relatedCondition);
      }
    });
    return Array.from(conditions);
  };

  return (
    <div className="px-5 py-12 bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center mb-3 text-[#3E5266]">간단한 증상 체크</h2>
        <p className="text-center text-[#6B7D8C] mb-8">
          몇 가지 질문으로 어떤 클리닉이 도움될 수 있는지 확인해보세요
        </p>

        {!showResult ? (
          <div className="space-y-6">
            {questions.map((q: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-[#3E5266] font-semibold mb-4">
                  {index + 1}. {q.question}
                </p>
                <div className="flex flex-wrap gap-3">
                  {q.options.map((option: string, optionIndex: number) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswer(index, option)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        answers[index] === option
                          ? "border-[#E91E7A] bg-[#E91E7A]/10 text-[#E91E7A] font-semibold"
                          : "border-gray-200 hover:border-[#E91E7A]/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  Object.keys(answers).length === questions.length
                    ? "bg-[#E91E7A] text-white hover:bg-[#d11a6d] shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                결과 확인하기
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl border-2 border-[#E91E7A] shadow-lg">
            <h3 className="text-[#3E5266] font-bold text-xl mb-4 text-center">
              추천 클리닉
            </h3>
            <div className="space-y-3 mb-6">
              {getRecommendations().map((condition: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[#E91E7A]/5 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-[#E91E7A] flex-shrink-0" />
                  <span className="text-[#3E5266] font-semibold">{condition} 클리닉</span>
                </div>
              ))}
            </div>
            <p className="text-center text-[#6B7D8C] mb-6">
              위 증상에 해당하시는 경우 상담을 통해 더 자세한 평가를 받아보세요
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setAnswers({});
                  setShowResult(false);
                }}
                className="px-6 py-3 border-2 border-gray-300 text-[#3E5266] rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                다시 체크하기
              </button>
              <Link
                to="/reservation"
                className="px-6 py-3 bg-[#E91E7A] text-white rounded-xl hover:bg-[#d11a6d] transition-colors font-semibold"
              >
                진료 상담 예약
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}