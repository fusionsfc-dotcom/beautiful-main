-- make-ee767080-images 버킷: 관리자·콘텐츠 업로드용 RLS (Supabase SQL Editor에서 실행)
-- gallery 업로드만 되고 cases/columns 가 막히거나
-- "The database schema is invalid or incompatible" 가 나올 때 실행하세요.
--
-- storage.foldername() 은 일부 프로젝트에서 정책 평가 오류를 일으킬 수 있어
-- name LIKE '폴더/%' 방식으로 통일합니다.

-- 공개 읽기
DROP POLICY IF EXISTS "Public read make-ee767080-images" ON storage.objects;
CREATE POLICY "Public read make-ee767080-images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'make-ee767080-images');

-- 로그인 사용자 업로드 (cases, columns, gallery 폴더)
DROP POLICY IF EXISTS "Authenticated upload make-ee767080-images" ON storage.objects;
CREATE POLICY "Authenticated upload make-ee767080-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'make-ee767080-images'
    AND (
      name LIKE 'cases/%'
      OR name LIKE 'columns/%'
      OR name LIKE 'gallery/%'
    )
  );

-- 로그인 사용자 본인 업로드 파일 수정·삭제
DROP POLICY IF EXISTS "Authenticated update own make-ee767080-images" ON storage.objects;
CREATE POLICY "Authenticated update own make-ee767080-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'make-ee767080-images' AND owner = auth.uid());

DROP POLICY IF EXISTS "Authenticated delete own make-ee767080-images" ON storage.objects;
CREATE POLICY "Authenticated delete own make-ee767080-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'make-ee767080-images' AND owner = auth.uid());

-- service_role: Edge Function 업로드 (RLS 우회용 정책 — 이미 있으면 유지)
DROP POLICY IF EXISTS "Service role all make-ee767080-images" ON storage.objects;
CREATE POLICY "Service role all make-ee767080-images"
  ON storage.objects FOR ALL
  TO service_role
  USING (bucket_id = 'make-ee767080-images')
  WITH CHECK (bucket_id = 'make-ee767080-images');
