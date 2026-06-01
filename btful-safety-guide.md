# btful.co.kr GEO 작업 - 운영 안전 가이드

> **이 문서를 btful-geo-optimization.md 작업 지시서와 함께 클로드코드에 던져주세요.**
> 
> **이 가이드의 모든 안전 장치를 먼저 세팅한 후에 Step 0를 시작합니다.**

---

## ⚠️ 절대 원칙 (NEVER DO)

클로드코드는 다음을 절대로 하지 않습니다:

1. **main 브랜치에 직접 commit/push 하지 않는다**
2. **사용자 확인 없이 main에 PR을 머지하지 않는다**
3. **기존 Supabase 테이블의 스키마를 변경하지 않는다**
4. **기존 Supabase 데이터를 UPDATE/DELETE 하지 않는다**
5. **Vercel 환경변수를 임의로 변경하지 않는다**
6. **vercel.json, package.json의 production 스크립트를 검증 없이 변경하지 않는다**
7. **node_modules, .env, dist를 커밋하지 않는다**

위 원칙 중 하나라도 필요한 상황이 오면 → **반드시 사용자에게 보고하고 승인 받기**.

---

## 🛡️ 안전 장치 사전 세팅 (Step 0 이전)

### Safety Step 1: GitHub 백업

```bash
# 현재 main 상태 확인
git status
git checkout main
git pull origin main

# 백업 브랜치 생성 (날짜 표기)
git checkout -b backup/pre-geo-$(date +%Y-%m-%d)
git push origin backup/pre-geo-$(date +%Y-%m-%d)

# 작업 브랜치 생성
git checkout main
git checkout -b feature/geo-optimization
git push -u origin feature/geo-optimization
```

✅ 검증: GitHub에 backup/pre-geo-... 브랜치 보임 + feature/geo-optimization 브랜치 활성

### Safety Step 2: Vercel 현재 배포 기록

사용자가 Vercel Dashboard에서 다음을 확인하고 메모:

- 현재 Production 배포 ID
- 현재 Production 배포 URL (commit hash 포함)
- Domains 탭에서 btful.co.kr이 어느 배포에 매핑됐는지

문제 발생 시 1분 안에 롤백할 수 있도록 준비.

✅ 검증: 사용자가 현재 production 배포 ID를 메모함

### Safety Step 3: Supabase 백업 + 새 환경 검토

```
사용자에게 안내:

1. Supabase Dashboard → Database → Backups
2. "Create manual backup" 클릭 (이름: pre-geo-2026-04-26)
3. 백업 완료 확인

추가 권장 (선택):
- Supabase Dashboard → SQL Editor에서 다음 실행:

-- 현재 테이블 목록 확인
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 결과를 .docs/supabase-tables-pre-geo.md 에 저장

이 목록이 작업 후 비교 기준점.
```

✅ 검증: Supabase manual backup 생성 완료

### Safety Step 4: 환경 분리 확인

```
.env 파일 확인:
- 개발용(.env.local 또는 .env)
- 프로덕션 (Vercel 환경변수)

작업 중 사용할 환경변수가 .env.local에만 있어야 함.
.gitignore에 .env*가 포함되어 있는지 확인.

만약 작업 중 새 환경변수 추가가 필요하면:
1. .env.local 에 추가
2. .env.example 에 키만 추가 (값 없이)
3. Vercel 환경변수는 사용자가 수동으로 추가하도록 안내
```

✅ 검증: .gitignore에 .env* 포함됨

### Safety Step 5: 프리뷰 배포 테스트

```bash
# feature 브랜치에 빈 커밋 하나 만들어서 Vercel 프리뷰 작동 확인
git commit --allow-empty -m "test: verify vercel preview build"
git push origin feature/geo-optimization

# Vercel Dashboard에서 새 프리뷰 배포 빌드 확인
# Preview URL 메모: btful-git-feature-geo-optimization-...vercel.app
```

✅ 검증: 
- feature 브랜치 push 시 Vercel 자동 프리뷰 빌드 발생
- 프리뷰 URL 접속 시 현재 사이트와 동일하게 작동

---

## 🚦 작업 중 안전 워크플로우

### 모든 변경의 표준 흐름

```
1. feature 브랜치에서 작업
2. 로컬에서 npm run dev 동작 확인
3. 로컬에서 npm run build 성공 확인
4. git commit (의미 있는 메시지)
5. git push origin feature/geo-optimization
6. Vercel 프리뷰 빌드 자동 시작 → 성공 확인
7. 프리뷰 URL에서 동작 확인
8. 사용자에게 보고 → 승인
9. 다음 Step으로 진행
```

### main 머지는 모든 Step 완료 후

```
모든 Step 검증 완료된 후에만:

1. PR 생성 (feature/geo-optimization → main)
2. PR 설명에 변경사항 + 테스트 결과 + 롤백 방법 명시
3. 사용자가 PR 검토 후 직접 머지
4. main 자동 배포 시작
5. 배포 후 즉시 https://btful.co.kr 동작 확인 (10분 이내)
6. 문제 없으면 backup 브랜치는 1주일 후 삭제

문제 발생 시:
- Vercel Dashboard → Deployments → 이전 배포 "Promote to Production"
- 1분 안에 롤백 완료
```

---

## 🔍 위험 작업 체크리스트

다음 작업은 특히 주의:

### Vite 설정 변경
- vite.config.ts 변경 시 → 로컬 빌드 → 프리뷰 빌드 → 프리뷰 URL 검증 → main
- prerender 도입 시 빌드 시간이 늘어날 수 있음 → Vercel 빌드 timeout 확인

### vercel.json 변경
- rewrites/redirects 변경은 매우 위험 (라우팅 깨짐)
- 변경 전 현재 vercel.json을 docs/ 에 백업 저장
- 프리뷰 URL에서 모든 라우트 한 번씩 클릭 테스트

### package.json 변경
- 새 패키지 추가는 안전
- 기존 패키지 버전 변경은 신중 (특히 react, vite, supabase 관련)
- "scripts" 섹션의 build/start 명령어 변경은 사용자 확인 필수

### Supabase 마이그레이션
- 새 테이블 추가만 허용
- 기존 테이블 ALTER는 사용자 승인 필수
- 마이그레이션 SQL을 먼저 보여주고 사용자가 직접 실행

---

## 🚨 긴급 상황 대응

### 시나리오 1: 프리뷰 빌드 실패
```
대응: feature 브랜치에서 즉시 수정. 프로덕션은 영향 없음.
보고: "프리뷰 빌드 실패. 원인: ..., 수정 중"
```

### 시나리오 2: main 머지 후 사이트 다운
```
즉시 조치:
1. Vercel Dashboard → Deployments
2. 이전 정상 배포의 "..." → "Promote to Production"
3. 1분 안에 복구

이후:
4. 사용자에게 즉시 보고
5. feature 브랜치에서 원인 파악
6. 재시도는 신중히
```

### 시나리오 3: Supabase 새 테이블 생성 후 RLS 문제
```
대응:
1. 새 테이블 즉시 DROP (기존 데이터 영향 없음)
2. RLS 정책 재설계
3. 다시 생성

새 테이블만 건드리는 한 기존 시스템 영향 없음.
```

### 시나리오 4: 잘못된 커밋이 main에 머지됨
```
대응:
1. git revert <bad-commit-hash> on main
2. push → Vercel 자동 재배포
또는:
1. Vercel에서 이전 배포로 즉시 롤백 (더 빠름)
2. 그 후 git revert로 코드 정리
```

---

## ✅ 작업 시작 전 최종 체크리스트

Step 0 시작 전 사용자가 직접 확인:

- [ ] backup/pre-geo-* 브랜치 GitHub에 push됨
- [ ] feature/geo-optimization 브랜치에서 작업 중
- [ ] Vercel 현재 production 배포 ID 메모됨
- [ ] Vercel 프리뷰 빌드 정상 동작 확인됨
- [ ] Supabase manual backup 생성됨
- [ ] .env.local 파일 분리, .gitignore에 .env* 포함됨
- [ ] 사용자에게 알릴 변경사항 리스트 (Vercel 환경변수, Supabase SQL 등)

위 모두 ✅ 완료 후 → btful-geo-optimization.md 의 Step 0 진행

---

## 📋 단계별 보고 형식

각 Step 끝날 때 클로드코드는 다음 형식으로 보고:

```markdown
## Step N 완료 보고

### 변경된 파일
- src/...  (목적: ...)
- ...

### 새로 추가된 파일
- scripts/...
- ...

### 외부 영향
- Supabase: 테이블 N개 추가 (스키마: ...)
- Vercel: 환경변수 추가 필요 [있다면]
- 기타: ...

### 프리뷰 URL 검증 결과
- 빌드 성공: ✅
- 라우팅 정상: ✅
- 콘텐츠 정상: ✅
- 콘솔 에러: 없음 / [있다면 명시]

### 위험 평가
- 프로덕션 영향: 없음 (feature 브랜치 작업)
- 롤백 가능성: ✅ (커밋 hash: ...)

### 사용자 액션 요청
- [필요한 경우만] Supabase에서 다음 SQL 실행해주세요: ...
- [필요한 경우만] Vercel에 환경변수 추가해주세요: ...

### 다음 Step
Step N+1 진행 가능합니다. 승인 부탁드립니다.
```

---

**이 가이드라인이 모든 Step에 적용됩니다.**
**작업 시작: Safety Step 1~5 완료 후 → btful-geo-optimization.md의 Step 0**
