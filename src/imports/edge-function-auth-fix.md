프로젝트의 Edge Function에서 관리자 권한 확인 방식이 잘못 구현되어 있다.

현재 admin 권한 확인이 다음과 같이 이메일 하드코딩 방식으로 되어 있다.

```ts
const isAdmin = user.email === 'admin@beautiful.com'
```

이 방식은 확장성이 없고 보안 구조에도 맞지 않는다.
Supabase의 표준 구조는 `profiles` 테이블의 `role` 컬럼을 사용하여 권한을 확인해야 한다.

따라서 다음과 같이 시스템을 수정하라.

---

1️⃣ profiles 기반 권한 구조로 변경

admin 여부를 이메일이 아니라 profiles.role로 확인하도록 수정한다.

```ts
const { data: profile, error } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()

if (!profile || profile.role !== 'admin') {
  return c.json({ error: 'Admin access required' }, 403)
}
```

---

2️⃣ profiles 테이블 RLS 정책 수정

현재 RLS 때문에 Edge Function에서 profiles 조회가 차단되고 있다.

Supabase SQL Editor에서 아래 정책을 추가한다.

```sql
create policy "service role full access profiles"
on profiles
for all
to service_role
using (true);
```

이 정책은 Edge Function에서 사용하는 SERVICE_ROLE_KEY가
profiles 테이블을 조회할 수 있도록 허용한다.

---

3️⃣ Edge Function 권한 구조 정리

Edge Function에서 Supabase 클라이언트는 두 개를 사용한다.

JWT 검증용:

```ts
const supabaseAnon = createClient(SUPABASE_URL, ANON_KEY)
```

데이터베이스 접근용:

```ts
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
```

구조는 다음과 같이 유지한다.

JWT 검증

```ts
const { data: { user }, error } = await supabaseAnon.auth.getUser(token)
```

관리자 권한 확인

```ts
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()
```

공지사항 저장

```ts
await supabase
  .from('notices')
  .insert({
    title,
    content,
    author_id: user.id
  })
```

---

4️⃣ 이메일 하드코딩 로직 제거

다음 코드를 프로젝트 전체에서 삭제한다.

```ts
user.email === 'admin@beautiful.com'
```

admin 권한 판단은 오직 `profiles.role` 값으로만 판단한다.

---

5️⃣ 수정 대상 API

다음 모든 API에서 동일한 권한 구조를 적용한다.

POST /cases
PUT /cases/:id
DELETE /cases/:id

POST /notices
PUT /notices/:id
DELETE /notices/:id

---

6️⃣ 최종 목표

JWT 인증 → profiles.role 조회 → admin 확인 → 데이터 저장

이 구조로 시스템을 수정한다.

Edge Function은 이메일 기반 권한 체크가 아니라
Supabase 권한 구조를 따르는 방식으로 재구성해야 한다.
