-- profiles 테이블 권한 수정 (Edge Function · 클라이언트 admin 확인용)
-- Supabase Dashboard → SQL Editor에서 실행

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- service_role이 RLS를 통과하도록 (이미 있으면 무시하고 넘어가도 됨)
DROP POLICY IF EXISTS "service role full access profiles" ON public.profiles;
CREATE POLICY "service role full access profiles"
  ON public.profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 관리자 계정 role 확인 (이메일에 맞게 수정)
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@beautiful.com';
