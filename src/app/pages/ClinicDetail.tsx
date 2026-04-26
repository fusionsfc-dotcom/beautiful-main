import { useParams, Link } from "react-router";
import { ChevronLeft, CheckCircle } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import SEOHead from "../../components/seo/SEOHead";
import { makeBreadcrumbList } from "../../lib/schema/breadcrumb";
import { makeCancerConditionsJsonLd } from "../../lib/schema/conditions";

const PLACEHOLDER_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";
const WANG_MOXA_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/dd.jpg";
const ENZYME_STEAM_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/jj.png";
const RF_HYPERTHERMIA_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic_onco.jpeg";
const INPATIENT_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room/room2.jpg";
const CANCER_TYPE_CARD_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/te_2.png";

export default function ClinicDetail() {
  const { id } = useParams();

  const clinicData: Record<string, any> = {
    // 1) 뷰티풀 암케어
    "beautiful-cancer-care": {
      title: "뷰티풀 암케어",
      subtitle: "암 치료의 전 과정을 함께하는 통합 면역 클리닉",
      description:
        "뷰티풀한방병원의 뷰티풀 암케어는 대학병원 치료를 존중하며, 수술·항암·방사선 치료의 전 과정에서 환자의 회복을 돕는 통합 케어 프로그램입니다.",
      badge: "국립암센터 병행 암 통합 회복 클리닉",
      headerImage: RF_HYPERTHERMIA_CLINIC_IMAGE_URL,
      introMessage:
        "치료와 회복은 분리될 수 없습니다. 진단 직후부터 치료 종료 이후까지, 환자의 면역과 체력·정서 회복을 함께 설계합니다.",
      sections: [
        {
          title: "이런 분들께 도움이 됩니다",
          subsections: [
            {
              subtitle: "치료 순응도를 높이고 싶은 분",
              content: [
                "항암·방사선 부작용으로 치료가 중단될까 걱정인 분",
                "체력·면역 저하로 다음 치료가 연기된 경험이 있는 분"
              ]
            },
            {
              subtitle: "치료 후 회복이 더딘 분",
              content: [
                "수술·항암 이후 극심한 피로와 통증이 계속되는 분",
                "면역력 저하로 감염·염증이 반복되는 분"
              ]
            },
            {
              subtitle: "재발을 예방하고 싶은 분",
              content: [
                "치료 종료 후 재발·전이 관리가 필요한 분",
                "장기적인 면역·생활 관리가 필요한 분"
              ]
            }
          ]
        },
        {
          title: "통합 면역 치료 프로그램",
          description: "한방 면역 치료와 양방 통합 치료를 함께 적용하는 맞춤형 프로그램입니다.",
          subsections: [
            {
              subtitle: "한방 면역 회복 치료",
              treatments: [
                {
                  name: "왕뜸 · 약뜸 치료",
                  image: WANG_MOXA_CLINIC_IMAGE_URL,
                  description:
                    "열을 전달하여 체내 기혈 순환을 돕고 몸의 기운을 조절해 면역 균형 회복을 돕습니다.",
                  effects: ["혈액순환 개선", "면역력 강화", "체력 회복"]
                },
                {
                  name: "효소 찜질 치료",
                  image: ENZYME_STEAM_CLINIC_IMAGE_URL,
                  description:
                    "약 70도의 자연 발효열을 이용해 혈액·기혈 순환을 돕고 체내 노폐물 배출을 촉진합니다.",
                  effects: ["혈액순환 개선", "체온 상승", "피로 회복", "해독 작용"]
                }
              ]
            },
            {
              subtitle: "양방 통합 치료",
              treatments: [
                {
                  name: "고주파 온열 암 치료",
                  image: RF_HYPERTHERMIA_CLINIC_IMAGE_URL,
                  description:
                    "고주파 에너지로 암 조직 주변 온도를 높여 암세포의 성장 환경을 억제하고 면역 반응을 활성화합니다.",
                  effects: ["암세포 성장 억제", "면역 활성화", "항암 효과 보조", "통증 완화"],
                  frequency: "주 2~3회, 환자 상태에 맞는 개인 맞춤 프로토콜로 진행합니다."
                }
              ]
            }
          ]
        },
        {
          title: "치료 단계별 회복 관리",
          description: "치료 시기에 따라 4단계 맞춤 회복 프로그램을 진행합니다.",
          isStages: true,
          stages: [
            { stage: "1단계", title: "진단·수술 전후", description: "체력 준비, 수술 후 회복·면역 안정" },
            { stage: "2단계", title: "항암·방사선 치료 중", description: "부작용 완화, 면역·백혈구 관리" },
            { stage: "3단계", title: "치료 종료 직후", description: "피로·후유증 회복, 일상 복귀" },
            { stage: "4단계", title: "장기 관리", description: "재발·전이 예방, 생활 습관 관리" }
          ]
        },
        {
          title: "입원 케어 시스템",
          description: "환자의 상태에 따라 입원 치료와 외래 치료를 선택할 수 있습니다.",
          image: INPATIENT_CARE_IMAGE_URL,
          content: [
            "호텔급 1인실 입원 시설",
            "24시간 의료진 상주 케어",
            "환자 맞춤 영양 식단",
            "국립암센터 차량 15분 거리"
          ]
        }
      ],
      faqs: [
        {
          question: "대학병원 항암 치료와 병행할 수 있나요?",
          answer: "네. 대학병원 치료를 기본으로 하며, 병행하여 회복과 면역 관리 치료를 진행합니다."
        },
        {
          question: "입원 기간은 얼마나 되나요?",
          answer: "치료 단계와 환자 상태에 따라 1주 ~ 수주 단위로 계획합니다."
        },
        {
          question: "보험 적용이 되나요?",
          answer: "치료 항목에 따라 보험 적용 여부가 달라지며, 상담 시 자세히 안내드립니다."
        }
      ],
      finalMessage: {
        title: "암 치료의 여정, 혼자 걷지 않도록 함께합니다.",
        description:
          "뷰티풀한방병원은 치료 전부터 회복 이후까지, 환자의 일상 복귀 전 과정을 지원합니다."
      }
    },

    // 2) 암별 집중케어
    "cancer-specific-care": {
      title: "암별 집중케어",
      subtitle: "암종별 특성에 맞춘 맞춤 프로그램",
      description:
        "암은 종류에 따라 치료 방법과 부작용, 회복 방향이 달라집니다. 유방암·부인암·위대장암·폐암·간암 등 각 암종의 특성과 치료 단계에 맞춘 집중 케어를 제공합니다.",
      badge: "암종별 맞춤 통합 케어",
      headerImage: WANG_MOXA_CLINIC_IMAGE_URL,
      introMessage: "같은 암도 환자마다 치료 경과가 다릅니다. 암종·병기·치료 이력에 따라 맞춤 프로토콜을 설계합니다.",
      hasConditionCards: true,
      conditionCards: [
        {
          title: "유방암",
          image: CANCER_TYPE_CARD_IMAGE_URL,
          symptoms: [
            "수술 후 상지 부종·통증 관리",
            "호르몬 치료 부작용 완화",
            "방사선 피부염·피로 케어"
          ]
        },
        {
          title: "자궁·난소암",
          image: CANCER_TYPE_CARD_IMAGE_URL,
          symptoms: [
            "수술 후 골반 부종·통증 관리",
            "항암 후 백혈구·체력 회복",
            "폐경·호르몬 변화 대응"
          ]
        },
        {
          title: "위·대장암",
          image: CANCER_TYPE_CARD_IMAGE_URL,
          symptoms: [
            "수술 후 소화 기능 회복",
            "체중·영양 저하 관리",
            "항암 오심·설사·말초신경 증상 관리"
          ]
        },
        {
          title: "폐암",
          image: CANCER_TYPE_CARD_IMAGE_URL,
          symptoms: [
            "호흡 곤란·기침·가래 완화",
            "방사선 폐렴·폐 기능 회복",
            "체력·면역 집중 관리"
          ]
        },
        {
          title: "간암",
          image: CANCER_TYPE_CARD_IMAGE_URL,
          symptoms: [
            "간 기능 회복과 피로 개선",
            "색전술·고주파 치료 후 관리",
            "식욕·소화 기능 회복"
          ]
        },
        {
          title: "기타 암",
          image: CANCER_TYPE_CARD_IMAGE_URL,
          symptoms: [
            "두경부·췌장·담도·혈액암 등 개별 맞춤",
            "희귀암·진행성 암 통합 관리",
            "전이 관리 및 삶의 질 개선"
          ]
        }
      ],
      sections: [
        {
          title: "암종별 접근 원칙",
          subsections: [
            {
              subtitle: "암종 특성 분석",
              content: [
                "암종별 치료 프로토콜(수술·항암·방사선·표적·호르몬)에 따른 부작용 패턴 분석",
                "치료 단계(치료 전/중/후)에 따른 회복 우선순위 결정"
              ]
            },
            {
              subtitle: "환자 개별 평가",
              content: [
                "체력·면역 상태, 기저 질환, 복용 약물 등 종합 평가",
                "영양·수면·정서 상태를 포함한 전인적 평가"
              ]
            },
            {
              subtitle: "맞춤 프로토콜 설계",
              content: [
                "한방 치료(왕뜸·약뜸·한약·침) + 양방 치료(고주파 온열)의 조합 결정",
                "치료 빈도와 기간을 환자 상태에 맞춰 조정"
              ]
            }
          ]
        },
        {
          title: "암종별 주요 케어 포인트",
          isStages: true,
          stages: [
            { stage: "유방암", title: "상지 부종·호르몬 부작용 관리", description: "림프 부종, 안면 홍조, 관절통 등" },
            { stage: "부인암", title: "골반 부종·호르몬 변화 관리", description: "하지 부종, 폐경 증상, 골다공증 예방" },
            { stage: "위·대장암", title: "소화·영양 회복 관리", description: "체중 감소, 영양 결핍, 배변 이상 개선" },
            { stage: "폐암", title: "호흡기·폐 기능 관리", description: "호흡 곤란, 방사선 폐렴, 기침·가래 완화" },
            { stage: "간암", title: "간 기능·대사 관리", description: "피로, 복수, 식욕 저하, 황달 관리 보조" }
          ]
        }
      ],
      faqs: [
        {
          question: "어떤 암까지 관리할 수 있나요?",
          answer: "고형암·혈액암 등 대부분의 암종에 대해 맞춤 케어가 가능합니다. 상담 시 병기와 치료 이력을 토대로 개인 맞춤 프로토콜을 안내드립니다."
        },
        {
          question: "다른 병원 치료와 병행해도 되나요?",
          answer: "네. 대학병원·전문병원 치료가 주(主)가 되며, 뷰티풀한방병원은 회복·부작용 관리 역할을 수행합니다."
        },
        {
          question: "암종에 따라 치료가 많이 달라지나요?",
          answer: "네. 부작용 양상과 회복 포인트가 달라 한약 처방, 뜸·침 위치, 고주파 적용 부위 등이 달라집니다."
        }
      ],
      finalMessage: {
        title: "같은 암이라도 환자마다 회복의 길은 다릅니다.",
        description: "뷰티풀한방병원은 암종과 환자 상태에 맞춘 개별 프로토콜을 설계합니다."
      }
    },

    // 3) 수술 후 회복케어
    "post-surgery-recovery": {
      title: "수술 후 회복케어",
      subtitle: "수술 이후 체력·면역 회복의 시작",
      description:
        "암 수술 이후 회복 속도는 다음 치료의 순응도를 결정합니다. 체력 저하, 통증, 부종, 상처 회복 지연을 조기에 관리하여 항암·방사선 치료로 순조롭게 이어지도록 돕습니다.",
      badge: "수술 후 통합 회복 프로그램",
      headerImage: INPATIENT_CARE_IMAGE_URL,
      introMessage: "수술은 치료의 한 단계일 뿐입니다. 회복이 늦어지면 다음 치료가 지연되고, 예후에도 영향을 미칩니다.",
      sections: [
        {
          title: "이런 분들께 도움이 됩니다",
          subsections: [
            {
              subtitle: "수술 직후 회복이 필요한 분",
              content: [
                "수술 후 극심한 피로와 무기력이 지속되는 분",
                "절개 부위 통증·부종이 오래 지속되는 분",
                "마취 후 소화 장애·변비가 심한 분"
              ]
            },
            {
              subtitle: "다음 치료를 준비해야 하는 분",
              content: [
                "항암·방사선 치료를 앞두고 체력이 부족한 분",
                "면역·영양 상태가 낮아 치료가 연기될 가능성이 있는 분"
              ]
            }
          ]
        },
        {
          title: "수술 후 회복 프로그램",
          subsections: [
            {
              subtitle: "한방 회복 치료",
              treatments: [
                {
                  name: "왕뜸·약뜸 치료",
                  image: WANG_MOXA_CLINIC_IMAGE_URL,
                  description: "복부·허리 등 수술 부위 주변 혈류를 개선하여 회복을 촉진합니다.",
                  effects: ["혈액순환 개선", "통증·부종 완화", "체온 회복"]
                },
                {
                  name: "효소 찜질",
                  image: ENZYME_STEAM_CLINIC_IMAGE_URL,
                  description: "체내 노폐물을 배출하고 전신 순환을 도와 피로를 개선합니다.",
                  effects: ["피로 회복", "해독 작용", "수면 개선"]
                }
              ]
            },
            {
              subtitle: "맞춤 한약 처방",
              content: [
                "수술 후 기력 회복을 위한 보기·보혈 처방",
                "장 기능·소화 회복을 위한 개별 맞춤 한약",
                "면역 안정·수면 개선 처방"
              ]
            }
          ]
        },
        {
          title: "회복 단계별 관리",
          isStages: true,
          stages: [
            { stage: "0~2주", title: "초기 회복", description: "통증·부종 관리, 기초 체력 유지" },
            { stage: "3~4주", title: "기능 회복", description: "소화·수면 개선, 면역 안정" },
            { stage: "5~8주", title: "다음 치료 준비", description: "체력·영양 회복, 항암·방사선 치료 대비" }
          ]
        },
        {
          title: "입원 회복 환경",
          description: "안정적인 회복을 위해 전용 입원 환경을 제공합니다.",
          image: INPATIENT_CARE_IMAGE_URL,
          content: [
            "호텔급 1인실 입원 시설",
            "맞춤 회복 식단 제공",
            "24시간 의료진 상주",
            "보호자 동반 가능"
          ]
        }
      ],
      faqs: [
        {
          question: "수술 후 얼마 만에 입원 가능한가요?",
          answer: "수술 상처와 전신 상태에 따라 다르며, 보통 퇴원 직후부터 입원 회복 프로그램을 진행할 수 있습니다."
        },
        {
          question: "외래로도 가능한가요?",
          answer: "네. 거리·상태에 따라 외래 치료로도 진행 가능합니다."
        },
        {
          question: "수술 이력을 꼭 알려드려야 하나요?",
          answer: "네. 수술 부위와 날짜, 병기·조직 소견을 알려주시면 맞춤 프로토콜을 설계할 수 있습니다."
        }
      ],
      finalMessage: {
        title: "수술 이후의 회복이 다음 치료의 성패를 좌우합니다.",
        description: "뷰티풀한방병원은 수술 직후부터 안정적인 회복 환경을 제공합니다."
      }
    },

    // 4) 항암치료 환자 케어
    "chemotherapy-care": {
      title: "항암치료 환자 케어",
      subtitle: "항암 치료를 끝까지 받을 수 있도록",
      description:
        "항암 치료 중 나타나는 오심·구토, 식욕 저하, 백혈구 감소, 말초신경병증, 구내염 등 다양한 부작용을 관리하여 치료 순응도를 높이고 다음 항암으로 이어지도록 돕습니다.",
      badge: "항암 부작용 집중 관리",
      headerImage: ENZYME_STEAM_CLINIC_IMAGE_URL,
      introMessage: "항암 치료의 성공은 '예정된 일정대로 끝까지 받는 것'입니다. 부작용 관리가 그 열쇠입니다.",
      sections: [
        {
          title: "이런 항암 부작용을 관리합니다",
          subsections: [
            {
              subtitle: "소화기 증상",
              content: [
                "오심·구토, 식욕 저하",
                "구내염·미각 변화",
                "설사·변비 등 배변 이상"
              ]
            },
            {
              subtitle: "혈액·면역 관련",
              content: [
                "백혈구·호중구 감소",
                "빈혈, 극심한 피로",
                "반복되는 감염·염증"
              ]
            },
            {
              subtitle: "신경·기타",
              content: [
                "손발 저림·감각 저하(말초신경병증)",
                "탈모·피부 건조",
                "수면 장애·정서 불안"
              ]
            }
          ]
        },
        {
          title: "항암 부작용 케어 프로그램",
          subsections: [
            {
              subtitle: "한방 치료",
              treatments: [
                {
                  name: "왕뜸·약뜸",
                  image: WANG_MOXA_CLINIC_IMAGE_URL,
                  description: "체온 저하와 면역 저하를 완화하고 기혈 순환을 회복시킵니다.",
                  effects: ["백혈구 회복 보조", "체온 상승", "피로 완화"]
                },
                {
                  name: "효소 찜질",
                  image: ENZYME_STEAM_CLINIC_IMAGE_URL,
                  description: "체내 해독과 순환을 돕고 수면·피로를 개선합니다.",
                  effects: ["피로 회복", "수면 개선", "순환 촉진"]
                }
              ]
            },
            {
              subtitle: "증상별 맞춤 한약",
              content: [
                "오심·식욕 저하 완화 처방",
                "백혈구·면역 회복 처방",
                "말초신경병증·통증 완화 처방",
                "수면·불안 안정 처방"
              ]
            }
          ]
        },
        {
          title: "항암 주기별 관리",
          description: "항암 주기에 맞춰 부작용 관리 스케줄을 조정합니다.",
          isStages: true,
          stages: [
            { stage: "항암 전", title: "체력·면역 준비", description: "컨디션을 끌어올려 부작용을 예방" },
            { stage: "항암 중", title: "급성 부작용 관리", description: "오심·식욕 저하·구내염 등 즉각 대응" },
            { stage: "항암 후 1~2주", title: "수치·체력 회복", description: "백혈구 저하기, 감염 예방·회복" },
            { stage: "다음 항암 전", title: "다음 치료 준비", description: "수치·체력 점검, 컨디션 재정비" }
          ]
        }
      ],
      faqs: [
        {
          question: "항암 도중에 뜸이나 한약을 써도 되나요?",
          answer: "네. 항암제와 상호작용을 고려해 시기와 용량을 조절하며, 종양내과 진료 일정에 맞춰 진행합니다."
        },
        {
          question: "백혈구가 낮으면 어떻게 하나요?",
          answer: "수치가 낮은 시기에 적합한 보조 치료와 한약을 선택하여 회복을 돕습니다. 심한 경우 치료를 조정할 수 있습니다."
        },
        {
          question: "말초신경병증 증상도 관리되나요?",
          answer: "네. 침·뜸·한약 복합 치료로 손발 저림·감각 저하를 완화할 수 있습니다."
        }
      ],
      finalMessage: {
        title: "항암의 끝까지 함께하는 케어",
        description: "부작용 때문에 치료가 흔들리지 않도록, 다음 항암 주기를 지켜드립니다."
      }
    },

    // 5) 방사선치료 환자 케어
    "radiation-care": {
      title: "방사선치료 환자 케어",
      subtitle: "방사선 부작용을 줄이고 조직 회복을 돕습니다",
      description:
        "방사선 치료 중·후 나타나는 피부염, 점막 손상, 피로, 부종, 방사선 폐렴 등을 관리하여 예정된 치료를 끝까지 받을 수 있도록 돕고 치료 후 조직 회복을 촉진합니다.",
      badge: "방사선 부작용 집중 관리",
      headerImage: CANCER_TYPE_CARD_IMAGE_URL,
      introMessage: "방사선 치료는 부위별로 부작용이 다릅니다. 각 치료 부위의 특성에 맞춘 케어가 필요합니다.",
      sections: [
        {
          title: "이런 방사선 부작용을 관리합니다",
          subsections: [
            {
              subtitle: "피부·점막 관련",
              content: [
                "방사선 피부염(홍반·건조·벗겨짐)",
                "점막염·구내염(두경부 방사선 시)",
                "질·직장 점막 염증(골반 방사선 시)"
              ]
            },
            {
              subtitle: "장기·조직 관련",
              content: [
                "방사선 폐렴·마른기침(흉부 방사선)",
                "방광염·배뇨 이상(골반 방사선)",
                "설사·소화 장애(복부 방사선)"
              ]
            },
            {
              subtitle: "전신 증상",
              content: [
                "극심한 피로와 무기력",
                "식욕 저하·체중 감소",
                "수면 장애·정서 불안"
              ]
            }
          ]
        },
        {
          title: "방사선 치료 케어 프로그램",
          subsections: [
            {
              subtitle: "조직 회복 치료",
              treatments: [
                {
                  name: "효소 찜질",
                  image: ENZYME_STEAM_CLINIC_IMAGE_URL,
                  description: "방사선 치료 부위를 직접 자극하지 않는 선에서 전신 순환과 해독을 돕습니다.",
                  effects: ["순환 촉진", "피로 개선", "해독 작용"]
                },
                {
                  name: "왕뜸·약뜸 치료",
                  image: WANG_MOXA_CLINIC_IMAGE_URL,
                  description: "치료 부위를 피해 체력·면역 회복 포인트에 시술하여 회복을 촉진합니다.",
                  effects: ["면역 회복", "체력 보강", "피로 완화"]
                }
              ]
            },
            {
              subtitle: "맞춤 한약 처방",
              content: [
                "방사선 피부염 회복 처방(외용·내복)",
                "점막 보호 및 구내염 완화 처방",
                "폐·기관지 보호 처방(흉부 방사선 시)",
                "피로·식욕 저하 회복 처방"
              ]
            }
          ]
        },
        {
          title: "방사선 치료 단계별 관리",
          isStages: true,
          stages: [
            { stage: "치료 전", title: "조직 준비", description: "체력 강화, 피부·점막 기초 관리" },
            { stage: "치료 중", title: "부작용 실시간 관리", description: "피부염·점막염·피로 완화" },
            { stage: "치료 직후", title: "급성 반응 회복", description: "조직 재생 촉진, 염증 관리" },
            { stage: "치료 후 장기", title: "후유증 관리", description: "섬유화·기능 저하 예방 관리" }
          ]
        }
      ],
      faqs: [
        {
          question: "방사선 치료 중에도 한방 치료가 가능한가요?",
          answer: "네. 단, 치료 부위에 직접 자극을 주지 않도록 시술 부위·방법을 조정합니다. 방사선 종양학과 일정에 맞춰 진행합니다."
        },
        {
          question: "피부염이 생겼는데 어떻게 해야 하나요?",
          answer: "상태에 따라 외용 한약·연고와 내복약을 병행하여 회복을 돕습니다. 증상이 심할 경우 치료를 일시 조정할 수 있습니다."
        },
        {
          question: "방사선 치료가 끝난 후에도 관리가 필요한가요?",
          answer: "네. 조직 섬유화·기능 저하는 수개월~수년에 걸쳐 진행될 수 있어 장기 관리가 권장됩니다."
        }
      ],
      finalMessage: {
        title: "방사선 치료가 끝나도 회복은 계속됩니다.",
        description: "급성 반응부터 장기 후유증까지, 조직 회복의 전 과정을 돕습니다."
      }
    }
  };

  const defaultId = "beautiful-cancer-care";
  const clinic = clinicData[id || ""] || clinicData[defaultId];

  const seoMeta: Record<string, { title: string; description: string; keywords: string }> = {
    "beautiful-cancer-care": {
      title: "뷰티풀 암케어 | 뷰티풀한방병원 · 국립암센터 인근 암요양병원",
      description:
        "수술·항암·방사선 치료 전 과정의 회복을 돕는 통합 면역 케어. 국립암센터 차량 15분 거리, 호텔급 입원 시설.",
      keywords:
        "암요양병원,통합암치료,면역치료,한방암치료,항암부작용관리,고주파온열치료,파주암요양병원,일산암요양병원,고양암요양병원"
    },
    "cancer-specific-care": {
      title: "암별 집중케어 | 유방암·부인암·위대장암·폐암·간암 맞춤 한방 치료",
      description:
        "암종별 특성과 치료 단계에 맞춘 맞춤 프로그램. 유방암·부인암·위대장암·폐암·간암 등의 집중 케어.",
      keywords:
        "유방암한방,부인암,자궁암,난소암,위암,대장암,폐암,간암,암종별맞춤치료,암종별관리"
    },
    "post-surgery-recovery": {
      title: "수술 후 회복케어 | 암 수술 후 체력·면역 회복 한방 프로그램",
      description:
        "암 수술 이후 체력 회복, 통증·부종 관리, 다음 치료 준비를 돕는 통합 회복 프로그램.",
      keywords: "수술후회복,암수술회복,수술후한방,수술후입원,수술후부종,회복프로그램"
    },
    "chemotherapy-care": {
      title: "항암치료 환자 케어 | 항암 부작용 관리 한방 클리닉",
      description:
        "오심·구토·백혈구 감소·말초신경병증 등 항암 부작용을 관리하여 치료 순응도를 높입니다.",
      keywords: "항암부작용,백혈구관리,항암한방,말초신경병증,항암오심,항암피로"
    },
    "radiation-care": {
      title: "방사선치료 환자 케어 | 방사선 부작용 완화 한방 치료",
      description:
        "방사선 피부염·점막염·피로·방사선 폐렴을 완화하고 조직 회복을 돕는 맞춤 프로그램.",
      keywords: "방사선부작용,방사선피부염,방사선폐렴,점막염,방사선한방,조직회복"
    }
  };

  const currentSeo = seoMeta[id || ""] || seoMeta[defaultId];

  const clinicId = id || defaultId;

  const clinicJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.title,
    description: currentSeo.description,
    url: `https://www.btful.co.kr/clinics/${clinicId}`,
    medicalSpecialty: clinic.subtitle,
    availableService:
      clinic.sections
        ?.filter((s: any) => s.subsections?.some((sub: any) => sub.treatments))
        .flatMap((s: any) =>
          s.subsections
            .filter((sub: any) => sub.treatments)
            .flatMap((sub: any) =>
              sub.treatments.map((t: any) => ({
                "@type": "MedicalTherapy",
                name: t.name,
                description: t.description
              }))
            )
        ) || [],
    isPartOf: { "@id": "https://www.btful.co.kr/#hospital" },
  };

  const clinicNames: Record<string, string> = {
    "beautiful-cancer-care": "뷰티풀 암케어",
    "cancer-specific-care": "암별 집중케어",
    "post-surgery-recovery": "수술 후 회복케어",
    "chemotherapy-care": "항암치료 환자 케어",
    "radiation-care": "방사선치료 환자 케어",
  };

  const jsonLdSchemas: object[] = [
    clinicJsonLd,
    makeBreadcrumbList([
      { name: "암 치료 클리닉", path: "/clinics" },
      { name: clinicNames[clinicId] ?? clinic.title, path: `/clinics/${clinicId}` },
    ]),
    ...(clinicId === "cancer-specific-care" ? makeCancerConditionsJsonLd() : []),
  ];

  return (
    <div className="min-h-[100dvh] bg-white">
      <SEOHead
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        ogUrl={`https://www.btful.co.kr/clinics/${clinicId}`}
        canonical={`https://www.btful.co.kr/clinics/${clinicId}`}
        jsonLd={jsonLdSchemas}
      />

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

      {/* 암종별 카드 (암별 집중케어 전용) */}
      {clinic.hasConditionCards && clinic.conditionCards && (
        <div className="px-5 py-12 bg-white">
          <h2 className="text-center mb-8 text-[#3E5266]">암종별 집중 케어</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {clinic.conditionCards.map((card: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#E91E7A] transition-all shadow-sm hover:shadow-lg"
              >
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
                    <p className="text-sm text-[#6B7D8C] font-semibold mb-2">주요 케어 포인트</p>
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

      {/* Sections */}
      <div className="px-5 py-8 space-y-12">
        {clinic.sections.map((section: any, index: number) => (
          <div key={index}>
            <h2 className="mb-4 text-[#3E5266]">{section.title}</h2>
            {section.description && (
              <p className="text-[#6B7D8C] mb-6 leading-relaxed">{section.description}</p>
            )}

            {section.isStages ? (
              <div className="space-y-4">
                {section.stages.map((stage: any, stageIndex: number) => (
                  <div key={stageIndex} className="relative">
                    <div className="bg-white p-6 rounded-xl border-l-4 border-[#E91E7A] shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 px-3 h-12 min-w-[3rem] rounded-full bg-[#E91E7A]/10 flex items-center justify-center">
                          <span className="text-[#E91E7A] font-bold text-sm whitespace-nowrap">
                            {stage.stage}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#3E5266] font-semibold mb-1">{stage.title}</p>
                          {stage.description && (
                            <p className="text-[#6B7D8C] text-sm leading-relaxed">
                              {stage.description}
                            </p>
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
              <div className="space-y-6">
                {section.subsections.map((subsection: any, subIndex: number) => (
                  <div key={subIndex}>
                    <h3 className="text-[#3E5266] font-semibold mb-4">{subsection.subtitle}</h3>

                    {subsection.treatments ? (
                      <div className="space-y-6">
                        {subsection.treatments.map((treatment: any, tIndex: number) => (
                          <div
                            key={tIndex}
                            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                          >
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
                              <h4 className="text-[#3E5266] font-bold text-lg mb-3">
                                {treatment.name}
                              </h4>
                              <p className="text-[#6B7D8C] mb-4 leading-relaxed">
                                {treatment.description}
                              </p>

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
                      <div className="bg-[#F8F9FA] p-6 rounded-xl">
                        {subsection.description && (
                          <p className="text-[#6B7D8C] mb-4 leading-relaxed">
                            {subsection.description}
                          </p>
                        )}
                        <ul className="space-y-3">
                          {subsection.content.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 mr-3 flex-shrink-0" />
                              <span className="text-[#6B7D8C]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : section.content ? (
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
