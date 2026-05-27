import ProgramFeature from "./ProgramFeature";
import type { RehabProgram } from "../../../data/rehabPrograms";

interface ProgramCardProps {
  program: RehabProgram;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const handlePlay = () => {
    if (program.videoUrl) {
      window.open(program.videoUrl, "_blank");
    } else {
      // TODO: 추후 유튜브 영상 모달 연결
      alert(`${program.name} 영상은 준비 중입니다.`);
    }
  };

  return (
    <div className="bg-[#FBF5E9] rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
      {/* 이미지 영역 (모바일: 상단 전체폭 / 데스크탑: 좌 40%) */}
      <div className="relative w-full md:w-[40%] md:flex-shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[220px]">
        {/* TODO: 실제 사진 교체 필요 (/public/images/redesign/rehab-card-{number}.jpg) */}
        <img
          src={program.image}
          alt={program.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 번호 뱃지 (좌상단) */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#3D2817] flex items-center justify-center shadow">
          <span className="text-[11px] font-bold text-white leading-none">
            {program.number}
          </span>
        </div>

        {/* 플레이 버튼 */}
        <button
          onClick={handlePlay}
          aria-label={`${program.name} 영상 보기`}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#3D2817"
              className="ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      </div>

      {/* 콘텐츠 영역 (우 60%) */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-4">
        {/* 프로그램명 */}
        <div>
          <h3 className="text-[17px] md:text-[19px] font-extrabold text-[#2A1F18] leading-snug">
            {program.name}
          </h3>
          {program.subname && (
            <p className="text-[13px] text-[#6B5547] mt-0.5">{program.subname}</p>
          )}
        </div>

        {/* 특징 아이콘 목록 */}
        {program.features.length <= 2 ? (
          // 2개 이하: 풀 사이즈 (subtitle 포함)
          <div className="flex flex-wrap gap-4">
            {program.features.map((f) => (
              <ProgramFeature key={f.title} {...f} />
            ))}
          </div>
        ) : (
          // 3개 이상: compact 모드 (2열 그리드)
          <div className="grid grid-cols-2 gap-2">
            {program.features.map((f) => (
              <ProgramFeature key={f.title} {...f} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
