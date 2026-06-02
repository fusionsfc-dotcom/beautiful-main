import { supabase } from "./supabase";
import { projectId } from "../../utils/supabase/info";

const IMAGE_BUCKET = "make-ee767080-images";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

/** Storage 직접 업로드 실패 시 Edge로 넘길 메시지 패턴 */
const EDGE_FALLBACK_PATTERN =
  /row-level security|permission denied|not allowed|schema is invalid|incompatible|database error|bucket not found|invalid object/i;

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

async function uploadViaStorage(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${folder.replace(/\/$/, "")}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, { upsert: false, contentType: file.type });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);
  if (!data?.publicUrl) {
    throw new Error("이미지 URL 생성에 실패했습니다");
  }

  return data.publicUrl;
}

/** 관리자 이미지 업로드 — Edge Function 우선(service role), 실패 시 Storage 직접 */
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

  let edgeError: Error | null = null;
  try {
    return await uploadViaEdgeFunction(file, folder, session.access_token);
  } catch (err: unknown) {
    edgeError = err instanceof Error ? err : new Error(String(err));
    console.warn("Edge Function 업로드 실패 — Storage 직접 시도:", edgeError.message);
  }

  try {
    return await uploadViaStorage(file, folder);
  } catch (storageErr: unknown) {
    const message =
      storageErr instanceof Error
        ? storageErr.message
        : "스토리지 업로드에 실패했습니다";

    if (EDGE_FALLBACK_PATTERN.test(message) && edgeError) {
      throw new Error(
        `${edgeError.message} (Storage: ${message}). Supabase SQL Editor에서 scripts/fix-storage-rls.sql 실행 후 Edge Function 재배포를 확인해 주세요.`,
      );
    }

    if (EDGE_FALLBACK_PATTERN.test(message)) {
      throw new Error(
        `${message} — SQL Editor에서 scripts/fix-storage-rls.sql 실행을 확인해 주세요.`,
      );
    }

    throw new Error(message);
  }
}

/** 여러 장 순차 업로드 (실패 시 해당 파일만 건너뛰지 않고 throw) */
export async function uploadAdminImages(files: File[], folder: string): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    urls.push(await uploadAdminImage(file, folder));
  }
  return urls;
}
