import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import SEOHead from "../../components/seo/SEOHead";
import { makeBreadcrumbList } from "../../lib/schema/breadcrumb";

interface ReservationForm {
  name: string;
  phone: string;
  clinic: string;
  visitType: "outpatient" | "inpatient";
  consultMethod: "phone" | "kakao" | "visit";
  message: string;
  privacyConsent: boolean;
}

export default function Reservation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationForm>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const onSubmit = async (data: ReservationForm) => {
    try {
      setIsSubmitting(true);

      const { data: { session } } = await supabase.auth.getSession();
      const authToken = session?.access_token ?? publicAnonKey;

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/consultations`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("상담 요청이 접수되었습니다! 빠른 시간 내에 연락드리겠습니다.");
        setIsSubmitted(true);
        reset();

        setTimeout(() => {
          navigate(isAuthenticated ? "/my-consultations" : "/");
        }, 2000);
      } else {
        toast.error(result.error || "상담 요청에 실패했습니다");
      }
    } catch (error: unknown) {
      console.error("❌ 상담 요청 에러:", error);
      toast.error("상담 요청에 실패했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clinicOptions = [
    "수술 후 암케어",
    "항암치료 중 암케어",
    "방사선치료 중 암케어",
    "암 면역케어",
    "기타",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-[100dvh] bg-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#6A5542] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2">상담 요청이 접수되었습니다</h2>
          <p className="text-[#756A60]">
            영업일 기준 24시간 내에 연락드리겠습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <SEOHead
        title="예약·상담 | 뷰티풀한방병원"
        description="뷰티풀한방병원 진료 예약 및 상담 안내. 암 면역 치료, 이명, 중풍 재활 등 전문 상담을 받아보세요. 전화 031-945-2000"
        keywords="한방병원예약,암치료상담,뷰티풀한방병원예약,파주한방병원상담"
        ogUrl="https://www.btful.co.kr/reservation"
        canonical="https://www.btful.co.kr/reservation"
        jsonLd={makeBreadcrumbList([{ name: "예약·상담", path: "/reservation" }])}
      />
      <header className="px-5 py-6 border-b border-[#D8CDBE]">
        <h1>예약 · 상담</h1>
        <p className="mt-2 text-[#756A60]">
          간단한 정보를 입력하시면 빠르게 연락드립니다
        </p>
      </header>

      <div className="px-5 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "이름을 입력해주세요" })}
              className="w-full px-4 py-3 bg-[#EFE7DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A856D]"
              placeholder="홍길동"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-2">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", { 
                required: "연락처를 입력해주세요",
                pattern: {
                  value: /^[0-9-]+$/,
                  message: "올바른 전화번호를 입력해주세요"
                }
              })}
              className="w-full px-4 py-3 bg-[#EFE7DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A856D]"
              placeholder="010-1234-5678"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Clinic Selection */}
          <div>
            <label htmlFor="clinic" className="block mb-2">
              원하시는 클리닉 <span className="text-red-500">*</span>
            </label>
            <select
              id="clinic"
              {...register("clinic", { required: "클리닉을 선택해주세요" })}
              className="w-full px-4 py-3 bg-[#EFE7DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A856D]"
            >
              <option value="">선택해주세요</option>
              {clinicOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.clinic && (
              <p className="mt-1 text-sm text-red-500">{errors.clinic.message}</p>
            )}
          </div>

          {/* Visit Type */}
          <div>
            <label className="block mb-3">
              진료 유형 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <label className="flex-1">
                <input
                  type="radio"
                  value="outpatient"
                  {...register("visitType", { required: true })}
                  className="sr-only peer"
                />
                <div className="px-4 py-3 bg-[#EFE7DC] rounded-xl text-center cursor-pointer peer-checked:bg-[#6A5542] peer-checked:text-white transition-colors">
                  외래 진료
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  value="inpatient"
                  {...register("visitType", { required: true })}
                  className="sr-only peer"
                />
                <div className="px-4 py-3 bg-[#EFE7DC] rounded-xl text-center cursor-pointer peer-checked:bg-[#6A5542] peer-checked:text-white transition-colors">
                  입원 상담
                </div>
              </label>
            </div>
          </div>

          {/* Consult Method */}
          <div>
            <label className="block mb-3">
              상담 채널 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <label>
                <input
                  type="radio"
                  value="phone"
                  {...register("consultMethod", { required: true })}
                  className="sr-only peer"
                />
                <div className="px-4 py-3 bg-[#EFE7DC] rounded-xl text-center cursor-pointer peer-checked:bg-[#6A5542] peer-checked:text-white transition-colors flex flex-col items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">전화</span>
                </div>
              </label>
              <label>
                <input
                  type="radio"
                  value="kakao"
                  {...register("consultMethod", { required: true })}
                  className="sr-only peer"
                />
                <div className="px-4 py-3 bg-[#EFE7DC] rounded-xl text-center cursor-pointer peer-checked:bg-[#9A856D] peer-checked:text-white transition-colors flex flex-col items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">카카오톡</span>
                </div>
              </label>
              <label>
                <input
                  type="radio"
                  value="visit"
                  {...register("consultMethod", { required: true })}
                  className="sr-only peer"
                />
                <div className="px-4 py-3 bg-[#EFE7DC] rounded-xl text-center cursor-pointer peer-checked:bg-[#6A5542] peer-checked:text-white transition-colors flex flex-col items-center gap-2">
                  <span className="text-xl">🏥</span>
                  <span className="text-sm">방문</span>
                </div>
              </label>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-2">
              증상 및 문의사항
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={4}
              className="w-full px-4 py-3 bg-[#EFE7DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A856D] resize-none"
              placeholder="현재 증상이나 궁금하신 점을 자유롭게 작성해주세요"
            />
          </div>

          {/* Privacy Consent */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("privacyConsent", { 
                  required: "개인정보 수집 및 이용에 동의해주세요" 
                })}
                className="mt-1"
              />
              <span className="text-sm text-[#756A60]">
                (필수) 개인정보 수집 및 이용에 동의합니다.<br />
                수집 항목: 이름, 연락처<br />
                이용 목적: 상담 및 예약 안내<br />
                보유 기간: 상담 완료 후 1년
              </span>
            </label>
            {errors.privacyConsent && (
              <p className="mt-1 text-sm text-red-500">{errors.privacyConsent.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#8BC31F] text-white rounded-xl hover:bg-[#75A915] transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '상담 요청 보내기'}
          </button>
        </form>
      </div>

      {/* Quick Contact */}
      <div className="px-5 pb-8">
        <div className="p-5 bg-[#EFE7DC] rounded-xl">
          <h3 className="mb-3">빠른 상담</h3>
          <p className="text-sm text-[#756A60] mb-4">
            급하신 경우 바로 연락주세요
          </p>
          <div className="flex gap-3">
            <a
              href="tel:031-945-2000"
              className="w-full py-3 bg-[#9A856D] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#7C654F] transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>전화하기</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}