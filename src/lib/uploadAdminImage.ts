import { supabase } from "./supabase";
import { projectId } from "../../utils/supabase/info";

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

async function uploadViaEdgeFunction(
  file: File,
  folder: string,
  accessToken: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const url = `https://${projectId}.supabase.co/functions/v1/make-server-ee767080/upload-image`;
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      (result as { error?: string }).error || `업로드 실패 (${response.status})`,
    );
  }

  const imageUrl = (result as { url?: string }).url;
  if (!imageUrl) {
    throw new Error("이미지 URL을 받지 못했습니다");
  }
  return imageUrl;
}

/** 관리자 이미지 업로드 — Storage 직접 시도 후 RLS 실패 시 Edge Function 폴백 */
export async function uploadAdminImage(file: File, folder: string): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error("로그인이 필요합니다");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${folder.replace(/\/$/, "")}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, { upsert: false, contentType: file.type });

  if (uploadError) {
    const useEdgeFallback =
      /row-level security|permission denied|not allowed/i.test(uploadError.message);

    if (useEdgeFallback) {
      console.warn("Storage RLS 차단 — Edge Function 업로드로 전환:", uploadError.message);
      return uploadViaEdgeFunction(file, folder, session.access_token);
    }

    throw new Error(uploadError.message || "스토리지 업로드에 실패했습니다");
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);
  if (!data?.publicUrl) {
    throw new Error("이미지 URL 생성에 실패했습니다");
  }

  return data.publicUrl;
}

/** 여러 장 순차 업로드 (실패 시 해당 파일만 건너뛰지 않고 throw) */
export async function uploadAdminImages(files: File[], folder: string): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    urls.push(await uploadAdminImage(file, folder));
  }
  return urls;
}
