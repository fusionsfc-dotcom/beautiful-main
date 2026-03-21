# 🔧 Supabase 설정 단계별 가이드

## 📌 프로젝트 정보

```
프로젝트 ID: pzivoxyngofrrpdjramu
Supabase URL: https://pzivoxyngofrrpdjramu.supabase.co
```

---

## 1️⃣ Supabase 대시보드 접속

### 방법 1: 직접 URL 접속
```
https://supabase.com/dashboard/project/pzivoxyngofrrpdjramu
```

### 방법 2: Supabase 홈에서
1. https://app.supabase.com 접속
2. 프로젝트 목록에서 `pzivoxyngofrrpdjramu` 선택

---

## 2️⃣ SQL Editor 열기

1. 좌측 사이드바에서 **"SQL Editor"** 클릭
2. 우측 상단 **"New query"** 버튼 클릭

---

## 3️⃣ Step 1: profiles 테이블 생성

### 📋 아래 SQL을 복사해서 SQL Editor에 붙여넣고 **"Run"** 버튼 클릭:

```sql
-- Step 1: profiles 테이블 생성
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS 활성화
alter table public.profiles enable row level security;

-- 정책 1: 본인 프로필 읽기
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- 정책 2: 본인 프로필 수정
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
```

### ✅ 확인 방법:
1. 좌측 사이드바 **"Table Editor"** 클릭
2. `profiles` 테이블이 보이는지 확인

---

## 4️⃣ Step 2: cases 테이블 생성

### 📋 새로운 쿼리 창을 열고 아래 SQL 실행:

```sql
-- Step 2: cases 테이블 생성
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

-- 정책 1: 로그인 사용자 읽기
create policy "Authenticated users can read cases"
  on public.cases for select
  to authenticated
  using (true);

-- 정책 2: 관리자만 작성
create policy "Admins can insert cases"
  on public.cases for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 정책 3: 관리자만 수정
create policy "Admins can update cases"
  on public.cases for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 정책 4: 관리자만 삭제
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

### ✅ 확인 방법:
1. **Table Editor**에서 `cases` 테이블 확인
2. 컬럼: id, title, content, thumbnail, category, created_at, author_id

---

## 5️⃣ Step 3: 자동 프로필 생성 트리거

### 📋 새로운 쿼리 창에서 아래 SQL 실행:

```sql
-- Step 3: 회원가입 시 자동으로 profiles 테이블에 레코드 생성
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

### ✅ 확인 방법:
SQL Editor에서 실행:
```sql
select * from pg_trigger where tgname = 'on_auth_user_created';
```
결과가 1개 행으로 나오면 성공!

---

## 6️⃣ Step 4: 인덱스 생성 (성능 최적화)

### 📋 아래 SQL 실행:

```sql
-- Step 4: 인덱스 생성
create index profiles_email_idx on public.profiles(email);
create index profiles_role_idx on public.profiles(role);
create index cases_category_idx on public.cases(category);
create index cases_created_at_idx on public.cases(created_at desc);
create index cases_author_id_idx on public.cases(author_id);
```

### ✅ 확인 방법:
```sql
select tablename, indexname from pg_indexes 
where schemaname = 'public' 
order by tablename, indexname;
```

---

## 7️⃣ Step 5: 테스트 - 관리자 계정 생성

### 🔹 방법 A: 웹앱에서 회원가입 먼저 하기 (권장)

1. **웹앱 실행** (개발 서버가 실행 중이어야 함)
2. **"로그인"** 버튼 클릭
3. **"회원가입"** 탭으로 전환
4. 아래 정보로 회원가입:
   ```
   이름: 관리자
   이메일: admin@beautiful.com
   비밀번호: admin1234!
   ```

5. **Supabase 대시보드** → **Table Editor** → **profiles** 테이블에서 확인
   - 자동으로 레코드가 생성되었는지 확인

6. **SQL Editor**에서 관리자 권한 부여:
   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'admin@beautiful.com';
   ```

7. **확인**:
   ```sql
   select id, email, role from public.profiles 
   where email = 'admin@beautiful.com';
   ```
   → role이 'admin'으로 변경되었는지 확인

---

### 🔹 방법 B: 직접 Supabase에서 사용자 생성

1. **Supabase 대시보드** → **Authentication** → **Users**
2. **"Add user"** 버튼 클릭
3. 이메일: `admin@beautiful.com`, 비밀번호 설정
4. **"Create user"** 클릭
5. 생성된 사용자의 **UID 복사**

6. **SQL Editor**에서 profiles 테이블에 수동 추가:
   ```sql
   insert into public.profiles (id, email, role)
   values (
     '[복사한 UID]',
     'admin@beautiful.com',
     'admin'
   );
   ```

---

## 8️⃣ 최종 확인 체크리스트

### ✅ 테이블 확인
```sql
-- 모든 테이블 목록
select tablename from pg_tables 
where schemaname = 'public' 
order by tablename;
```
결과: `cases`, `profiles` 2개 테이블

### ✅ RLS 정책 확인
```sql
-- 모든 정책 확인
select schemaname, tablename, policyname 
from pg_policies 
where schemaname = 'public';
```
결과: 총 6개 정책

### ✅ 트리거 확인
```sql
select tgname, tgrelid::regclass as table_name
from pg_trigger
where tgname = 'on_auth_user_created';
```
결과: 1개 트리거

### ✅ 관리자 계정 확인
```sql
select id, email, role, created_at 
from public.profiles
where role = 'admin';
```
결과: admin@beautiful.com (또는 설정한 이메일)

---

## 9️⃣ 테스트 데이터 삽입 (선택사항)

관리자 계정으로 웹앱에서 직접 작성하거나, SQL로 직접 삽입:

```sql
-- 테스트용 치료사례 1개
insert into public.cases (title, content, thumbnail, category, author_id)
values (
  '유방암 환자의 3주 입원 치료 경험',
  '항암 치료 부작용으로 고통받던 환자가 자율신경 안정화 치료를 통해 증상이 개선된 사례입니다. 3주간의 입원 치료 동안 식욕 회복, 수면 개선, 피로 감소 등의 긍정적 변화가 있었습니다.',
  'https://images.unsplash.com/photo-1579154341665-9c0c4e14e96b?w=800',
  '항암 중·후 회복',
  (select id from public.profiles where role = 'admin' limit 1)
);

-- 확인
select id, title, category, created_at 
from public.cases;
```

---

## 🎉 완료!

### 다음 단계:
1. ✅ 웹앱 재시작 (이미 실행 중이면 새로고침)
2. ✅ 관리자 계정으로 로그인
3. ✅ 우측 상단 사용자 메뉴 → "관리자 페이지" 클릭
4. ✅ `/admin` 페이지에서 치료사례 작성
5. ✅ `/cases` 페이지에서 확인

---

## 🐛 문제 발생 시

### 문제 1: "relation already exists" 오류
**원인**: 테이블이 이미 존재함
**해결**: 
```sql
-- 테이블 삭제 후 재생성
drop table if exists public.cases cascade;
drop table if exists public.profiles cascade;
-- 그리고 처음부터 다시 실행
```

### 문제 2: 트리거가 작동하지 않음
**확인**:
```sql
select * from pg_trigger where tgname = 'on_auth_user_created';
```
**재생성**:
```sql
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
-- 그리고 Step 3 다시 실행
```

### 문제 3: RLS 정책 오류
**확인**:
```sql
select * from pg_policies where schemaname = 'public';
```
**정책 삭제**:
```sql
drop policy if exists "Users can read own profile" on public.profiles;
-- 다른 정책들도 동일하게 삭제 후 재생성
```

---

## 💡 다음 작업

설정이 완료되면 알려주세요!
그러면 다음 단계로 진행하겠습니다:
1. 웹앱에서 실제 로그인/회원가입 테스트
2. 치료사례 작성/조회 테스트
3. 추가 기능 구현 (상담 예약, 건강검진 등)
