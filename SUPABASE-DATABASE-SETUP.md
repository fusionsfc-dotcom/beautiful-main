# Supabase 데이터베이스 설정 가이드

## 🚨 중요: 이 SQL을 Supabase SQL Editor에서 실행하세요

Supabase 대시보드 → SQL Editor → New Query에서 아래 SQL을 복사해서 실행하세요.

---

## 1. profiles 테이블 생성

```sql
-- profiles 테이블 생성 (사용자 프로필)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS 활성화
alter table public.profiles enable row level security;

-- 정책: 본인 프로필 읽기 허용
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- 정책: 본인 프로필 수정 허용 (role 제외)
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
```

---

## 2. cases 테이블 생성

```sql
-- cases 테이블 생성 (치료사례)
create table public.cases (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  thumbnail text,
  category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references public.profiles(id) on delete cascade not null
);

-- RLS 활성화
alter table public.cases enable row level security;

-- 정책: 로그인 사용자는 모두 읽기 가능
create policy "Authenticated users can read cases"
  on public.cases for select
  to authenticated
  using (true);

-- 정책: 관리자만 작성 가능
create policy "Admins can insert cases"
  on public.cases for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 정책: 관리자만 수정 가능
create policy "Admins can update cases"
  on public.cases for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 정책: 관리자만 삭제 가능
create policy "Admins can delete cases"
  on public.cases for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
```

---

## 3. 트리거 설정 (회원가입 시 자동 프로필 생성)

```sql
-- 트리거 함수: 회원가입 시 profiles 테이블에 자동 레코드 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

-- 트리거 생성
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## 4. 인덱스 생성 (성능 최적화)

```sql
-- profiles 테이블 인덱스
create index profiles_email_idx on public.profiles(email);
create index profiles_role_idx on public.profiles(role);

-- cases 테이블 인덱스
create index cases_category_idx on public.cases(category);
create index cases_created_at_idx on public.cases(created_at desc);
create index cases_author_id_idx on public.cases(author_id);
```

---

## 5. 관리자 계정 수동 설정

회원가입 후, Supabase 대시보드에서 수동으로 관리자 권한 부여:

### SQL Editor에서 실행:

```sql
-- 이메일로 관리자 권한 부여
update public.profiles
set role = 'admin'
where email = 'admin@beautiful.com';

update public.profiles
set role = 'admin'
where email = 'doctor@beautiful.com';
```

### 또는 Table Editor에서:
1. Authentication → Users 에서 회원가입한 사용자 확인
2. Table Editor → profiles → 해당 사용자의 role 컬럼을 `admin`으로 수정

---

## 6. 테스트 데이터 삽입 (선택)

```sql
-- 테스트용 치료사례 (관리자로 로그인 후 자동 생성됨)
-- 직접 삽입 시:
insert into public.cases (title, content, thumbnail, category, author_id)
values (
  '유방암 환자의 3주 입원 치료 후기',
  '항암 치료 중 심한 피로와 메스꺼움으로 고생하던 환자분이 3주간의 입원 치료를 통해 증상이 크게 개선되었습니다. 자율신경 안정화를 중심으로 한 통합 치료가 주효했습니다.',
  'https://images.unsplash.com/photo-1579154341665-9c0c4e14e96b?w=800',
  '항암 중·후 회복',
  (select id from public.profiles where role = 'admin' limit 1)
);
```

---

## 7. 확인 사항

### ✅ 체크리스트:

- [ ] profiles 테이블이 생성되었는가?
- [ ] cases 테이블이 생성되었는가?
- [ ] RLS 정책이 모두 활성화되었는가?
- [ ] 트리거가 정상 작동하는가? (회원가입 테스트)
- [ ] 관리자 계정이 설정되었는가?
- [ ] 인덱스가 생성되었는가?

### 테스트 방법:

1. **회원가입 테스트**:
   - 웹앱에서 새 계정 생성
   - Supabase → Table Editor → profiles에서 자동 생성 확인

2. **로그인 테스트**:
   - 생성한 계정으로 로그인
   - 치료사례 페이지 접근 (읽기 권한)

3. **관리자 권한 테스트**:
   - 관리자 계정으로 로그인
   - `/admin` 페이지 접근
   - 치료사례 작성/수정/삭제

---

## 8. 구글 로그인 설정 (선택사항)

Supabase 대시보드에서 구글 OAuth 설정:

1. **Authentication → Providers → Google 활성화**
2. **Google Cloud Console에서 OAuth 2.0 클라이언트 ID 생성**:
   - 승인된 리디렉션 URI: `https://[PROJECT_ID].supabase.co/auth/v1/callback`
3. **Client ID와 Client Secret을 Supabase에 입력**

자세한 가이드: https://supabase.com/docs/guides/auth/social-login/auth-google

---

## 9. 문제 해결

### profiles 테이블에 자동 생성 안 됨
- 트리거가 제대로 설정되었는지 확인
- `select * from pg_trigger where tgname = 'on_auth_user_created';`

### RLS 정책 오류
- `select * from pg_policies where schemaname = 'public';` 로 정책 확인
- 정책 삭제 후 재생성

### 관리자 권한 안 먹힘
- profiles 테이블에서 role이 정확히 'admin'인지 확인 (소문자)
- 로그아웃 후 재로그인

---

## 10. 백업 및 복구

### 테이블 백업 (SQL Editor에서):
```sql
-- profiles 백업
copy (select * from public.profiles) to '/tmp/profiles_backup.csv' with csv header;

-- cases 백업
copy (select * from public.cases) to '/tmp/cases_backup.csv' with csv header;
```

### 테이블 삭제 (주의!):
```sql
-- 모든 데이터 삭제 (복구 불가)
drop table public.cases;
drop table public.profiles;
drop function public.handle_new_user();
```

---

## 완료! 🎉

이제 Supabase 기반 회원 시스템과 치료사례 CMS가 완성되었습니다.

### 다음 단계:
1. 웹앱에서 회원가입 테스트
2. 관리자 권한 설정
3. 치료사례 작성/관리
4. 추가 기능 확장 (상담 예약, 건강검진 등)
