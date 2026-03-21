import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { Case } from "../../lib/supabase";
import { useNavigate } from "react-router";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
    category: '항암 중·후 회복',
  });
  const navigate = useNavigate();

  const categories = [
    '항암 중·후 회복',
    '중풍·파킨슨병 재활',
    '이명·두통·어지럼',
    '척추·관절 통증',
  ];

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !isAdmin) {
        toast.error('관리자만 접근 가능합니다');
        navigate("/");
        return;
      }
      loadCases();
    }
  }, [isAuthenticated, isAdmin, authLoading, navigate]);

  const loadCases = async () => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('치료사례 로드 실패:', error);
      toast.error('치료사례를 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      toast.error('모든 필수 항목을 입력해주세요');
      return;
    }

    try {
      if (editingId) {
        // 수정
        const { error } = await supabase
          .from('cases')
          .update({
            title: formData.title,
            content: formData.content,
            thumbnail: formData.thumbnail || null,
            category: formData.category,
          })
          .eq('id', editingId);

        if (error) throw error;
        toast.success('치료사례가 수정되었습니다');
      } else {
        // 신규 작성
        const { error } = await supabase.from('cases').insert({
          title: formData.title,
          content: formData.content,
          thumbnail: formData.thumbnail || null,
          category: formData.category,
        });

        if (error) throw error;
        toast.success('치료사례가 등록되었습니다');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', content: '', thumbnail: '', category: '항암 중·후 회복' });
      loadCases();
    } catch (error: any) {
      console.error('저장 실패:', error);
      toast.error(error.message || '저장에 실패했습니다');
    }
  };

  const handleEdit = (caseItem: Case) => {
    setFormData({
      title: caseItem.title,
      content: caseItem.content,
      thumbnail: caseItem.thumbnail || '',
      category: caseItem.category,
    });
    setEditingId(caseItem.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('cases').delete().eq('id', id);

      if (error) throw error;
      toast.success('치료사례가 삭제되었습니다');
      loadCases();
    } catch (error: any) {
      console.error('삭제 실패:', error);
      toast.error(error.message || '삭제에 실패했습니다');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', content: '', thumbnail: '', category: '항암 중·후 회복' });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[100dvh] bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E91E7A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white py-8 px-5">
      <div className="max-w-screen-lg mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#3E5266]">치료사례 관리</h1>
            <p className="text-[#6B7D8C] mt-2">치료사례를 작성하고 관리하세요</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-[#E91E7A] text-white px-4 py-2 rounded-md hover:bg-[#D81869] transition-colors"
            >
              <Plus className="w-5 h-5" />
              새 치료사례
            </button>
          )}
        </div>

        {/* 작성 폼 */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#3E5266]">
                {editingId ? '치료사례 수정' : '새 치료사례 작성'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-[#6B7D8C] hover:text-[#3E5266] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium text-[#3E5266] mb-2">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E7A]"
                  placeholder="예: 유방암 환자의 3주 입원 치료 후기"
                />
              </div>

              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium text-[#3E5266] mb-2">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E7A]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* 썸네일 URL */}
              <div>
                <label className="block text-sm font-medium text-[#3E5266] mb-2">
                  썸네일 이미지 URL (선택)
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E7A]"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* 본문 */}
              <div>
                <label className="block text-sm font-medium text-[#3E5266] mb-2">
                  본문 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E7A]"
                  placeholder="치료 과정, 증상 변화, 환자 후기 등을 자세히 작성해주세요"
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-[#6B7D8C] rounded-md hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-[#E91E7A] text-white rounded-md hover:bg-[#D81869] transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? '수정하기' : '등록하기'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 치료사례 목록 */}
        <div className="space-y-4">
          {cases.length === 0 ? (
            <div className="text-center py-20 text-[#6B7D8C]">
              아직 등록된 치료사례가 없습니다
            </div>
          ) : (
            cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-[#E91E7A]/10 text-[#E91E7A] text-xs font-medium rounded-full mb-2">
                      {caseItem.category}
                    </div>
                    <h3 className="text-[#3E5266] mb-2">{caseItem.title}</h3>
                    <p className="text-[#6B7D8C] text-sm line-clamp-2 mb-3">
                      {caseItem.content}
                    </p>
                    <p className="text-xs text-[#8FA8BA]">
                      {new Date(caseItem.created_at).toLocaleString('ko-KR')}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(caseItem)}
                      className="p-2 text-[#3E5266] hover:bg-[#F8F9FA] rounded-md transition-colors"
                      title="수정"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(caseItem.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
