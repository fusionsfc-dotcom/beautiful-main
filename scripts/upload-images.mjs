#!/usr/bin/env node
/**
 * uploads/ 폴더의 이미지를 Supabase Storage에 업로드하고 image-assets.json을 갱신합니다.
 * 사용법: node scripts/upload-images.mjs
 * 
 * 1. SUPABASE-STORAGE-SETUP.md 따라 Storage 버킷 생성
 * 2. uploads/manifest.json에 파일명->hash 매핑 확인
 * 3. 이미지를 uploads/ 폴더에 넣기
 * 4. 이 스크립트 실행
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const projectId = 'pzivoxyngofrrpdjramu';
const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6aXZveHluZ29mcnJwZGpyYW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODIzMjksImV4cCI6MjA4ODE1ODMyOX0.RCK8afTrCi-KlWp05F2ZmMW0rlcBR9jhn7MZjmq3WME';

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);
const BUCKET = 'images';

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (exists) return;
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error) {
    console.warn(`버킷 생성 실패 (대시보드에서 수동 생성 필요): ${error.message}`);
    console.warn('→ https://supabase.com/dashboard/project/' + projectId + '/storage/buckets');
  } else {
    console.log(`✓ 버킷 "${BUCKET}" 생성됨`);
  }
}

async function main() {
  await ensureBucket();
  const manifestPath = join(root, 'uploads', 'manifest.json');
  const assetsPath = join(root, 'image-assets.json');
  const uploadsDir = join(root, 'uploads');

  if (!existsSync(manifestPath)) {
    console.error('uploads/manifest.json이 없습니다.');
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const assets = existsSync(assetsPath) ? JSON.parse(readFileSync(assetsPath, 'utf-8')) : {};

  // _comment 등 메타 키 제외
  const mappings = Object.entries(manifest).filter(([k]) => !k.startsWith('_'));

  let updated = 0;
  for (const [filename, hash] of mappings) {
    const filePath = join(uploadsDir, filename);
    if (!existsSync(filePath)) continue;

    const ext = filename.split('.').pop();
    const storagePath = `${hash}.${ext}`;

    const fileBuffer = readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        upsert: true,
        contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
      });

    if (error) {
      console.error(`업로드 실패 ${filename}:`, error.message);
      continue;
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    assets[hash] = urlData.publicUrl;
    updated++;
    console.log(`✓ ${filename} → ${hash}`);
  }

  if (updated > 0) {
    writeFileSync(assetsPath, JSON.stringify(assets, null, 2));
    console.log(`\n${updated}개 이미지 업로드 완료. image-assets.json 갱신됨.`);
  } else {
    console.log('업로드할 이미지가 없습니다. uploads/ 폴더에 manifest에 정의된 파일을 넣어주세요.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
