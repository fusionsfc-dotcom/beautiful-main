# Supabase Storage 이미지 설정

**이미지는 로컬(public/)에 저장하지 않고 Supabase Storage에만 업로드합니다.**

## 빠른 설정 (1분)

```bash
npm run setup-storage   # 대시보드 열기 + 안내
```

브라우저가 열리면 아래 단계를 따르세요.

## 1. Storage 버킷 생성

**직접 링크**: https://supabase.com/dashboard/project/pzivoxyngofrrpdjramu/storage/buckets

1. **New bucket** 클릭
2. **Name**: `images`
3. **Public bucket**: ✅ 체크
4. **Create bucket** 클릭

## 2. RLS 정책 설정 (SQL Editor에서 실행)

Supabase 대시보드 → **SQL Editor** → New query:

```sql
-- 누구나 이미지 읽기 가능
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- 익명 업로드 허용 (이미지 업로드 스크립트용)
CREATE POLICY "Allow anon upload for images"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'images');
```

## 3. 이미지 업로드

```bash
npm run upload-images
```

업로드 후 `image-assets.json`에 Supabase URL이 저장되고, 웹사이트에서 해당 링크를 사용합니다.
