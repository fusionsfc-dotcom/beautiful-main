/** 관리자 이메일 폴백 (profiles RLS/권한 이슈 시 클라이언트·Edge Function 공통) */

const DEFAULT_ADMIN_EMAILS = ["admin@beautiful.com"];

export function getAdminEmails(): string[] {
  const fromEnv = import.meta.env.VITE_ADMIN_EMAILS as string | undefined;
  const raw = fromEnv?.trim() || DEFAULT_ADMIN_EMAILS.join(",");
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
