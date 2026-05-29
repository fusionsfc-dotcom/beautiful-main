import { HeartHandshake } from "lucide-react";

interface ConsultBoxSimpleProps {
  question: string;
  colors: { main: string; bg: string; label: string };
}

export default function ConsultBoxSimple({ question, colors }: ConsultBoxSimpleProps) {
  return (
    <section className="px-5 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FFFFFF] rounded-2xl px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* 아이콘 */}
          <div className="w-12 h-12 rounded-full bg-[#EFE7DC] flex-shrink-0 flex items-center justify-center">
            <HeartHandshake size={22} color="#9A856D" strokeWidth={1.8} />
          </div>

          {/* 질문 텍스트 */}
          <p className="flex-1 text-[15px] font-extrabold text-[#2F2A26] leading-snug">
            {question}
          </p>

        </div>
      </div>
    </section>
  );
}
