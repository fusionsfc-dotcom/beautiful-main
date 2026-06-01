import { ShieldPlus, HeartHandshake, Soup } from "lucide-react";
import { coreValues, type CoreValue } from "../../../data/brandStoryData";

const ICON_COLOR = "#9A856D";
const ICON_SIZE = 44;
const STROKE = 1.5;

function CoreValueIcon({ icon }: { icon: CoreValue["icon"] }) {
  if (icon === "shield-plus")
    return <ShieldPlus size={ICON_SIZE} color={ICON_COLOR} strokeWidth={STROKE} />;
  if (icon === "heart-handshake")
    return <HeartHandshake size={ICON_SIZE} color={ICON_COLOR} strokeWidth={STROKE} />;
  // bowl-leaf — 그릇+잎사귀 커스텀 SVG
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ICON_COLOR}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11h16a8 8 0 0 1-16 0z" />
      <path d="M12 11V5" />
      <path d="M10 7c0-1 .8-2 2-2s2 1 2 2" />
      <path d="M8 5c1-2 4-2 4 0" />
    </svg>
  );
}

export default function CoreValuesBar() {
  return (
    <section className="px-5 lg:px-8 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#D8CDBE]">
          <div className="grid grid-cols-3">
            {coreValues.map((val, i) => (
              <div
                key={val.title}
                className={[
                  "flex flex-col items-center text-center py-7 px-4 gap-3",
                  i < coreValues.length - 1 ? "border-r border-[#D8CDBE]" : "",
                ].join(" ")}
              >
                <CoreValueIcon icon={val.icon} />
                <div>
                  <p className="text-[14px] font-extrabold text-[#2F2A26]">{val.title}</p>
                  <p className="text-[12px] text-[#756A60] mt-0.5">{val.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
