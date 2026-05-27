/** TbtFinalMessage — 마무리 메시지 (다크브라운 배경 + 이미지) */
import { TBT_HEART_HANDS_IMAGE } from "../../../data/tbtData";

export default function TbtFinalMessage() {
  return (
    <section className="px-5 lg:px-8 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#3D2817] rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch">
          {/* 텍스트 */}
          <div className="flex-1 px-7 py-8 flex flex-col justify-center gap-3">
            <p className="text-[#C9A567] text-[13px] font-medium">
              항암 치료 중 나타나는 다양한 증상
            </p>
            <h3 className="text-white text-[18px] lg:text-[22px] font-extrabold leading-snug">
              턱관절에서 해결의 실마리를
              <br />
              찾을 수 있습니다.
            </h3>
          </div>

          {/* 이미지 */}
          <div className="w-full md:w-56 lg:w-72 h-44 md:h-auto flex-shrink-0 relative">
            {/* TODO: 실제 손하트 이미지로 교체 — /public/images/redesign/tbt/heart-hands.png */}
            <img
              src={TBT_HEART_HANDS_IMAGE}
              alt="환자를 향한 따뜻한 손"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3D2817]/50 to-transparent md:from-transparent md:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
