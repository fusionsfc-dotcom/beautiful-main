import { Shield, BedDouble, Leaf, Soup } from "lucide-react";

const ITEMS = [
  {
    Icon: Shield,
    title: "27년 암 치료 경험",
    subtitle: "전문 의료진",
  },
  {
    Icon: BedDouble,
    title: "프라이버시와 편안함",
    subtitle: "1인실 중심 환경",
  },
  {
    Icon: Leaf,
    title: "자연과 연결된 치유",
    subtitle: "회복 환경",
  },
  {
    Icon: Soup,
    title: "맞춤 항암 식단",
    subtitle: "면역·영양 관리",
  },
];

export default function DifferentiationBar() {
  return (
    <section className="px-5 lg:px-8 py-6 lg:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-[#D8CDBE] overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={[
                  "flex flex-col items-center text-center py-6 px-4 gap-3",
                  // 구분선: 오른쪽 경계 (마지막 열 제외)
                  i % 2 === 0 ? "border-r border-[#D8CDBE]" : "",
                  // 모바일: 상단 행 아래 경계선
                  i < 2 ? "border-b border-[#D8CDBE] lg:border-b-0" : "",
                  // 데스크탑: 4열이므로 첫 3개에만 오른쪽 선
                  i < 3 ? "lg:border-r lg:border-[#D8CDBE]" : "lg:border-r-0",
                ].join(" ")}
              >
                <div className="w-11 h-11 rounded-full bg-[#EFE7DC] flex items-center justify-center">
                  <item.Icon size={22} color="#9A856D" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[14px] font-extrabold text-[#2F2A26] leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-[#756A60] mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
