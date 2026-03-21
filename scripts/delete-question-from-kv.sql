-- 질문 데이터 직접 삭제 (Supabase SQL Editor에서 실행)
-- 테이블: kv_store_ee767080

-- 1) 먼저 삭제 대상 확인
SELECT key, value->>'title' as title, value->>'author_email' as author_email, value->>'category' as category
FROM kv_store_ee767080
WHERE key LIKE 'question_%';

-- 2) 특정 질문만 삭제 (title, author 기준)
-- "질문" / "질문내용 입력" / fusionsfc 작성자
DELETE FROM kv_store_ee767080
WHERE key LIKE 'question_%'
  AND value->>'title' = '질문'
  AND (value->>'author_email' LIKE '%fusionsfc%' OR value->>'content' = '질문내용 입력');

-- 3) 또는 질문 전체 삭제
-- DELETE FROM kv_store_ee767080 WHERE key LIKE 'question_%';
