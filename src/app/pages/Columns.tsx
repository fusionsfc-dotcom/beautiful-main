import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Video as VideoIcon, 
  MessageCircle, 
  HelpCircle,
  Clock,
  Eye,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Play,
  Send,
  Plus,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { supabase, Column, Video, GalleryItem, Faq } from "../../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import SEOHead from "../../components/seo/SEOHead";
import { makeBreadcrumbList } from "../../lib/schema/breadcrumb";

type MainTabType = "gallery" | "columns" | "videos" | "faq" | "question";
type ColumnCategoryType = "cancer" | "gynecologic_cancer" | "gastro_cancer" | "lung_cancer" | "liver_cancer" | "other_cancer";
type FaqCategoryType = "cancer" | "stroke" | "tinnitus" | "admission" | "cost";

const faqJsonLdData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "항암 중에도 한방 치료가 가능한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 가능합니다. 항암 치료는 계속 진행하시면서 한방 치료를 병행하여 부작용을 줄이고 회복력을 높이는 방식으로 진행됩니다. 대학병원과 협력 체계를 갖추고 있어 안전합니다.",
      },
    },
    {
      "@type": "Question",
      "name": "항암 부작용이 심한데 입원이 도움이 될까요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "입원 치료는 24시간 의료진 케어로 부작용을 체계적으로 관리할 수 있습니다. 영양 관리, 통증 조절, 면역력 증진을 통합적으로 진행하여 항암 순응도를 높입니다.",
      },
    },
    {
      "@type": "Question",
      "name": "중풍 환자 입원 기간은 얼마나 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "환자 상태에 따라 다르지만, 일반적으로 2~4주 정도입니다. 초기 집중 재활 후 상태를 평가하여 추가 입원 여부를 결정합니다.",
      },
    },
    {
      "@type": "Question",
      "name": "이명 치료는 얼마나 걸리나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이명은 원인과 기간에 따라 치료 기간이 다릅니다. 평균 4~8주 정도 치료하며, 경추 및 자율신경 교정을 통해 증상을 완화합니다.",
      },
    },
    {
      "@type": "Question",
      "name": "보호자 상주가 필수인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "24시간 의료진이 상주하므로 보호자 상주는 필수가 아닙니다. 다만, 환자의 심리적 안정을 위해 낮 시간 방문을 권장합니다.",
      },
    },
    {
      "@type": "Question",
      "name": "보험 적용이 가능한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "한방 치료 일부와 검사 항목은 건강보험 적용이 가능합니다. 비급여 항목은 사전에 안내해 드리며, 실손보험 청구도 지원합니다.",
      },
    },
    {
      "@type": "Question",
      "name": "국립암센터 근처 암요양병원은 어디가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "뷰티풀한방병원은 국립암센터에서 차량으로 약 15분 거리인 경기도 파주시 중양로 94-9에 위치한 암요양병원입니다. 국립암센터에서 항암·방사선 치료를 받으시면서 한방 통합 면역 치료를 병행할 수 있으며, 호텔 리모델링 입원실과 24시간 의료진 상주 체계를 갖추고 있습니다. 전화: 031-945-2000",
      },
    },
    {
      "@type": "Question",
      "name": "파주·일산에서 암요양병원을 찾고 있는데 어떤 병원이 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "뷰티풀한방병원은 경기도 파주시에 위치하며 일산·고양 지역에서 접근이 편리한 암요양병원입니다. 양·한·치과 통합진료 체계를 갖추고 있으며, 암환자를 위한 고주파 온열 치료, 왕뜸·약뜸, 효소 찜질 등 면역 회복 프로그램과 입원 케어를 운영합니다.",
      },
    },
    {
      "@type": "Question",
      "name": "암요양병원에서는 어떤 치료를 받을 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "뷰티풀한방병원에서는 수술 후 회복 관리, 항암 치료 중 부작용 완화, 항암 치료 후 면역 회복, 진행성 암 환자 통합 케어를 진행합니다. 주요 치료로는 고주파 온열 암 치료, 왕뜸·약뜸 치료, 효소 찜질, 한약 면역 치료 등이 있으며, 대학병원 항암·방사선 치료와 병행할 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      "name": "국립암센터 치료와 뷰티풀한방병원 치료를 동시에 받을 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 가능합니다. 뷰티풀한방병원은 국립암센터에서 차량 15분 거리에 있어 대학병원 항암·방사선 치료 일정을 유지하면서 한방 면역 치료를 병행할 수 있습니다. 입원 중 국립암센터 통원 치료도 지원하고 있습니다.",
      },
    },
  ],
};

export default function Columns() {
  const [activeTab, setActiveTab] = useState<MainTabType>("gallery");

  const mainTabs = [
    { id: "gallery" as MainTabType, label: "뷰티풀갤러리", icon: ImageIcon },
    { id: "videos" as MainTabType, label: "영상 가이드", icon: VideoIcon },
    { id: "columns" as MainTabType, label: "질환별 칼럼", icon: BookOpen },
    { id: "faq" as MainTabType, label: "자주하는 질문", icon: HelpCircle },
    { id: "question" as MainTabType, label: "질문하기", icon: MessageCircle },
  ];

  return (
    <div className="min-h-[100dvh] bg-white">
      <SEOHead
        title="뷰티풀이야기 · 치료사례 | 뷰티풀한방병원"
        description="실제 암 환자 치료 사례와 회복 이야기. 뷰티풀한방병원의 통합 치료 결과를 확인하세요."
        keywords="한방치료정보,암치료칼럼,치료사례,자주하는질문,뷰티풀한방병원"
        ogUrl="https://www.btful.co.kr/columns"
        canonical="https://www.btful.co.kr/columns"
        jsonLd={[faqJsonLdData, makeBreadcrumbList([{ name: "뷰티풀이야기", path: "/columns" }])]}
      />
      {/* 페이지 헤더 */}
      <div className="bg-[#F8F9FA] py-16 px-5">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="mb-4 text-[#3E5266]">뷰티풀이야기</h1>
          <p className="text-[#6B7D8C] text-lg">
            건강한 회복을 위한 뷰티풀이야기와 치료정보를 제공합니다
          </p>
        </div>
      </div>

      {/* 상단 메인 탭 UI */}
      <div className="sticky top-16 lg:top-20 bg-white border-b border-gray-200 z-40">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? "border-[#E91E7A] text-[#E91E7A]"
                      : "border-transparent text-[#8FA8BA] hover:text-[#3E5266]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="py-12 px-5">
        <div className="max-w-screen-lg mx-auto">
          {activeTab === "gallery" && <BeautifulGallerySection />}
          {activeTab === "columns" && <ColumnsSection />}
          {activeTab === "videos" && <VideosSection />}
          {activeTab === "faq" && <FaqSection />}
          {activeTab === "question" && <QuestionSection />}
        </div>
      </div>
    </div>
  );
}

type GalleryCategory = "all" | "program" | "diet" | "environment" | "event" | "etc";

const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "program", label: "프로그램" },
  { id: "diet", label: "식단" },
  { id: "environment", label: "환경" },
  { id: "event", label: "행사" },
  { id: "etc", label: "기타" },
];

function BeautifulGallerySection() {
  const { user, isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<{ category: Exclude<GalleryCategory, "all">; caption: string }>({
    category: "program",
    caption: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInputId = "beautiful-gallery-file";

  // PC(lg 이상) 12장 / 모바일 10장
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const apply = () => setItemsPerPage(mql.matches ? 12 : 10);
    apply();

    const handler = () => apply();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
    // Safari 구버전 호환
    // @ts-expect-error legacy
    mql.addListener(handler);
    // @ts-expect-error legacy
    return () => mql.removeListener(handler);
  }, []);

  useEffect(() => {
    loadGallery();
  }, [selectedCategory, currentPage, itemsPerPage]);

  // 카테고리 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 페이지당 개수 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const loadGallery = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("gallery")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      query = query.range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;
      setItems((data as GalleryItem[]) || []);
      setTotalCount(count ?? 0);
    } catch (e) {
      console.error("갤러리 로드 실패:", e);
      toast.error("갤러리를 불러오지 못했습니다");
      setItems([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      toast.success("삭제되었습니다");
      // 마지막 아이템 삭제 후 빈 페이지가 되면 이전 페이지로 이동
      if (items.length === 1 && currentPage > 1) {
        setCurrentPage((p) => Math.max(1, p - 1));
      } else {
        loadGallery();
      }
    } catch (e) {
      console.error("갤러리 삭제 실패:", e);
      toast.error("삭제에 실패했습니다");
    }
  };

  const handleUpload = async () => {
    if (!isAdmin) return;
    if (!file) {
      toast.error("사진 파일을 선택해 주세요");
      return;
    }
    try {
      setUploading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error("로그인이 필요합니다");
        return;
      }

      // 1) Upload image directly to Supabase Storage (no Edge Function)
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("make-ee767080-images")
        .upload(filePath, file, { upsert: false, contentType: file.type });

      if (uploadError) {
        throw new Error(uploadError.message || "스토리지 업로드에 실패했습니다");
      }

      const { data: publicData } = supabase.storage
        .from("make-ee767080-images")
        .getPublicUrl(filePath);

      const imageUrl = publicData?.publicUrl;
      if (!imageUrl) {
        throw new Error("이미지 URL 생성에 실패했습니다");
      }

      // 2) Save metadata to DB table gallery
      const { error: insertError } = await supabase.from("gallery").insert({
        image_url: imageUrl,
        category: form.category,
        caption: form.caption || null,
        author_id: session.user.id,
      });
      if (insertError) throw insertError;

      toast.success("업로드되었습니다");
      setShowUpload(false);
      setFile(null);
      setForm({ category: "program", caption: "" });
      loadGallery();
    } catch (e: any) {
      console.error("갤러리 업로드 실패:", e);
      toast.error(e?.message || "업로드에 실패했습니다");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter + Admin upload */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 flex-1">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#E91E7A] text-white shadow-md"
                  : "bg-[#F8F9FA] text-[#6B7D8C] hover:bg-[#8FA8BA]/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E91E7A] text-white rounded-full hover:bg-[#d11a6d] transition-colors font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            사진 업로드
          </button>
        )}
      </div>

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-[#3E5266] font-semibold">뷰티풀갤러리 업로드</h3>
              <button
                onClick={() => setShowUpload(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E5266] mb-2">카테고리</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A]"
                  >
                    {galleryCategories.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3E5266] mb-2">사진</label>
                  <div className="flex items-center gap-3">
                    <input
                      id={fileInputId}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      className="hidden"
                    />
                    <label
                      htmlFor={fileInputId}
                      className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-300 text-[#3E5266] hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      파일 선택
                    </label>
                    <div className="flex-1 text-sm text-[#6B7D8C] truncate">
                      {file ? file.name : "선택된 파일 없음"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3E5266] mb-2">설명 (선택)</label>
                <input
                  type="text"
                  value={form.caption}
                  onChange={(e) => setForm((p) => ({ ...p, caption: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A]"
                  placeholder="예) 항암 환자 맞춤 식단"
                />
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowUpload(false)}
                className="px-5 py-3 rounded-xl border border-gray-300 text-[#3E5266] hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-5 py-3 rounded-xl bg-[#E91E7A] text-white font-semibold hover:bg-[#d11a6d] transition-colors disabled:opacity-60"
              >
                {uploading ? "업로드 중..." : "업로드"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-[#8FA8BA]">갤러리를 불러오는 중...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-[#8FA8BA]">등록된 사진이 없습니다</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((it) => (
              <div key={it.id} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <ImageWithFallback
                    src={it.image_url}
                    alt={it.caption || "갤러리 이미지"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {(it.caption || isAdmin) && (
                  <div className="p-3">
                    {it.caption && <p className="text-xs text-[#6B7D8C] line-clamp-2">{it.caption}</p>}
                  </div>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(it.id)}
                    className="absolute top-2 right-2 p-2 rounded-xl bg-white/90 border border-gray-200 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

// 1️⃣ 질환별 칼럼 섹션 (Supabase 연동)
function ColumnsSection() {
  const { isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<ColumnCategoryType | "all">("all");
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = [
    { id: "all" as const, label: "전체" },
    { id: "cancer" as ColumnCategoryType, label: "유방암" },
    { id: "gynecologic_cancer" as ColumnCategoryType, label: "자궁/난소암" },
    { id: "gastro_cancer" as ColumnCategoryType, label: "위/대장암" },
    { id: "lung_cancer" as ColumnCategoryType, label: "폐암" },
    { id: "liver_cancer" as ColumnCategoryType, label: "간암" },
    { id: "other_cancer" as ColumnCategoryType, label: "기타암" },
  ];

  useEffect(() => {
    loadColumns();
  }, []);

  const loadColumns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('columns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setColumns(data || []);
    } catch (error) {
      console.error('칼럼 로드 실패:', error);
      toast.error('칼럼을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('columns')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('삭제되었습니다');
      loadColumns();
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다');
    }
  };

  const filteredColumns = selectedCategory === "all" 
    ? columns 
    : columns.filter(col => col.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentColumns = filteredColumns.slice(startIndex, endIndex);

  // 카테고리 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 칼럼 상세 뷰
  if (selectedColumn) {
    return <ColumnDetailView column={selectedColumn} onClose={() => setSelectedColumn(null)} />;
  }

  if (showEditor) {
    return (
      <ColumnEditor
        column={editingColumn}
        onClose={() => {
          setShowEditor(false);
          setEditingColumn(null);
        }}
        onSave={() => {
          setShowEditor(false);
          setEditingColumn(null);
          loadColumns();
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* 상단 필터 및 작성 버튼 */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#E91E7A] text-white shadow-md"
                  : "bg-[#F8F9FA] text-[#6B7D8C] hover:bg-[#8FA8BA]/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingColumn(null);
              setShowEditor(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E91E7A] text-white rounded-full hover:bg-[#d11a6d] transition-colors font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            새 칼럼 작성
          </button>
        )}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-12 text-[#8FA8BA]">
          칼럼을 불러오는 중...
        </div>
      )}

      {/* 리스트형 게시판 */}
      {!loading && filteredColumns.length === 0 && (
        <div className="text-center py-12 text-[#8FA8BA]">
          작성된 칼럼이 없습니다
        </div>
      )}

      {!loading && filteredColumns.length > 0 && (
        <>
          <div className="border-t border-gray-200">
            {currentColumns.map((column, index) => (
              <div
                key={column.id}
                onClick={() => setSelectedColumn(column)}
                className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 hover:bg-[#FFF8FB] cursor-pointer group transition-colors"
              >
                <span className="w-8 text-center text-sm text-[#8FA8BA] shrink-0">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </span>
                <span className="shrink-0 px-2.5 py-0.5 bg-[#FFF0F7] text-[#E91E7A] text-xs font-medium rounded-full">
                  {categories.find(c => c.id === column.category)?.label || column.category}
                </span>
                <span className="flex-1 text-[#3E5266] text-sm group-hover:text-[#E91E7A] transition-colors truncate">
                  {column.title}
                </span>
                <span className="shrink-0 text-xs text-[#8FA8BA]">
                  {new Date(column.created_at).toLocaleDateString('ko-KR')}
                </span>
                {isAdmin && (
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingColumn(column);
                        setShowEditor(true);
                      }}
                      className="p-1.5 bg-[#3E5266] text-white rounded-lg hover:bg-[#2a3847] transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(column.id);
                      }}
                      className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

// 칼럼 상세 뷰 컴포넌트
function ColumnDetailView({ column, onClose }: { column: Column; onClose: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-[#6B7D8C] hover:text-[#3E5266] mb-6 transition-colors"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        목록으로 돌아가기
      </button>

      {/* 칼럼 헤더 */}
      <div className="mb-8">
        <h1 className="text-[#3E5266] mb-4">{column.title}</h1>
        <div className="flex items-center gap-4 text-sm text-[#8FA8BA]">
          <span>{new Date(column.created_at).toLocaleDateString('ko-KR')}</span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {(column.views || 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* 썸네일 이미지 */}
      {column.thumbnail && (
        <div className="mb-8 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={column.thumbnail}
            alt={column.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      {/* 요약 */}
      <div className="mb-8 p-6 bg-[#F8F9FA] rounded-2xl border-l-4 border-[#E91E7A]">
        <p className="text-[#3E5266] font-medium leading-relaxed">
          {column.summary}
        </p>
      </div>

      {/* 본문 */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="text-[#3E5266] leading-relaxed whitespace-pre-wrap">
          {column.content}
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="border-t border-gray-200 pt-8">
        <div className="bg-gradient-to-br from-[#E91E7A]/5 to-[#3E5266]/5 rounded-2xl p-8 text-center">
          <h3 className="text-[#3E5266] mb-3">더 자세한 상담이 필요하신가요?</h3>
          <p className="text-[#6B7D8C] mb-6">
            전문의와 1:1 상담을 통해 맞춤 치료 계획을 수립해보세요
          </p>
          <Link
            to="/reservation"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#E91E7A] text-white rounded-xl hover:bg-[#d11a6d] transition-colors font-medium"
          >
            진료 상담 예약하기
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// 칼럼 에디터 컴포넌트
function ColumnEditor({ column, onClose, onSave }: { 
  column: Column | null; 
  onClose: () => void; 
  onSave: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: column?.title || '',
    summary: column?.summary || '',
    content: column?.content || '',
    category: column?.category || 'cancer' as ColumnCategoryType,
    thumbnail: column?.thumbnail || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('이미지 파일만 업로드 가능합니다 (PNG, JPG, WebP, GIF)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      toast.error('파일 크기는 5MB 이하여야 합니다');
      return;
    }

    // ✅ Admin 인증 확인
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      setUploading(true);
      console.log('📤 이미지 업로드 시작:', file.name, file.type, file.size);
      console.log('🔑 사용하는 토큰: JWT (session.access_token)');
      
      const formData = new FormData();
      formData.append('file', file);

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/upload-image`;
      console.log('🔗 업로드 URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`, // ✅ 진짜 JWT 사용
        },
        body: formData,
      });

      console.log('📨 응답 상태:', response.status, response.statusText);

      const result = await response.json();
      console.log('📦 응답 데이터:', result);

      if (!response.ok) {
        throw new Error(result.error || `업로드 실패 (${response.status})`);
      }

      setFormData(prev => ({ ...prev, thumbnail: result.url }));
      toast.success('이미지가 업로드되었습니다');
    } catch (error: any) {
      console.error('❌ 이미지 업로드 실패:', error);
      toast.error(error.message || '이미지 업로드에 실패했습니다');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      setSaving(true);
      
      if (column) {
        // 수정
        const { error } = await supabase
          .from('columns')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', column.id);

        if (error) throw error;
        toast.success('수정되었습니다');
      } else {
        // 새로 작성
        const { error } = await supabase
          .from('columns')
          .insert({
            ...formData,
            author_id: user.id,
          });

        if (error) throw error;
        toast.success('작성되었습니다');
      }

      onSave();
    } catch (error: any) {
      console.error('저장 실패:', error);
      toast.error(error.message || '저장에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#3E5266]">
          {column ? '칼럼 수정' : '새 칼럼 작성'}
        </h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-[#6B7D8C] hover:text-[#3E5266] transition-colors"
        >
          취소
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            제목 <span className="text-[#E91E7A]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
            placeholder="칼럼 제목을 입력하세요"
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            카테고리 <span className="text-[#E91E7A]">*</span>
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ColumnCategoryType })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
          >
            <option value="cancer">유방암</option>
            <option value="gynecologic_cancer">자궁/난소암</option>
            <option value="gastro_cancer">위/대장암</option>
            <option value="lung_cancer">폐암</option>
            <option value="liver_cancer">간암</option>
            <option value="other_cancer">기타암</option>
          </select>
        </div>

        {/* 요약 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            요약 <span className="text-[#E91E7A]">*</span>
          </label>
          <textarea
            required
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent resize-none"
            placeholder="칼럼 요약을 입력하세요 (카드에 표시됩니다)"
          />
        </div>

        {/* 썸네일 URL */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            썸네일 이미지 URL
          </label>
          <input
            type="url"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            또는 이미지 업로드 (PNG, JPG, WebP, GIF / 최대 5MB)
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
                disabled={uploading}
              />
              <label
                htmlFor="imageUpload"
                className={`px-6 py-3 bg-[#3E5266] text-white rounded-xl font-medium hover:bg-[#2a3847] transition-colors cursor-pointer ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploading ? '업로드 중...' : 'PC에서 선택'}
              </label>
              {uploading && (
                <span className="text-sm text-[#E91E7A] animate-pulse">
                  이미지를 업로드하는 중입니다...
                </span>
              )}
            </div>
            
            {/* 이미지 미리보기 */}
            {formData.thumbnail && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-200">
                <ImageWithFallback
                  src={formData.thumbnail}
                  alt="썸네일 미리보기"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, thumbnail: '' })}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  title="이미지 제거"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 본문 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            본문 <span className="text-[#E91E7A]">*</span>
          </label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent resize-none font-mono text-sm"
            placeholder="칼럼 본문을 입력하세요"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-4 bg-[#E91E7A] text-white rounded-xl font-medium hover:bg-[#d11a6d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '저장 중...' : (column ? '수정 완료' : '작성 완료')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 bg-[#F8F9FA] text-[#6B7D8C] rounded-xl font-medium hover:bg-[#8FA8BA]/20 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

// 영상 에디터 컴포넌트
function VideoEditor({ video, onClose, onSave }: { 
  video: Video | null; 
  onClose: () => void; 
  onSave: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: video?.title || '',
    description: video?.description || '',
    youtube_url: video?.youtube_url || '',
    category: video?.category || 'cancer' as Video['category'],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    // 유튜브 URL 유효성 검사
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(formData.youtube_url)) {
      toast.error('올바른 유튜브 URL을 입력해주세요');
      return;
    }

    try {
      setSaving(true);
      
      if (video) {
        // 수정
        const { error } = await supabase
          .from('videos')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', video.id);

        if (error) throw error;
        toast.success('수정되었습니다');
      } else {
        // 새로 작성
        const { error } = await supabase
          .from('videos')
          .insert({
            ...formData,
            author_id: user.id,
          });

        if (error) throw error;
        toast.success('등록되었습니다');
      }

      onSave();
    } catch (error: any) {
      console.error('저장 실패:', error);
      toast.error(error.message || '저장에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#3E5266]">
          {video ? '영상 수정' : '새 영상 추가'}
        </h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-[#6B7D8C] hover:text-[#3E5266] transition-colors"
        >
          취소
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            제목 <span className="text-[#E91E7A]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
            placeholder="영상 제목을 입력하세요"
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            카테고리 <span className="text-[#E91E7A]">*</span>
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Video['category'] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
          >
            <option value="cancer">항암 가이드 영상</option>
            <option value="rehab">재활 운동 영상</option>
            <option value="hospital">병원 소개 영상</option>
          </select>
        </div>

        {/* 유튜브 URL */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            유튜브 URL <span className="text-[#E91E7A]">*</span>
          </label>
          <input
            type="url"
            required
            value={formData.youtube_url}
            onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <p className="mt-2 text-sm text-[#6B7D8C]">
            💡 유튜브 영상 URL을 입력하세요 (예: https://www.youtube.com/watch?v=VIDEO_ID)
          </p>
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            설명 <span className="text-[#E91E7A]">*</span>
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent resize-none"
            placeholder="영상 설명을 입력하세요"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-4 bg-[#E91E7A] text-white rounded-xl font-medium hover:bg-[#d11a6d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '저장 중...' : (video ? '수정 완료' : '등록 완료')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 bg-[#F8F9FA] text-[#6B7D8C] rounded-xl font-medium hover:bg-[#8FA8BA]/20 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

// 2️⃣ 영상 가이드 섹션 (Supabase 연동)
function VideosSection() {
  const { isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = [
    { id: "all", label: "전체" },
    { id: "cancer", label: "항암 가이드 영상" },
    { id: "rehab", label: "재활 운동 영상" },
    { id: "hospital", label: "병원 소개 영상" },
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('영상 로드 실패:', error);
      toast.error('영상을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('삭제되었습니다');
      loadVideos();
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다');
    }
  };

  const filteredVideos = selectedCategory === "all"
    ? videos
    : videos.filter(vid => vid.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  // 카테고리 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 유튜브 URL에서 비디오 ID 추출
  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // 에디터 표시
  if (showEditor) {
    return (
      <VideoEditor
        video={editingVideo}
        onClose={() => {
          setShowEditor(false);
          setEditingVideo(null);
        }}
        onSave={() => {
          setShowEditor(false);
          setEditingVideo(null);
          loadVideos();
        }}
      />
    );
  }

  // 영상 재생 모달
  if (selectedVideo) {
    const videoId = getYoutubeVideoId(selectedVideo.youtube_url);
    
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute -top-12 right-0 text-white hover:text-[#E91E7A] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="bg-white rounded-2xl overflow-hidden">
            {videoId && (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-[#3E5266] mb-3">{selectedVideo.title}</h2>
              <p className="text-[#6B7D8C] mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-4 text-sm text-[#8FA8BA]">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {(selectedVideo.views || 0).toLocaleString()}회
                </span>
                <span>{new Date(selectedVideo.created_at).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 상단 필터 및 작성 버튼 */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#E91E7A] text-white shadow-md"
                  : "bg-[#F8F9FA] text-[#6B7D8C] hover:bg-[#8FA8BA]/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingVideo(null);
              setShowEditor(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E91E7A] text-white rounded-full hover:bg-[#d11a6d] transition-colors font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            새 영상 추가
          </button>
        )}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-12 text-[#8FA8BA]">
          영상을 불러오는 중...
        </div>
      )}

      {/* 영상 없음 */}
      {!loading && filteredVideos.length === 0 && (
        <div className="text-center py-12 text-[#8FA8BA]">
          등록된 영상이 없습니다
        </div>
      )}

      {/* 영상 카드 */}
      {!loading && filteredVideos.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.map((video) => {
              const videoId = getYoutubeVideoId(video.youtube_url);
              const thumbnail = videoId 
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?w=1080';

              return (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
                >
                  {/* 썸네일 */}
                  <div 
                    className="relative aspect-video overflow-hidden bg-gray-900 cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <img
                      src={thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                    {/* 재생 아이콘 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-[#E91E7A] group-hover:scale-110 transition-all">
                        <Play className="w-6 h-6 text-[#3E5266] group-hover:text-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-5">
                    <h3 className="text-[#3E5266] text-base font-semibold mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-[#6B7D8C] mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center text-xs text-[#8FA8BA] mb-4">
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      {(video.views || 0).toLocaleString()}회
                    </div>

                    {/* 관리자 액션 버튼 */}
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingVideo(video);
                            setShowEditor(true);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#3E5266] text-white text-xs rounded-lg hover:bg-[#2a3847] transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          수정
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(video.id);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

// 3️⃣ 자주하는 질문 (FAQ) 섹션 (Supabase 연동)
function FaqSection() {
  const { isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<ColumnCategoryType | "all">("all");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = [
    { id: "all" as const, label: "전체" },
    { id: "cancer" as ColumnCategoryType, label: "유방암" },
    { id: "gynecologic_cancer" as ColumnCategoryType, label: "자궁/난소암" },
    { id: "gastro_cancer" as ColumnCategoryType, label: "위/대장암" },
    { id: "lung_cancer" as ColumnCategoryType, label: "폐암" },
    { id: "liver_cancer" as ColumnCategoryType, label: "간암" },
    { id: "other_cancer" as ColumnCategoryType, label: "기타암" },
  ];

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('FAQ 로드 실패:', error);
      toast.error('FAQ를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('삭제되었습니다');
      loadFaqs();
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다');
    }
  };

  const filteredFaqs = selectedCategory === "all"
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = filteredFaqs.slice(startIndex, endIndex);

  // 카테고리 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 에디터 뷰
  if (showEditor) {
    return (
      <FaqEditor
        faq={editingFaq}
        onClose={() => {
          setShowEditor(false);
          setEditingFaq(null);
        }}
        onSave={() => {
          setShowEditor(false);
          setEditingFaq(null);
          loadFaqs();
        }}
      />
    );
  }

  // FAQ 상세 뷰
  if (selectedFaq) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => setSelectedFaq(null)}
          className="flex items-center gap-2 text-[#6B7D8C] hover:text-[#3E5266] mb-6 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          목록으로 돌아가기
        </button>

        {/* FAQ 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 bg-[#FFF0F7] text-[#E91E7A] text-xs font-medium rounded-full">
              {categories.find(c => c.id === selectedFaq.category)?.label || selectedFaq.category}
            </span>
          </div>
          <h1 className="text-[#3E5266] mb-4">{selectedFaq.question}</h1>
          <div className="flex items-center gap-4 text-sm text-[#8FA8BA]">
            <span>{new Date(selectedFaq.created_at).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>

        {/* 본문 */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-[#3E5266] leading-relaxed whitespace-pre-wrap">
            {selectedFaq.answer}
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="border-t border-gray-200 pt-8">
          <div className="bg-gradient-to-br from-[#E91E7A]/5 to-[#3E5266]/5 rounded-2xl p-8 text-center">
            <h3 className="text-[#3E5266] mb-3">더 자세한 상담이 필요하신가요?</h3>
            <p className="text-[#6B7D8C] mb-6">
              전문의와 1:1 상담을 통해 맞춤 치료 계획을 수립해보세요
            </p>
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#E91E7A] text-white rounded-xl hover:bg-[#d11a6d] transition-colors font-medium"
            >
              진료 상담 예약하기
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 상단 필터 및 작성 버튼 */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#E91E7A] text-white shadow-md"
                  : "bg-[#F8F9FA] text-[#6B7D8C] hover:bg-[#8FA8BA]/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingFaq(null);
              setShowEditor(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E91E7A] text-white rounded-full hover:bg-[#d11a6d] transition-colors font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            새 질문 작성
          </button>
        )}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-12 text-[#8FA8BA]">
          FAQ를 불러오는 중...
        </div>
      )}

      {/* 리스트형 게시판 */}
      {!loading && filteredFaqs.length === 0 && (
        <div className="text-center py-12 text-[#8FA8BA]">
          등록된 질문이 없습니다
        </div>
      )}

      {!loading && filteredFaqs.length > 0 && (
        <>
          <div className="border-t border-gray-200">
            {currentFaqs.map((faq, index) => (
              <div
                key={faq.id}
                onClick={() => setSelectedFaq(faq)}
                className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 hover:bg-[#FFF8FB] cursor-pointer group transition-colors"
              >
                <span className="w-8 text-center text-sm text-[#8FA8BA] shrink-0">
                  {startIndex + index + 1}
                </span>
                <span className="shrink-0 px-2.5 py-0.5 bg-[#FFF0F7] text-[#E91E7A] text-xs font-medium rounded-full">
                  {categories.find(c => c.id === faq.category)?.label || faq.category}
                </span>
                <span className="flex-1 text-[#3E5266] text-sm group-hover:text-[#E91E7A] transition-colors truncate">
                  {faq.question}
                </span>
                <span className="shrink-0 text-xs text-[#8FA8BA]">
                  {new Date(faq.created_at).toLocaleDateString('ko-KR')}
                </span>
                {isAdmin && (
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingFaq(faq);
                        setShowEditor(true);
                      }}
                      className="p-1.5 bg-[#3E5266] text-white rounded-lg hover:bg-[#2a3847] transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(faq.id);
                      }}
                      className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* 하단 상담 CTA */}
      <div className="mt-12 p-8 bg-[#F8F9FA] rounded-2xl text-center">
        <p className="text-[#3E5266] mb-4 text-lg">
          더 궁금한 사항이 있으신가요?
        </p>
        <Link
          to="/reservation"
          className="inline-block px-8 py-3 bg-[#E91E7A] text-white rounded-xl hover:bg-[#d11a6d] transition-colors font-medium"
        >
          1:1 상담 신청하기
        </Link>
      </div>
    </div>
  );
}

// FAQ 에디터 컴포넌트
function FaqEditor({ faq, onClose, onSave }: {
  faq: Faq | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'cancer' as ColumnCategoryType,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      setSaving(true);

      if (faq) {
        const { error } = await supabase
          .from('faqs')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', faq.id);

        if (error) throw error;
        toast.success('수정되었습니다');
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert({
            ...formData,
            author_id: user.id,
          });

        if (error) throw error;
        toast.success('작성되었습니다');
      }

      onSave();
    } catch (error: any) {
      console.error('저장 실패:', error);
      toast.error(error.message || '저장에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#3E5266]">
          {faq ? 'FAQ 수정' : '새 FAQ 작성'}
        </h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-[#6B7D8C] hover:text-[#3E5266] transition-colors"
        >
          취소
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            카테고리 <span className="text-[#E91E7A]">*</span>
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ColumnCategoryType })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
          >
            <option value="cancer">유방암</option>
            <option value="gynecologic_cancer">자궁/난소암</option>
            <option value="gastro_cancer">위/대장암</option>
            <option value="lung_cancer">폐암</option>
            <option value="liver_cancer">간암</option>
            <option value="other_cancer">기타암</option>
          </select>
        </div>

        {/* 질문 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            질문 <span className="text-[#E91E7A]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
            placeholder="질문을 입력하세요"
          />
        </div>

        {/* 답변 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            답변 <span className="text-[#E91E7A]">*</span>
          </label>
          <textarea
            required
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent resize-none"
            placeholder="답변을 입력하세요"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-4 bg-[#E91E7A] text-white rounded-xl font-medium hover:bg-[#d11a6d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '저장 중...' : (faq ? '수정 완료' : '작성 완료')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 bg-[#F8F9FA] text-[#6B7D8C] rounded-xl font-medium hover:bg-[#8FA8BA]/20 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

// 4️⃣ 질문하기 섹션 - 게시판 형식
function QuestionSection() {
  const { user, isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cancer' | 'gynecologic_cancer' | 'gastro_cancer' | 'lung_cancer' | 'liver_cancer' | 'other_cancer'>('all');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = [
    { id: 'all' as const, label: '전체' },
    { id: 'cancer' as const, label: '유방암' },
    { id: 'gynecologic_cancer' as const, label: '자궁/난소암' },
    { id: 'gastro_cancer' as const, label: '위/대장암' },
    { id: 'lung_cancer' as const, label: '폐암' },
    { id: 'liver_cancer' as const, label: '간암' },
    { id: 'other_cancer' as const, label: '기타암' },
  ];

  useEffect(() => {
    loadQuestions();
  }, [selectedCategory]);

  // 카테고리 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/questions${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setQuestions(result.data || []);
      } else {
        console.error('질문 로드 실패:', result.error);
      }
    } catch (error) {
      console.error('질문 로드 에러:', error);
      toast.error('질문을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId: string, onSuccess?: () => void) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      // 세션 새로고침으로 만료된 토큰 방지
      const { data: { session } } = await supabase.auth.refreshSession();
      const currentSession = session ?? (await supabase.auth.getSession()).data.session;
      
      if (!currentSession?.access_token) {
        toast.error('로그인이 필요합니다. 다시 로그인해 주세요.');
        return;
      }

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/questions/${questionId}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentSession.access_token}`,
          'apikey': publicAnonKey,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json().catch(() => ({}));
      if (result.success) {
        toast.success('삭제되었습니다');
        loadQuestions();
        onSuccess?.();
      } else {
        const errMsg = result.error || result.details || `삭제에 실패했습니다 (${response.status})`;
        console.error('삭제 실패:', response.status, result);
        toast.error(errMsg);
      }
    } catch (error: any) {
      console.error('삭제 에러:', error);
      toast.error(error?.message || '삭제에 실패했습니다');
    }
  };

  if (showQuestionForm) {
    return (
      <QuestionForm
        onClose={() => setShowQuestionForm(false)}
        onSuccess={() => {
          setShowQuestionForm(false);
          loadQuestions();
        }}
      />
    );
  }

  if (selectedQuestion) {
    return (
      <QuestionDetail
        question={selectedQuestion}
        isAdmin={isAdmin}
        onClose={() => setSelectedQuestion(null)}
        onDelete={() => handleDeleteQuestion(selectedQuestion.id, () => setSelectedQuestion(null))}
        onAnswerAdded={() => {
          loadQuestions();
          // Refresh the selected question
          const updated = questions.find(q => q.id === selectedQuestion.id);
          if (updated) setSelectedQuestion(updated);
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* 상단 필터 및 작성 버튼 */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#E91E7A] text-white shadow-md'
                  : 'bg-[#F8F9FA] text-[#6B7D8C] hover:bg-[#8FA8BA]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {user && (
          <button
            onClick={() => setShowQuestionForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E91E7A] text-white rounded-full hover:bg-[#d11a6d] transition-colors font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            질문하기
          </button>
        )}
      </div>

      {/* 로그인 안내 */}
      {!user && (
        <div className="p-6 bg-[#F8F9FA] rounded-xl text-center">
          <p className="text-[#6B7D8C] mb-4">
            질문을 작성하려면 로그인이 필요합니다
          </p>
          <Link
            to="/reservation"
            className="inline-block px-6 py-2.5 bg-[#E91E7A] text-white rounded-xl hover:bg-[#d11a6d] transition-colors font-medium"
          >
            로그인하기
          </Link>
        </div>
      )}

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-12 text-[#8FA8BA]">
          질문을 불러오는 중...
        </div>
      )}

      {/* 질문 목록 */}
      {!loading && questions.length === 0 && (
        <div className="text-center py-12 text-[#8FA8BA]">
          작성된 질문이 없습니다
        </div>
      )}

      {!loading && questions.length > 0 && (
        <>
          <div className="space-y-4">
            {questions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((question) => {
              const categoryLabel = categories.find(c => c.id === question.category)?.label || question.category;
              const hasAnswers = question.answers && question.answers.length > 0;
              
              return (
                <div
                  key={question.id}
                  onClick={() => setSelectedQuestion(question)}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* 카테고리 뱃지 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#E91E7A]/10 text-[#E91E7A] text-xs font-medium rounded-full">
                          {categoryLabel}
                        </span>
                        {hasAnswers && (
                          <span className="px-3 py-1 bg-[#3E5266] text-white text-xs font-medium rounded-full">
                            답변완료
                          </span>
                        )}
                      </div>

                      {/* 제목 */}
                      <h3 className="text-[#3E5266] font-semibold mb-2 line-clamp-1">
                        {question.title}
                      </h3>

                      {/* 내용 미리보기 */}
                      <p className="text-sm text-[#6B7D8C] mb-3 line-clamp-2">
                        {question.content}
                      </p>

                      {/* 메타 정보 */}
                      <div className="flex items-center gap-3 text-xs text-[#8FA8BA]">
                        <span>{question.author_email === 'admin@beautiful.com' ? '뷰티풀한방병원' : (question.author_email?.split('@')[0] || '익명')}</span>
                        <span>•</span>
                        <span>{new Date(question.created_at).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>

                    {/* 삭제 버튼 (로그인 사용자 - 작성자/관리자만 백엔드에서 삭제 가능) */}
                    {user && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteQuestion(question.id);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 페이지네이션 */}
          {Math.ceil(questions.length / itemsPerPage) > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(questions.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

// 질문 작성 폼 컴포넌트
function QuestionForm({ onClose, onSuccess }: { 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "cancer" as 'cancer' | 'gynecologic_cancer' | 'gastro_cancer' | 'lung_cancer' | 'liver_cancer' | 'other_cancer',
    isPrivate: false,
    agreePrivacy: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/questions`;
      
      console.log('📝 질문 등록 요청:', {
        url,
        title: formData.title,
        category: formData.category,
        isPrivate: formData.isPrivate,
        author_id: user.id,
        author_email: user.email
      });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          is_private: formData.isPrivate,
          author_id: user.id,
          author_email: user.email
        }),
      });

      console.log('📡 응답 상태:', response.status, response.statusText);
      
      const result = await response.json();
      console.log('📡 응답 데이터:', result);
      
      if (result.success) {
        toast.success('질문이 등록되었습니다. 빠른 시간 내에 답변드리겠습니다.');
        onSuccess();
      } else {
        console.error('❌ 서버 오류:', result.error);
        toast.error(result.error || '질문 등록에 실패했습니다');
      }
    } catch (error: any) {
      console.error('❌ 질문 등록 에러:', error);
      toast.error('질문 등록에 실패했습니다');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-[#3E5266] mb-3">궁금한 점을 남겨주세요</h2>
        <p className="text-[#6B7D8C]">
          전문의가 직접 답변해 드립니다
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            제목 <span className="text-[#E91E7A]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
            placeholder="질문 제목을 입력하세요"
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            카테고리 <span className="text-[#E91E7A]">*</span>
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as 'cancer' | 'gynecologic_cancer' | 'gastro_cancer' | 'lung_cancer' | 'liver_cancer' | 'other_cancer' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
          >
            <option value="cancer">유방암</option>
            <option value="gynecologic_cancer">자궁/난소암</option>
            <option value="gastro_cancer">위/대장암</option>
            <option value="lung_cancer">폐암</option>
            <option value="liver_cancer">간암</option>
            <option value="other_cancer">기타암</option>
          </select>
        </div>

        {/* 질문 내용 */}
        <div>
          <label className="block text-sm font-medium text-[#3E5266] mb-2">
            질문 내용 <span className="text-[#E91E7A]">*</span>
          </label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent resize-none"
            placeholder="궁금하신 내용을 자세히 작성해 주세요"
          />
        </div>

        {/* 비공개 옵션 */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPrivate"
            checked={formData.isPrivate}
            onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
            className="w-4 h-4 text-[#E91E7A] border-gray-300 rounded focus:ring-[#E91E7A]"
          />
          <label htmlFor="isPrivate" className="text-sm text-[#6B7D8C]">
            비공개 질문 (답변을 이메일/문자로만 받습니다)
          </label>
        </div>

        {/* 개인정보 동의 */}
        <div className="p-4 bg-[#F8F9FA] rounded-xl">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agreePrivacy"
              required
              checked={formData.agreePrivacy}
              onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
              className="w-4 h-4 mt-0.5 text-[#E91E7A] border-gray-300 rounded focus:ring-[#E91E7A]"
            />
            <label htmlFor="agreePrivacy" className="text-sm text-[#6B7D8C]">
              개인정보 수집 및 이용에 동의합니다 <span className="text-[#E91E7A]">*</span>
              <br />
              <span className="text-xs text-[#8FA8BA]">
                (수집 항목: 이름, 연락처 / 목적: 질문 답변 / 보유 기간: 답변 완료 후 1년)
              </span>
            </label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full py-4 bg-[#E91E7A] text-white rounded-xl font-medium hover:bg-[#d11a6d] transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          질문 등록하기
        </button>
      </form>

      {/* 안내 메시지 */}
      <div className="mt-8 p-6 bg-[#F8F9FA] rounded-xl">
        <h3 className="text-[#3E5266] font-semibold mb-3">답변 안내</h3>
        <ul className="space-y-2 text-sm text-[#6B7D8C]">
          <li className="flex items-start gap-2">
            <span className="text-[#E91E7A] mt-0.5">•</span>
            <span>평일 기준 24시간 이내 답변드립니다</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#E91E7A] mt-0.5">•</span>
            <span>공개 질문은 익명으로 게시됩니다</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#E91E7A] mt-0.5">•</span>
            <span>긴급 상담은 전화로 문의해 주세요</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// 질문 상세보기 및 답변 작성 컴포넌트
function QuestionDetail({ question, isAdmin, onClose, onDelete, onAnswerAdded }: { 
  question: any; 
  isAdmin: boolean;
  onClose: () => void; 
  onDelete?: () => void;
  onAnswerAdded: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    content: ""
  });

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/questions/${question.id}/answers`;
      
      console.log('📝 답변 등록 요청:', {
        url,
        question_id: question.id,
        author_id: user.id,
        author_email: user.email,
        content_length: formData.content.length
      });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: formData.content,
          author_id: user.id,
          author_email: user.email
        }),
      });

      console.log('📡 응답 상태:', response.status, response.statusText);

      const result = await response.json();
      console.log('📡 응답 데이터:', result);
      
      if (result.success) {
        toast.success('답변이 등록되었습니다.');
        setFormData({ content: '' });
        onAnswerAdded();
      } else {
        console.error('❌ 서버 오류:', result.error);
        toast.error(result.error || '답변 등록에 실패했습니다');
      }
    } catch (error: any) {
      console.error('❌ 답변 등록 에러:', error);
      toast.error('답변 등록에 실패했습니다');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative mb-8">
        <div className="text-center">
          <h2 className="text-[#3E5266] mb-3">질문 상세보기</h2>
          <p className="text-[#6B7D8C]">
            전문의가 직접 답변해 드립니다
          </p>
        </div>
        {user && onDelete && (
          <button
            onClick={onDelete}
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            title="질문 삭제"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">삭제</span>
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {/* 질문 제목 */}
        <h3 className="text-[#3E5266] font-semibold mb-3 line-clamp-1">
          {question.title}
        </h3>

        {/* 질문 내용 */}
        <p className="text-sm text-[#6B7D8C] mb-4 line-clamp-2">
          {question.content}
        </p>

        {/* 메타 정보 */}
        <div className="flex items-center gap-3 text-xs text-[#8FA8BA]">
          <span>{question.author_email?.split('@')[0] || '익명'}</span>
          <span>•</span>
          <span>{new Date(question.created_at).toLocaleDateString('ko-KR')}</span>
        </div>

        {/* 답변 목록 */}
        {question.answers && question.answers.length > 0 && (
          <div className="mt-6">
            <h4 className="text-[#3E5266] font-semibold mb-3">답변</h4>
            <div className="space-y-4">
              {question.answers.map((answer: any) => (
                <div
                  key={answer.id}
                  className="bg-gray-100 p-4 rounded-xl"
                >
                  <p className="text-sm text-[#6B7D8C] leading-relaxed">
                    {answer.content}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#8FA8BA] mt-2">
                    <span>{answer.author_email === 'admin@beautiful.com' ? '뷰티풀한방병원' : (answer.author_email?.split('@')[0] || '익명')}</span>
                    <span>•</span>
                    <span>{new Date(answer.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 답변 작성 폼 */}
        {isAdmin && (
          <div className="mt-6">
            <h4 className="text-[#3E5266] font-semibold mb-3">답변 작성</h4>
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent resize-none"
                placeholder="답변 내용을 입력하세요"
              />
              <button
                type="submit"
                className="w-full py-4 bg-[#E91E7A] text-white rounded-xl font-medium hover:bg-[#d11a6d] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                답변 등록하기
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="mt-8 px-8 py-3 bg-[#F8F9FA] text-[#6B7D8C] rounded-xl font-medium hover:bg-[#8FA8BA]/20 transition-colors"
      >
        닫기
      </button>
    </div>
  );
}

// 페이지네이션 컴포넌트
function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 페이지가 5개 초과일 때
      if (currentPage <= 3) {
        // 현재 페이지가 앞쪽
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 현재 페이지가 뒤쪽
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // 현재 페이지가 중간
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 hover:bg-[#F8F9FA] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-5 h-5 text-[#6B7D8C]" />
      </button>

      {/* 페이지 번호 */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#8FA8BA]">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all ${
              isActive
                ? 'bg-[#E91E7A] text-white shadow-md'
                : 'border border-gray-200 text-[#6B7D8C] hover:bg-[#F8F9FA]'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 hover:bg-[#F8F9FA] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-5 h-5 text-[#6B7D8C]" />
      </button>
    </div>
  );
}