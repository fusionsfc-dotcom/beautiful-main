import { Phone, MessageSquare, HeartHandshake } from "lucide-react";

const TEL = "tel:031-966-6677";
const NAVER_TALK = "https://talk.naver.com/ct/wc9es3";

interface ConsultBoxSimpleProps {
  question: string;
  colors: { main: string; bg: string; label: string };
}

export default function ConsultBoxSimple({ question, colors }: ConsultBoxSimpleProps) {
  return (
    <section className="px-5 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FBF5E9] rounded-2xl px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* 아이콘 */}
          <div className="w-12 h-12 rounded-full bg-[#F0E6D2] flex-shrink-0 flex items-center justify-center">
            <HeartHandshake size={22} color="#5B3A1F" strokeWidth={1.8} />
          </div>

          {/* 질문 텍스트 */}
          <p className="flex-1 text-[15px] font-extrabold text-[#2A1F18] leading-snug">
            {question}
          </p>

          {/* 버튼 */}
          <div className="flex gap-2 flex-wrap">
            <a
              href={TEL}
              className="inline-flex items-center gap-2 bg-[#3D2817] text-white text-[12px] font-bold px-4 py-2.5 rounded-full hover:bg-[#5B3A1F] transition-colors"
            >
              <Phone size={13} />
              전화 상담
            </a>
            <a
              href={NAVER_TALK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white text-[12px] font-bold px-4 py-2.5 rounded-full hover:opacity-80 transition-opacity"
              style={{ backgroundColor: colors.main }}
            >
              <MessageSquare size={13} />
              네이버 톡톡
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
