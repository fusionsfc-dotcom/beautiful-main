현재 Edge Function에서 JWT 검증이 실패하고 있으며 "Invalid JWT" 오류가 발생하고 있다.

클라이언트는 JWT를 Authorization Header로 정상 전달하고 있다.

현재 요청 구조:

Authorization: Bearer USER_JWT
apikey: ANON_KEY

하지만 Edge Function 코드가 JWT를 Query Parameter에서 읽고 있을 가능성이 있다.

다음과 같이 코드를 수정하라.

1️⃣ Query Parameter 기반 JWT 로직 제거

삭제:

```ts
const token = url.searchParams.get("token")
```

JWT를 URL에서 읽는 모든 코드를 제거한다.

2️⃣ Authorization Header에서 JWT 추출

다음 코드로 변경한다.

```ts
const authHeader = req.headers.get("Authorization")

if (!authHeader) {
  return new Response(
    JSON.stringify({
      code: 401,
      message: "Missing authorization header"
    }),
    { status: 401 }
  )
}

const token = authHeader.replace("Bearer ", "")
```

3️⃣ JWT 검증

기존 supabaseAnon 클라이언트를 사용하여 다음과 같이 검증한다.

```ts
const { data: { user }, error } = await supabaseAnon.auth.getUser(token)
```

error가 있으면 401 반환한다.

4️⃣ 관리자 권한 확인

JWT 검증 후 user.email 또는 profiles.role로 admin 여부를 확인한다.

5️⃣ 공지사항 저장

관리자 확인 후 SERVICE_ROLE_KEY 클라이언트로 notices 테이블에 insert 한다.

최종 인증 흐름은 다음과 같다.

Authorization Header → JWT 추출 → supabaseAnon.auth.getUser() → a
