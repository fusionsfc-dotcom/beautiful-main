-- faqs 테이블 생성 (자주하는 질문)
create table public.faqs (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  answer text not null,
  category text not null check (category in (
    'cancer',
    'gynecologic_cancer',
    'gastro_cancer',
    'lung_cancer',
    'liver_cancer',
    'other_cancer'
  )),
  author_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 테이블 권한 부여 (anon: 읽기, authenticated: 전체)
grant select on public.faqs to anon;
grant select, insert, update, delete on public.faqs to authenticated;

-- RLS 활성화
alter table public.faqs enable row level security;

-- 정책: 누구나 읽기 가능 (공개 FAQ)
create policy "Anyone can read faqs"
  on public.faqs for select
  using (true);

-- 정책: 관리자만 작성 가능
create policy "Admins can insert faqs"
  on public.faqs for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 정책: 관리자만 수정 가능
create policy "Admins can update faqs"
  on public.faqs for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 정책: 관리자만 삭제 가능
create policy "Admins can delete faqs"
  on public.faqs for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 인덱스 생성 (성능 최적화)
create index faqs_category_idx on public.faqs(category);
create index faqs_created_at_idx on public.faqs(created_at desc);
create index faqs_author_id_idx on public.faqs(author_id);
