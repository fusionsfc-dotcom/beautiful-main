#!/usr/bin/env node
/**
 * Supabase Storage 버킷 설정 - 대시보드를 열고 안내합니다.
 * 사용법: node scripts/setup-supabase-storage.mjs
 */

const projectId = 'pzivoxyngofrrpdjramu';
const url = `https://supabase.com/dashboard/project/${projectId}/storage/buckets`;

console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Supabase Storage 버킷 설정                                  ║
╚══════════════════════════════════════════════════════════════╝

1. 아래 링크에서 Storage 페이지를 엽니다:
   ${url}

2. "New bucket" 클릭

3. 설정:
   - Name: images
   - Public bucket: ✅ 체크
   - Create bucket 클릭

4. SQL Editor에서 RLS 정책 실행 (SUPABASE-STORAGE-SETUP.md 참고)

5. 완료 후 터미널에서 실행:
   npm run upload-images
`);

// macOS에서 브라우저로 열기
try {
  const { execSync } = await import('child_process');
  execSync(`open "${url}"`, { stdio: 'ignore' });
  console.log('→ 브라우저가 열렸습니다.\n');
} catch {
  console.log('→ 위 링크를 브라우저에 복사해 열어주세요.\n');
}
