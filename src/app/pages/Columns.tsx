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
  X
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { supabase, Column, Video } from "../../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

type MainTabType = "columns" | "videos" | "faq" | "question";
type ColumnCategoryType = "cancer" | "stroke" | "tinnitus" | "spine";
type FaqCategoryType = "cancer" | "stroke" | "tinnitus" | "admission" | "cost";

export default function Columns() {
  const [activeTab, setActiveTab] = useState<MainTabType>("videos");

  const mainTabs = [
    { id: "videos" as MainTabType, label: "영상 가이드", icon: VideoIcon },
    { id: "columns" as MainTabType, label: "질환별 칼럼", icon: BookOpen },
    { id: "faq" as MainTabType, label: "자주하는 질문", icon: HelpCircle },
    { id: "question" as MainTabType, label: "질문하기", icon: MessageCircle },
  ];

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* 페이지 헤더 */}
      <div className="bg-[#F8F9FA] py-16 px-5">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="mb-4 text-[#3E5266]">치료 가이드</h1>
          <p className="text-[#6B7D8C] text-lg">
            질환별 전문 정보와 실질적인 가이드를 제공합니다
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
          {activeTab === "columns" && <ColumnsSection />}
          {activeTab === "videos" && <VideosSection />}
          {activeTab === "faq" && <FaqSection />}
          {activeTab === "question" && <QuestionSection />}
        </div>
      </div>
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
    { id: "cancer" as ColumnCategoryType, label: "암 회복 가이드" },
    { id: "stroke" as ColumnCategoryType, label: "중풍·파킨슨병 재활" },
    { id: "tinnitus" as ColumnCategoryType, label: "이명·두통" },
    { id: "spine" as ColumnCategoryType, label: "척추·관절" },
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

      {/* 카드형 콘텐츠 UI */}
      {!loading && filteredColumns.length === 0 && (
        <div className="text-center py-12 text-[#8FA8BA]">
          작성된 칼럼이 없습니다
        </div>
      )}

      {!loading && filteredColumns.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {currentColumns.map((column) => (
              <article
                key={column.id}
                onClick={() => setSelectedColumn(column)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group cursor-pointer"
              >
                {/* 썸네일 이미지 */}
                {column.thumbnail && (
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={column.thumbnail}
                      alt={column.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* 콘텐츠 */}
                <div className="p-6">
                  <h3 className="text-[#3E5266] mb-3 line-clamp-2 group-hover:text-[#E91E7A] transition-colors">
                    {column.title}
                  </h3>
                  <p className="text-sm text-[#6B7D8C] mb-4 line-clamp-2 leading-relaxed">
                    {column.summary}
                  </p>

                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-[#8FA8BA] mb-4">
                    <div className="flex items-center gap-3">
                      <span>{new Date(column.created_at).toLocaleDateString('ko-KR')}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {(column.views || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 관리자 액션 버튼 */}
                  {isAdmin && (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingColumn(column);
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
                          handleDelete(column.id);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                    </div>
                  )}

                  {/* CTA */}
                  <button className="flex items-center gap-1 text-[#E91E7A] text-sm font-medium group-hover:gap-2 transition-all">
                    자세히 보기
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
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
            <option value="cancer">암 회복 가이드</option>
            <option value="stroke">중풍·파킨슨병 재활</option>
            <option value="tinnitus">이명·두통</option>
            <option value="spine">척추·관절</option>
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
            <option value="tinnitus">이명 설명 영상</option>
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
    { id: "tinnitus", label: "이명 설명 영상" },
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

// 3️⃣ 자주하는 질문 (FAQ) 섹션
function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryType | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    { id: "all" as const, label: "전체" },
    { id: "cancer" as FaqCategoryType, label: "암" },
    { id: "stroke" as FaqCategoryType, label: "중풍" },
    { id: "tinnitus" as FaqCategoryType, label: "이명" },
    { id: "admission" as FaqCategoryType, label: "입원" },
    { id: "cost" as FaqCategoryType, label: "비용" },
  ];

  const faqs = [
    {
      category: "cancer" as FaqCategoryType,
      question: "항암 중에도 치료가 가능한가요?",
      answer: "네, 가능합니다. 항암 치료는 계속 진행하시면서 한방 치료를 병행하여 부작용을 줄이고 회복력을 높이는 방식으로 진행됩니다. 대학병원과 협력 체계를 갖추고 있어 안전합니다."
    },
    {
      category: "cancer" as FaqCategoryType,
      question: "항암 부작용이 심한데 입원이 도움이 될까요?",
      answer: "입원 치료는 24시간 의료진 케어로 부작용을 체계적으로 관리할 수 있습니다. 영양 관리, 통증 조절, 면역력 증진을 통합적으로 진행하여 항암 순응도를 높입니다."
    },
    {
      category: "stroke" as FaqCategoryType,
      question: "중풍 환자 입원 기간은 얼마나 되나요?",
      answer: "환자 상태에 따라 다르지만, 일반적으로 2~4주 정도입니다. 초기 집중 재활 후 상태를 평가하여 추가 입원 여부를 결정합니다."
    },
    {
      category: "stroke" as FaqCategoryType,
      question: "파킨슨병도 재활 치료가 효과가 있나요?",
      answer: "파킨슨병은 완치는 어렵지만, 적절한 재활 치료로 증상 진행을 늦추고 일상생활 기능을 유지하는 데 도움이 됩니다. 운동 기능과 균형 감각 개선에 집중합니다."
    },
    {
      category: "tinnitus" as FaqCategoryType,
      question: "이명 치료는 얼마나 걸리나요?",
      answer: "이명은 원인과 기간에 따라 치료 기간이 다릅니다. 평균 4~8주 정도 치료하며, 경추 및 자율신경 교정을 통해 증상을 완화합니다."
    },
    {
      category: "tinnitus" as FaqCategoryType,
      question: "두통약 없이 두통을 없앨 수 있나요?",
      answer: "약물에 의존하지 않고 근본 원인을 치료하는 접근이 가능합니다. 경추 교정, 자율신경 안정화, 혈류 개선 등을 통해 두통을 줄여갑니다."
    },
    {
      category: "admission" as FaqCategoryType,
      question: "입원 시 필요한 준비물은 무엇인가요?",
      answer: "개인 세면도구, 편한 옷가지, 복용 중인 약 처방전이 필요합니다. 병실에는 기본 생활용품이 구비되어 있습니다."
    },
    {
      category: "admission" as FaqCategoryType,
      question: "보호자 상주가 필수인가요?",
      answer: "24시간 의료진이 상주하므로 보호자 상주는 필수가 아닙니다. 다만, 환자의 심리적 안정을 위해 낮 시간 방문을 권장합니다."
    },
    {
      category: "cost" as FaqCategoryType,
      question: "입원 비용은 어떻게 되나요?",
      answer: "병실 등급과 치료 내용에 따라 다릅니다. 상담 시 환자 상태를 확인 후 정확한 비용을 안내해 드립니다. 일부 항목은 보험 적용이 가능합니다."
    },
    {
      category: "cost" as FaqCategoryType,
      question: "보험 적용이 가능한가요?",
      answer: "한방 치료 일부와 검사 항목은 건강보험 적용이 가능합니다. 비급여 항목은 사전에 안내해 드리며, 실손보험 청구도 지원합니다."
    },
  ];

  const filteredFaqs = selectedCategory === "all"
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* 카테고리 필터 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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

      {/* 아코디언 UI */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-[#F8F9FA] transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-0.5">
                    <span className="text-[#E91E7A] text-sm font-bold">Q</span>
                  </div>
                  <span className="text-[#3E5266] font-medium leading-relaxed">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#8FA8BA] flex-shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isOpen && (
                <div className="px-6 pb-5">
                  <div className="pl-9 pt-2 border-t border-gray-100">
                    <div className="flex items-start gap-3 pt-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E5266]/10 flex items-center justify-center mt-0.5">
                        <span className="text-[#3E5266] text-sm font-bold">A</span>
                      </div>
                      <p className="text-[#6B7D8C] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

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

// 4️⃣ 질문하기 섹션 - 게시판 형식
function QuestionSection() {
  const { user, isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cancer' | 'stroke' | 'tinnitus' | 'spine'>('all');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = [
    { id: 'all' as const, label: '전체' },
    { id: 'cancer' as const, label: '암 회복' },
    { id: 'stroke' as const, label: '중풍·파킨슨병' },
    { id: 'tinnitus' as const, label: '이명·두통' },
    { id: 'spine' as const, label: '척추·관절' },
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
    category: "cancer" as 'cancer' | 'stroke' | 'tinnitus' | 'spine',
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
            onChange={(e) => setFormData({ ...formData, category: e.target.value as 'cancer' | 'stroke' | 'tinnitus' | 'spine' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E7A] focus:border-transparent"
          >
            <option value="cancer">암 회복</option>
            <option value="stroke">중풍·파킨슨병</option>
            <option value="tinnitus">이명·두통</option>
            <option value="spine">척추·관절</option>
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