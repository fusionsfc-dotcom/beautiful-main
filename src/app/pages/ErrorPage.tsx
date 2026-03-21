import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  
  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || "페이지를 찾을 수 없습니다";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "알 수 없는 오류가 발생했습니다";
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-5">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-[#E91E7A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-[#E91E7A] font-bold">
            {errorStatus || "!"}
          </span>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#3E5266] mb-4">
          {errorStatus === 404 ? "페이지를 찾을 수 없습니다" : "오류가 발생했습니다"}
        </h1>

        {/* Error Message */}
        <p className="text-[#6B7D8C] text-lg mb-8 leading-relaxed">
          {errorStatus === 404 
            ? "요청하신 페이지가 존재하지 않거나 이동되었습니다."
            : errorMessage}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#3E5266] font-semibold rounded-full border-2 border-[#3E5266] hover:bg-[#F8F9FA] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            이전 페이지로
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E91E7A] text-white font-semibold rounded-full hover:bg-[#d01a6d] transition-colors"
          >
            <Home className="w-5 h-5" />
            홈으로 이동
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-[#8FA8BA] text-sm mb-4">
            문제가 지속되면 고객센터로 문의해주세요
          </p>
          <a
            href="tel:031-945-2000"
            className="text-[#E91E7A] hover:text-[#d01a6d] font-semibold text-sm transition-colors"
          >
            📞 031-945-2000
          </a>
        </div>
      </div>
    </div>
  );
}
