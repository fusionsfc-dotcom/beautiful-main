-- 회원 포털: 상담 내역 · 검사 결과 · 치료 경과 리포트
-- Supabase SQL Editor에서 실행

-- 1) 상담 신청 (예약·상담 폼)
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  clinic TEXT NOT NULL,
  visit_type TEXT NOT NULL CHECK (visit_type IN ('outpatient', 'inpatient')),
  consult_method TEXT NOT NULL CHECK (consult_method IN ('phone', 'kakao', 'visit')),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS consultations_user_id_idx ON public.consultations(user_id);
CREATE INDEX IF NOT EXISTS consultations_created_at_idx ON public.consultations(created_at DESC);

-- 2) 검사 결과
CREATE TABLE IF NOT EXISTS public.patient_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL,
  doctor_name TEXT,
  test_date DATE NOT NULL DEFAULT CURRENT_DATE,
  summary TEXT,
  details JSONB NOT NULL DEFAULT '[]'::jsonb,
  file_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS patient_results_user_id_idx ON public.patient_results(user_id);

-- 3) 치료 경과 리포트
CREATE TABLE IF NOT EXISTS public.treatment_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_label TEXT NOT NULL,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  improvements JSONB NOT NULL DEFAULT '[]'::jsonb,
  next_steps TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS treatment_reports_user_id_idx ON public.treatment_reports(user_id);

-- RLS
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_reports ENABLE ROW LEVEL SECURITY;

-- consultations: 본인 조회 · 로그인 사용자 본인 신청 insert
DROP POLICY IF EXISTS "Users read own consultations" ON public.consultations;
CREATE POLICY "Users read own consultations"
  ON public.consultations FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users insert own consultations" ON public.consultations;
CREATE POLICY "Users insert own consultations"
  ON public.consultations FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins manage consultations" ON public.consultations;
CREATE POLICY "Admins manage consultations"
  ON public.consultations FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- patient_results
DROP POLICY IF EXISTS "Users read own patient_results" ON public.patient_results;
CREATE POLICY "Users read own patient_results"
  ON public.patient_results FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins manage patient_results" ON public.patient_results;
CREATE POLICY "Admins manage patient_results"
  ON public.patient_results FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- treatment_reports
DROP POLICY IF EXISTS "Users read own treatment_reports" ON public.treatment_reports;
CREATE POLICY "Users read own treatment_reports"
  ON public.treatment_reports FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins manage treatment_reports" ON public.treatment_reports;
CREATE POLICY "Admins manage treatment_reports"
  ON public.treatment_reports FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- service_role 전체 접근 (Edge Function)
DROP POLICY IF EXISTS "Service role consultations" ON public.consultations;
CREATE POLICY "Service role consultations"
  ON public.consultations FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role patient_results" ON public.patient_results;
CREATE POLICY "Service role patient_results"
  ON public.patient_results FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role treatment_reports" ON public.treatment_reports;
CREATE POLICY "Service role treatment_reports"
  ON public.treatment_reports FOR ALL TO service_role USING (true) WITH CHECK (true);

GRANT SELECT, INSERT ON public.consultations TO authenticated;
GRANT SELECT ON public.patient_results TO authenticated;
GRANT SELECT ON public.treatment_reports TO authenticated;
GRANT ALL ON public.consultations TO service_role;
GRANT ALL ON public.patient_results TO service_role;
GRANT ALL ON public.treatment_reports TO service_role;

-- 관리자 profiles 조회 (회원 포털 관리 UI)
DROP POLICY IF EXISTS "Admins read all profiles" ON public.profiles;
CREATE POLICY "Admins read all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
