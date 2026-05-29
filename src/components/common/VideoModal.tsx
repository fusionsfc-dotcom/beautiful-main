/** VideoModal — 재사용 가능 유튜브 영상 모달 */
import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  url: string;
  onClose: () => void;
}

export default function VideoModal({ url, onClose }: VideoModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="모달 닫기"
          className="absolute -top-10 right-0 text-white hover:text-[#9A856D] transition-colors"
        >
          <X size={28} />
        </button>
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            src={`${url}?autoplay=1`}
            title="치료 안내 영상"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
