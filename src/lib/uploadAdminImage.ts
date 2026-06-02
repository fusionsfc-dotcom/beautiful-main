import { supabase } from "./supabase";

const IMAGE_BUCKET = "make-ee767080-images";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "이미지 파일만 업로드 가능합니다 (PNG, JPG, WebP, GIF)";
  }
  if (file.size > MAX_BYTES) {
    return "파일 크기는 5MB 이하여야 합니다";
  }
  return null;
}

/** 관리자 이미지 — Supabase Storage 직접 업로드 (Edge Function / profiles 권한 불필요) */
export async function uploadAdminImage(file: File, folder: string): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${folder.replace(/\/$/, "")}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, { upsert: false, contentType: file.type });

  if (uploadError) {
    throw new Error(uploadError.message || "스토리지 업로드에 실패했습니다");
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);
  if (!data?.publicUrl) {
    throw new Error("이미지 URL 생성에 실패했습니다");
  }

  return data.publicUrl;
}
