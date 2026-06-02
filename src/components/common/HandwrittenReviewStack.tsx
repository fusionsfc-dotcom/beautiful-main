/** 자필 후기 손편지 이미지 — 겹쳐 쌓인 연출 (홈·치료사례 공용) */

export const HANDWRITTEN_REVIEW_IMAGES = [
  { src: "/images/reviews/handwritten-1.png", alt: "뷰티풀한방병원 자필 후기 — 건강식단과 세심한 돌봄에 대한 감사" },
  { src: "/images/reviews/handwritten-2.png", alt: "뷰티풀한방병원 자필 후기 — 직원들의 사랑과 배려" },
  { src: "/images/reviews/handwritten-3.png", alt: "뷰티풀한방병원 자필 후기 — 유방암 치료 후 회복" },
  { src: "/images/reviews/handwritten-4.png", alt: "뷰티풀한방병원 자필 후기 — 간호·상담·영양 선생님과 맞춤 운동" },
  { src: "/images/reviews/handwritten-5.png", alt: "뷰티풀한방병원 자필 후기 — 뜸치료와 효소방 찜질 치료" },
  { src: "/images/reviews/handwritten-6.png", alt: "뷰티풀한방병원 자필 후기 — 췌장암 항암 치료 후 도수·트램폴린 회복" },
  { src: "/images/reviews/handwritten-7.png", alt: "뷰티풀한방병원 자필 후기 — 턱관절 균형장치 치료 협진" },
  { src: "/images/reviews/handwritten-8.png", alt: "뷰티풀한방병원 자필 후기 — CPA TBA 치료 후 턱관절·이명 호전" },
];

const REVIEW_STACK = [
  { x: -138, y: -54, rotate: -11, z: 1 },
  { x: -98, y: 48, rotate: 8, z: 2 },
  { x: -58, y: -40, rotate: -6, z: 3 },
  { x: -18, y: 62, rotate: 7, z: 4 },
  { x: 22, y: -30, rotate: -5, z: 5 },
  { x: 62, y: 56, rotate: 9, z: 6 },
  { x: 102, y: -24, rotate: -7, z: 7 },
  { x: 142, y: 52, rotate: 6, z: 8 },
];

export const NAVER_REVIEWS_URL =
  "https://map.naver.com/p/entry/place/1468544622?placePath=/review?additionalHeight=76&entry=plt&fromPanelNum=1&locale=ko&svcName=map_pcv5&timestamp=202605300822&fromPanelNum=1&additionalHeight=76&timestamp=202605300822&locale=ko&svcName=map_pcv5&from=map&searchType=place&lng=126.7934673&lat=37.7516697&c=15.00,0,0,2,dh";

type HandwrittenReviewStackProps = {
  className?: string;
};

export default function HandwrittenReviewStack({ className = "" }: HandwrittenReviewStackProps) {
  return (
    <div
      className={`relative w-full max-w-[520px] sm:max-w-[600px] lg:max-w-[640px] h-[320px] sm:h-[400px] lg:h-[480px] mx-auto ${className}`}
      aria-label="환자 자필 후기 8장"
    >
      {HANDWRITTEN_REVIEW_IMAGES.map((note, index) => {
        const stack = REVIEW_STACK[index];
        return (
          <div
            key={note.src}
            className="absolute left-1/2 top-1/2 w-[148px] sm:w-[178px] lg:w-[208px] shadow-[0_10px_28px_rgba(106,85,66,0.24)] rounded-xl overflow-hidden border border-[#D8CDBE]/90 bg-white transition-[transform,z-index] duration-200 hover:z-[20] hover:scale-[1.05] hover:shadow-xl"
            style={{
              zIndex: stack.z,
              transform: `translate(calc(-50% + ${stack.x}px), calc(-50% + ${stack.y}px)) rotate(${stack.rotate}deg)`,
            }}
          >
            <img
              src={note.src}
              alt={note.alt}
              className="w-full h-auto object-cover object-top pointer-events-none"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}
