import { Heart, ShieldCheck } from "lucide-react";

interface StageFooterMessageProps {
  icon: string;
  message: string[];
}

export default function StageFooterMessage({ icon, message }: StageFooterMessageProps) {
  const IconEl = icon === "shield-check" ? ShieldCheck : Heart;

  return (
    <div className="mt-6 bg-[#F5EEE0] rounded-xl px-5 py-4 flex items-start gap-4">
      <div className="w-9 h-9 rounded-full bg-white/70 flex-shrink-0 flex items-center justify-center mt-0.5">
        <IconEl size={18} color="#8B2A1F" strokeWidth={2} />
      </div>
      <div>
        {message.map((line, i) => (
          <p
            key={i}
            className={[
              "text-[13px] leading-relaxed",
              i === 0 ? "font-extrabold text-[#2A1F18]" : "text-[#5B3A1F]",
            ].join(" ")}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
