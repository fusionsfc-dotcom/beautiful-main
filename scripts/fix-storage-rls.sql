-- make-ee767080-images 버킷: 관리자·콘텐츠 업로드용 RLS (Supabase SQL Editor에서 실행)
-- gallery 업로드만 되고 cases/columns 가 막힐 때 이 스크립트를 실행하세요.

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
    AND (storage.foldername(name))[1] IN ('cases', 'columns', 'gallery')
  );

-- 로그인 사용자 본인 업로드 파일 수정·삭제 (선택)
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
