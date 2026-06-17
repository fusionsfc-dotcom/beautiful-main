import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { supabase, Case } from "../../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import SEOHead from "../../components/seo/SEOHead";
import { uploadAdminImage, validateImageFile } from "../../lib/uploadAdminImage";
import { buildCaseContent, parseCaseContent } from "../../lib/caseContentImages";
import { makeBreadcrumbList } from "../../lib/schema/breadcrumb";
import {
  CASES_TAB_CATEGORIES,
  REVIEW_CATEGORY_ID,
  getCaseCategoryLabel,
  isReviewPost,
  type CasePostCategoryId,
  type ClinicCaseCategoryId,
} from "../../data/caseCategories";
import ListPagination from "../../components/common/ListPagination";

const CASES_PAGE_SIZE = 8;

type CasesTabId = "all" | typeof REVIEW_CATEGORY_ID | ClinicCaseCategoryId;

export default function Cases() {
  const { isAdmin } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<CasesTabId>("all");
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [editorKind, setEditorKind] = useState<"case" | "review">("case");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCases();
  }, []);

  useEffect(() => {
    if (searchParams.get("tab") === "review") {
      setSelectedCategory(REVIEW_CATEGORY_ID);
    }
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const loadCases = async () => {
    try {
      setLoading(true);
      
      console.log('📋 직접 Supabase에서 치료사례 로드 시작...');
      
      // 직접 Supabase 클라이언트를 사용해서 데이터 가져오기
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Database error:', error);
        throw error;
      }

      console.log(`✅ Cases loaded: ${data?.length || 0}`);
      setCases(data || []);
    } catch (error: any) {
      console.error('❌ 치료사례 로드 실패:', error);
      toast.error('치료사례를 불러오는데 실패했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('삭제되었습니다');
      loadCases();
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다');
    }
  };

  const isReviewsTab = selectedCategory === REVIEW_CATEGORY_ID;

  const filteredCases =
    selectedCategory === "all"
      ? cases
      : cases.filter((c) => c.category === selectedCategory);

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / CASES_PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * CASES_PAGE_SIZE;
    return filteredCases.slice(start, start + CASES_PAGE_SIZE);
  }, [filteredCases, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEditor = (item: Case | null) => {
    const kind =
      item != null
        ? isReviewPost(item.category)
          ? "review"
          : "case"
        : isReviewsTab
          ? "review"
          : "case";
    setEditorKind(kind);
    setEditingCase(item);
    setShowEditor(true);
  };

  if (showEditor) {
    return (
      <CaseEditor
        case={editingCase}
        contentKind={editorKind}
        onClose={() => {
          setShowEditor(false);
          setEditingCase(null);
        }}
        onSave={() => {
          setShowEditor(false);
          setEditingCase(null);
          loadCases();
        }}
      />
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <SEOHead
        title="치료사례 | 뷰티풀한방병원"
        description="뷰티풀한방병원의 실제 암 회복, 중풍 재활, 이명·두통, 척추·관절 치료사례를 확인하세요. 환자별 맞춤 한방 통합 치료 결과를 소개합니다."
        keywords="한방치료사례,암치료후기,중풍재활사례,이명치료사례,척추치료후기,뷰티풀한방병원"
        ogUrl="https://www.btful.co.kr/cases"
        canonical="https://www.btful.co.kr/cases"
        jsonLd={[
          makeBreadcrumbList([{ name: "치료사례", path: "/cases" }]),
          ...(cases.length > 0 ? [{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "치료사례 | 뷰티풀한방병원",
            "description": "뷰티풀한방병원의 실제 치료사례 모음",
            "url": "https://www.btful.co.kr/cases",
            "publisher": { "@id": "https://www.btful.co.kr/#hospital" },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": cases.slice(0, 10).map((c, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "MedicalWebPage",
                  "name": c.title,
                  "datePublished": c.created_at,
                  "description": c.content?.slice(0, 160),
                  ...(c.thumbnail ? { "image": c.thumbnail } : {}),
                },
              })),
            },
          }] : []),
        ]}
      />
      {/* 페이지 헤더 */}
      <div className="bg-[#F8F3EA] py-16 px-5">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="mb-4 text-[#6A5542]">치료사례</h1>
          <p className="text-[#756A60] text-lg">
            실제 환자분들의 회복 과정을 공유합니다
          </p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="py-12 px-5">
        <div className="max-w-screen-lg mx-auto space-y-8">
          {/* 상단 필터 및 작성 버튼 */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 flex-1">
              {CASES_TAB_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as CasesTabId)}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#9A856D] text-white shadow-md"
                      : "bg-[#F8F3EA] text-[#756A60] hover:bg-[#7C654F]/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {isAdmin && (
              <button
                onClick={() => openEditor(null)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#9A856D] text-white rounded-full hover:bg-[#7C654F] transition-colors font-medium whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                {isReviewsTab ? "새 후기 작성" : "새 사례 작성"}
              </button>
            )}
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="text-center py-12 text-[#9A856D]">
              {isReviewsTab ? "치료후기를 불러오는 중..." : "치료사례를 불러오는 중..."}
            </div>
          )}

          {/* 빈 상태 */}
          {!loading && filteredCases.length === 0 && (
            <div className="text-center py-12 text-[#9A856D]">
              {selectedCategory === "all"
                ? "작성된 치료사례·치료후기가 없습니다"
                : isReviewsTab
                  ? "작성된 치료후기가 없습니다"
                  : "작성된 치료사례가 없습니다"}
            </div>
          )}

          {!loading && filteredCases.length > 0 && (
            <p className="text-sm text-[#9A856D] text-right">
              총 {filteredCases.length}건 · {currentPage} / {totalPages} 페이지
            </p>
          )}

          {/* 카드형 게시판 UI */}
          {!loading && filteredCases.length > 0 && (
            <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCases.map((caseItem) => (
                <article
                  key={caseItem.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#D8CDBE] hover:shadow-xl transition-all group cursor-pointer"
                >
                  {/* 썸네일 이미지 */}
                  {caseItem.thumbnail && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={caseItem.thumbnail}
                        alt={caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* 콘텐츠 */}
                  <div className="p-6">
                    <h3 className="text-[#6A5542] mb-3 line-clamp-2 group-hover:text-[#9A856D] transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-[#756A60] mb-4 line-clamp-3 leading-relaxed">
                      {caseItem.content.substring(0, 100)}...
                    </p>

                    {/* 메타 정보 */}
                    <div className="flex items-center justify-between text-xs text-[#9A856D] mb-4">
                      <span>{new Date(caseItem.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>

                    {/* 관리자 액션 버튼 */}
                    {isAdmin && (
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditor(caseItem);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#9A856D] text-white text-xs rounded-lg hover:bg-[#7C654F] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          수정
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(caseItem.id);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          삭제
                        </button>
                      </div>
                    )}

                    {/* 카테고리 뱃지 */}
                    <div className="inline-block px-3 py-1 bg-[#F5EFE6] text-[#9A856D] text-xs font-medium rounded-full">
                      {getCaseCategoryLabel(caseItem.category)}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <ListPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-10"
            />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 치료사례·치료후기 게시글 에디터
function CaseEditor({
  case: caseItem,
  contentKind,
  onClose,
  onSave,
}: {
  case: Case | null;
  contentKind: "case" | "review";
  onClose: () => void;
  onSave: () => void;
}) {
  const { user, isAdmin } = useAuth();
  const isReview = contentKind === "review" || (caseItem != null && isReviewPost(caseItem.category));
  const defaultCategory: CasePostCategoryId = isReview ? REVIEW_CATEGORY_ID : "cancer";

  const parsedInitial = parseCaseContent(
    caseItem?.content ?? "",
    caseItem?.thumbnail,
  );
  const [formData, setFormData] = useState({
    title: caseItem?.title || "",
    content: parsedInitial.text,
    category: (caseItem?.category || defaultCategory) as CasePostCategoryId,
  });
  const [images, setImages] = useState<string[]>(parsedInitial.images);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    const files = Array.from(fileList);
    for (const file of files) {
      const validationError = validateImageFile(file);
      if (validationError) {
        toast.error(`${file.name}: ${validationError}`);
        return;
      }
    }

    if (!user) {
      toast.error("로그인이 필요합니다");
      return;
    }

    if (!isAdmin) {
      toast.error("관리자만 이미지를 업로드할 수 있습니다");
      return;
    }

    try {
      setUploading(true);
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`${i + 1} / ${files.length} 업로드 중...`);
        newUrls.push(await uploadAdminImage(files[i], "cases"));
      }
      setImages((prev) => [...prev, ...newUrls]);
      toast.success(`${newUrls.length}장 업로드되었습니다`);
    } catch (error: unknown) {
      console.error("❌ 이미지 업로드 실패:", error);
      const message = error instanceof Error ? error.message : "이미지 업로드에 실패했습니다";
      toast.error(message);
    } finally {
      setUploading(false);
      setUploadProgress("");
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      setSaving(true);
      
      console.log('💾 치료사례 저장 시작:', caseItem ? '수정' : '작성');
      console.log('📦 데이터:', formData);

      const category = isReview ? REVIEW_CATEGORY_ID : formData.category;
      const content = buildCaseContent(formData.content, images);
      const thumbnail = images[0] || null;

      if (caseItem) {
        // 수정
        const { error } = await supabase
          .from('cases')
          .update({
            title: formData.title,
            content,
            category,
            thumbnail,
          })
          .eq('id', caseItem.id);

        if (error) throw error;
        toast.success('수정되었습니다');
      } else {
        // 작성
        const { error } = await supabase
          .from('cases')
          .insert({
            title: formData.title,
            content,
            category,
            thumbnail,
            author_id: user.id,
          });

        if (error) throw error;
        toast.success('작성되었습니다');
      }

      onSave();
    } catch (error: any) {
      console.error('❌ 저장 실패:', error);
      toast.error('저장에 실패했습니다: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white py-12 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#6A5542]">
            {caseItem
              ? isReview
                ? "치료후기 수정"
                : "치료사례 수정"
              : isReview
                ? "새 치료후기 작성"
                : "새 치료사례 작성"}
          </h2>
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#756A60] hover:text-[#6A5542] transition-colors"
          >
            취소
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-[#6A5542] mb-2">
              제목 <span className="text-[#9A856D]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-[#D8CDBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A856D] focus:border-transparent"
              placeholder={isReview ? "치료후기 제목을 입력하세요" : "치료사례 제목을 입력하세요"}
            />
          </div>

          {/* 카테고리 */}
          {!isReview && (
            <div>
              <label className="block text-sm font-medium text-[#6A5542] mb-2">
                클리닉 분류 <span className="text-[#9A856D]">*</span>
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as CasePostCategoryId })
                }
                className="w-full px-4 py-3 border border-[#D8CDBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A856D] focus:border-transparent"
              >
                <option value="cancer">뷰티풀 암케어</option>
                <option value="post_surgery">수술 후 회복케어</option>
                <option value="chemotherapy">항암치료 환자 케어</option>
                <option value="radiation">방사선치료 환자 케어</option>
              </select>
            </div>
          )}

          {/* 이미지 업로드 (여러 장) */}
          <div>
            <label className="block text-sm font-medium text-[#6A5542] mb-2">
              이미지 업로드 (PNG, JPG, WebP, GIF · 장당 최대 5MB · 여러 장 선택 가능)
            </label>
            <p className="text-xs text-[#9A856D] mb-3">
              첫 번째 이미지가 목록 썸네일로 사용됩니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                  disabled={uploading}
                />
                <label
                  htmlFor="imageUpload"
                  className={`px-6 py-3 bg-[#9A856D] text-white rounded-xl font-medium hover:bg-[#7C654F] transition-colors cursor-pointer ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {uploading ? "업로드 중..." : "PC에서 선택"}
                </label>
                {uploadProgress && (
                  <span className="text-sm text-[#9A856D] animate-pulse">{uploadProgress}</span>
                )}
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#D8CDBE]"
                    >
                      <ImageWithFallback
                        src={url}
                        alt={index === 0 ? "대표 썸네일" : `이미지 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#9A856D] text-white text-[10px] font-bold rounded-full">
                          썸네일
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="이미지 제거"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 본문 */}
          <div>
            <label className="block text-sm font-medium text-[#6A5542] mb-2">
              {isReview ? "자필 후기 내용" : "치료 내용"}{" "}
              <span className="text-[#9A856D]">*</span>
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-3 border border-[#D8CDBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9A856D] focus:border-transparent resize-none"
              placeholder={
                isReview
                  ? "환자 후기, 치료 경험, 회복 소감 등을 자세히 작성해주세요"
                  : "치료 과정, 결과, 환자 상태 등을 자세히 작성해주세요"
              }
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-4 bg-[#9A856D] text-white rounded-xl font-medium hover:bg-[#7C654F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '저장 중...' : (caseItem ? '수정 완료' : '작성 완료')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-[#F8F3EA] text-[#756A60] rounded-xl font-medium hover:bg-[#7C654F]/20 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}