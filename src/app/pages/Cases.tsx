import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  Eye
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { supabase, Case } from "../../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import SEOHead from "../../components/seo/SEOHead";

type CaseCategoryType = "cancer" | "post_surgery" | "chemotherapy" | "radiation";

export default function Cases() {
  const { isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<CaseCategoryType | "all">("all");
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);

  const categories = [
    { id: "all" as const, label: "전체" },
    { id: "cancer" as CaseCategoryType, label: "뷰티풀 암케어" },
    { id: "post_surgery" as CaseCategoryType, label: "수술 후 회복케어" },
    { id: "chemotherapy" as CaseCategoryType, label: "항암치료 환자 케어" },
    { id: "radiation" as CaseCategoryType, label: "방사선치료 환자 케어" },
  ];

  useEffect(() => {
    loadCases();
  }, []);

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

  const filteredCases = selectedCategory === "all" 
    ? cases 
    : cases.filter(c => c.category === selectedCategory);

  if (showEditor) {
    return (
      <CaseEditor
        case={editingCase}
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
        jsonLd={cases.length > 0 ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "치료사례 | 뷰티풀한방병원",
          "description": "뷰티풀한방병원의 실제 치료사례 모음",
          "url": "https://www.btful.co.kr/cases",
          "publisher": {
            "@type": "Hospital",
            "name": "뷰티풀한방병원",
            "url": "https://www.btful.co.kr",
          },
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
        } : undefined}
      />
      {/* 페이지 헤더 */}
      <div className="bg-[#F8F9FA] py-16 px-5">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="mb-4 text-[#3E5266]">치료사례</h1>
          <p className="text-[#6B7D8C] text-lg">
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
                  setEditingCase(null);
                  setShowEditor(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#E91E7A] text-white rounded-full hover:bg-[#d11a6d] transition-colors font-medium whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                새 사례 작성
              </button>
            )}
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="text-center py-12 text-[#8FA8BA]">
              치료사례를 불러오는 중...
            </div>
          )}

          {/* 빈 상태 */}
          {!loading && filteredCases.length === 0 && (
            <div className="text-center py-12 text-[#8FA8BA]">
              작성된 치료사례가 없습니다
            </div>
          )}

          {/* 카드형 콘텐츠 UI */}
          {!loading && filteredCases.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <article
                  key={caseItem.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group cursor-pointer"
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
                    <h3 className="text-[#3E5266] mb-3 line-clamp-2 group-hover:text-[#E91E7A] transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-[#6B7D8C] mb-4 line-clamp-3 leading-relaxed">
                      {caseItem.content.substring(0, 100)}...
                    </p>

                    {/* 메타 정보 */}
                    <div className="flex items-center justify-between text-xs text-[#8FA8BA] mb-4">
                      <span>{new Date(caseItem.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>

                    {/* 관리자 액션 버튼 */}
                    {isAdmin && (
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCase(caseItem);
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
                    <div className="inline-block px-3 py-1 bg-[#E91E7A]/10 text-[#E91E7A] text-xs font-medium rounded-full">
                      {categories.find(c => c.id === caseItem.category)?.label}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 치료사례 에디터 컴포넌트
function CaseEditor({ case: caseItem, onClose, onSave }: { 
  case: Case | null; 
  onClose: () => void; 
  onSave: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: caseItem?.title || '',
    content: caseItem?.content || '',
    category: caseItem?.category || 'cancer' as CaseCategoryType,
    thumbnail: caseItem?.thumbnail || '',
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
      
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'cases'); // cases 폴더에 업로드

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/upload-image`;
      console.log('🔗 업로드 URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`, // ✅ 진짜 JWT 사용
        },
        body: uploadFormData,
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
      
      console.log('💾 치료사례 저장 시작:', caseItem ? '수정' : '작성');
      console.log('📦 데이터:', formData);

      if (caseItem) {
        // 수정
        const { error } = await supabase
          .from('cases')
          .update({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            thumbnail: formData.thumbnail,
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
            content: formData.content,
            category: formData.category,
            thumbnail: formData.thumbnail,
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
          <h2 className="text-[#3E5266]">
            {caseItem ? '치료사례 수정' : '새 치료사례 작성'}
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
              placeholder="치료사례 제목을 입력하세요"
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-[#3E5266] mb-2">
              클리닉 분류 <span className="text-[#E91E7A]">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as CaseCategoryType })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
            >
              <option value="cancer">뷰티풀 암케어</option>
              <option value="post_surgery">수술 후 회복케어</option>
              <option value="chemotherapy">항암치료 환자 케어</option>
              <option value="radiation">방사선치료 환자 케어</option>
            </select>
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
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-gray-200">
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
              치료 내용 <span className="text-[#E91E7A]">*</span>
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent resize-none"
              placeholder="치료 과정, 결과, 환자 상태 등을 자세히 작성해주세요"
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-4 bg-[#E91E7A] text-white rounded-xl font-medium hover:bg-[#d11a6d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '저장 중...' : (caseItem ? '수정 완료' : '작성 완료')}
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
    </div>
  );
}