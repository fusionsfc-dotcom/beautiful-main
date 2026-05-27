interface MotivationMessageProps {
  message: string[];
  sub: string;
  image: string;
}

export default function MotivationMessage({ message, sub, image }: MotivationMessageProps) {
  return (
    <section className="px-5 lg:px-8 py-6 pb-28">
      {/* pb-28: BottomActionBar4 높이 확보 */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FBF5E9] rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* 텍스트 */}
          <div className="flex-1 px-7 py-8 flex flex-col justify-center gap-4">
            <h2 className="text-[22px] lg:text-[26px] font-extrabold text-[#2A1F18] leading-snug">
              {message.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < message.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className="w-10 h-1 bg-[#C9A567] rounded-full" />
            <p className="text-[14px] text-[#6B5547]">{sub}</p>
          </div>

          {/* 이미지 */}
          <div className="w-full md:w-56 lg:w-80 h-48 md:h-auto flex-shrink-0 relative">
            {/* TODO: 실제 시술실 또는 마무리 이미지로 교체 */}
            <img
              src={image}
              alt="뷰티풀 한방병원"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
