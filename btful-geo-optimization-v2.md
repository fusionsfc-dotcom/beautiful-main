# btful.co.kr GEO 최적화 작업 지시서 v2

> **이 파일을 클로드코드에 던지고 시작하세요.**
> 
> **사전 조건**:
> 1. `CLAUDE.md` 파일이 프로젝트 루트에 있어야 함 (사이트 컨텍스트 참조)
> 2. `btful-safety-guide.md`의 Safety Step 1~5가 모두 완료되어 있어야 함
> 3. `feature/geo-optimization` 브랜치에서 작업 중이어야 함

---

## 작업 시작 전 안내

**클로드코드에게**:

1. 먼저 `CLAUDE.md`를 읽고 사이트 전체 구조를 파악해줘
2. `btful-safety-guide.md`의 절대 원칙을 모두 숙지해줘
3. 그 다음 이 문서의 Step 0부터 단계별로 진행
4. 각 Step 완료 시 정해진 보고 형식으로 사용자에게 보고

---

## 핵심 진단 (CLAUDE.md 분석 결과)

### 이미 잘 적용된 것 (재구현 금지)

- ✅ `react-helmet-async 3.0.0` 설치되어 있음
- ✅ `SEOHead` 컴포넌트가 페이지별 동적 메타 처리 중 (`/src/components/seo/SEOHead.tsx`)
- ✅ Hospital JSON-LD 스키마 (`index.html`)
- ✅ FAQPage 스키마 11개 Q&A
- ✅ Open Graph, Twitter Card, Canonical, Robots
- ✅ 구글·네이버 사이트 인증

→ 이 작업들은 **확장**하되 **재작성하지 않음**.

### 가장 큰 미해결 문제

⚠️ **SPA 구조로 인한 JS 렌더링 의존성**

JSON-LD가 `index.html`에 정적으로 있어도, 페이지별 메타 태그와 콘텐츠는 React 렌더링 후에야 나타남.
→ AI 크롤러(ClaudeBot, GPTBot, PerplexityBot)는 거의 빈 페이지를 봄.
→ **이게 핵심 작업.**

### CLAUDE.md가 식별한 미적용 AIO 항목

CLAUDE.md 12번 섹션의 "개선 필요 항목"이 이번 작업의 To-do 리스트:

- [ ] `MedicalCondition` / `MedicalProcedure` / `MedicalSpecialty` JSON-LD
- [ ] `BreadcrumbList` 구조화 데이터
- [ ] `LocalBusiness` + `MedicalBusiness` 스키마 강화
- [ ] 각 클리닉 페이지별 독립 FAQ 스키마
- [ ] 콘텐츠 E-E-A-T 강화 (의료진 프로필 구조화)
- [ ] sitemap.xml 자동 생성
- [ ] robots.txt 최적화
- [ ] Core Web Vitals 최적화
- [ ] AI Overview 타겟 콘텐츠 구조화
- [ ] Perplexity/ChatGPT 인용 최적화

---

## 페이지별 처리 정책 (매우 중요)

CLAUDE.md 3번 섹션의 라우트 구조 기준으로 **각 페이지를 어떻게 처리할지** 명확히 정의:

### A. Prerender 대상 (정적 HTML 생성)

| 라우트 | 페이지 | 비고 |
|--------|--------|------|
| `/` | 홈 | 핵심 페이지 |
| `/clinics` | 클리닉 목록 | 5개 클리닉 카드 |
| `/clinics/:id` | 클리닉 상세 (10개) | 동적 prerender — 빌드 시점에 5개 클리닉 + 5개 암별 집중케어 ID로 생성 |
| `/facilities` | 치료환경 | |
| `/about` | 병원소개 | 의료진 정보 포함 (E-E-A-T 핵심) |
| `/columns` | 뷰티풀이야기 (콘텐츠 허브) | 정적 + 클라이언트 fetch 혼합 |
| `/cases` | 치료사례 | 정적 + 클라이언트 fetch 혼합 |
| `/health-check` | 3분 건강 체크 | 인터랙티브이지만 페이지 자체는 정적 |
| `/reservation` | 예약·상담 | 폼 페이지, 정적 prerender 가능 |

### B. Prerender 절대 금지

| 라우트 | 이유 |
|--------|------|
| `/my-consultations` | 로그인 필요, 개인 정보 |
| `/my-results` | 로그인 필요, 의료 정보 |
| `/my-reports` | 로그인 필요, 의료 정보 |
| `/admin` | 관리자 권한, 절대 노출 금지 |

→ 이 페이지들은 SPA 그대로 유지. `robots.txt`에 `Disallow` 추가도 검토.

### C. 클리닉 상세 (`/clinics/:id`) 처리 전략

CLAUDE.md 4번 섹션 기준 10개 페이지:

```
정적 prerender 대상 (10개):
- /clinics/cancer-care        뷰티풀 암케어
- /clinics/breast-cancer      유방암 집중케어
- /clinics/gynecologic-cancer 부인암 집중케어
- /clinics/gastric-cancer     위암 집중케어
- /clinics/lung-cancer        폐암 집중케어
- /clinics/liver-cancer       간암 집중케어
- /clinics/post-surgery       수술 후 회복케어
- /clinics/chemotherapy       항암치료 환자 케어
- /clinics/radiotherapy       방사선치료 환자 케어
- (기타 1개 — 실제 ID 확인 필요)
```

⚠️ **클로드코드 작업 시 주의**: 
실제 라우트 ID는 `/src/app/routes.tsx` 또는 Supabase의 `clinics` 테이블(있다면)에서 확인 후 사용. 
임의로 ID 만들지 말 것.

---

# Step 0: 측정 시스템 구축 (Before 데이터 수집)

> **목적**: prerender 적용 전 baseline 데이터 박제
> **기존 v1 지시서와 동일하지만, 쿼리 목록만 CLAUDE.md 기반으로 업그레이드**

## 0-1 ~ 0-3. 이전 v1 작업 지시서와 동일

(디렉토리 생성, .env 설정, Supabase 테이블 생성)

## 0-4. 쿼리 목록 (업그레이드)

CLAUDE.md 1, 4, 5번 섹션 기반으로 정확한 쿼리 작성:

```typescript
// scripts/geo-monitoring/queries.ts

export const QUERIES = [
  // === Location: 국립암센터 + 파주/고양/일산/경기 북부 ===
  { 
    text: "국립암센터 근처 한방 암 요양병원 추천", 
    category: "location",
    primary: true 
  },
  { 
    text: "파주 암 요양병원 어디가 좋아", 
    category: "location",
    primary: true 
  },
  { 
    text: "일산 고양 근처 암 면역 회복 한방병원", 
    category: "location",
    primary: true 
  },
  { 
    text: "경기 북부 암환자 한방 보조치료", 
    category: "location" 
  },
  { 
    text: "국립암센터 환자 한방 입원 가능한 곳", 
    category: "location" 
  },

  // === Treatment: 통합 암 면역 회복 (CLAUDE.md 1번 핵심 포지셔닝) ===
  { 
    text: "통합 암 면역 회복 한방치료", 
    category: "treatment",
    primary: true 
  },
  { 
    text: "암 환자 한방 면역 치료 어디", 
    category: "treatment" 
  },
  { 
    text: "수술 후 한방으로 회복하기 좋은 병원", 
    category: "treatment" 
  },
  { 
    text: "항암치료 부작용 한방으로 관리", 
    category: "treatment" 
  },
  { 
    text: "방사선치료 후 한방 면역 회복", 
    category: "treatment" 
  },

  // === Cancer-specific: CLAUDE.md 4번 클리닉 5개 암종 ===
  { 
    text: "유방암 한방 보조치료 면역 회복", 
    category: "condition" 
  },
  { 
    text: "부인암 한방치료 어디가 좋나요", 
    category: "condition" 
  },
  { 
    text: "위암 수술 후 한방 회복 병원", 
    category: "condition" 
  },
  { 
    text: "폐암 환자 한방 면역 치료", 
    category: "condition" 
  },
  { 
    text: "간암 환자 한방 보조치료", 
    category: "condition" 
  },

  // === General: 한방 암 치료 일반 ===
  { 
    text: "한방으로 암 치료 효과 있나요", 
    category: "general" 
  },
  { 
    text: "암 환자 한방병원 어떻게 고르나요", 
    category: "general" 
  },
  { 
    text: "암 요양병원과 한방병원 차이", 
    category: "general" 
  },

  // === Brand: 직접 검색 ===
  { 
    text: "뷰티풀한방병원 어떤 곳", 
    category: "brand" 
  },
  { 
    text: "이형석 원장 한방 암치료", 
    category: "brand" 
  },
] as const;

export const TARGET_HOSPITAL = {
  name: "뷰티풀한방병원",
  aliases: ["뷰티풀 한방병원", "뷰티풀한방", "btful"],
  domain: "btful.co.kr",
  director: "이형석",
};
```

## 0-5 ~ 0-9. 이전 v1 작업 지시서와 동일

---

# Step 1: 현재 상태 정밀 진단

> **목적**: CLAUDE.md 기반으로 실제 구현 상태와 문서가 일치하는지 확인 + 갭 분석
> **소요 시간**: 1~2시간

## 1-1. CLAUDE.md vs 실제 코드 일치 검증

```
다음 항목들이 CLAUDE.md 문서와 실제 코드에서 일치하는지 확인:

1. 라우팅
   - /src/app/routes.tsx (또는 라우터 정의 파일) 확인
   - CLAUDE.md 3번 섹션의 13개 라우트가 모두 실제 존재하는지
   - 실제 클리닉 ID 목록 추출

2. SEOHead 컴포넌트 분석
   - /src/components/seo/SEOHead.tsx 코드 확인
   - 어떤 props를 받는지
   - JSON-LD를 동적으로 주입하는지 (이게 핵심)
   - 실제 prerender 시 정적 HTML에 포함되는지

3. index.html 검증
   - 현재 들어있는 JSON-LD 확인
   - Hospital schema가 정확한지 (CLAUDE.md 정보와 비교)
   - FAQPage 11개 Q&A 확인

4. Supabase 클라이언트 분석
   - /src/lib/supabase.ts 확인
   - 어떤 페이지가 런타임에 데이터를 가져오는지 매핑
   - clinics 데이터 소스가 코드 상수인지 DB인지 확인

결과를 docs/geo-diagnosis-v2.md 에 기록.
```

## 1-2. 빌드 후 콘텐츠 가시성 측정

```
1. npm run build
2. dist/ 디렉토리 스캔:
   - 각 라우트별 HTML 파일이 있는지 (없을 가능성 높음 — 단일 index.html)
   - dist/index.html의 <body> 안 텍스트 콘텐츠 길이
   - JSON-LD 정적 포함 여부

3. AI 크롤러 시뮬레이션:
   curl -A "ClaudeBot/1.0" file://$(pwd)/dist/index.html > /tmp/test.html
   
   실제로는:
   npm run preview &
   sleep 3
   curl http://localhost:4173/ > /tmp/home.html
   curl http://localhost:4173/clinics > /tmp/clinics.html
   curl http://localhost:4173/about > /tmp/about.html
   
   각 응답에서 본문 텍스트 길이 측정 → docs/geo-diagnosis-v2.md 기록
```

## 1-3. Prerender 도구 비교 및 선택

```
React 18 + Vite 6 + React Router 7 환경에서 현재 maintain되는 옵션:

A. @prerenderer/rollup-plugin + puppeteer
   - 장점: 활발한 maintain, headless browser로 정확한 렌더링
   - 단점: puppeteer 의존성, 빌드 시간 증가
   
B. vite-plugin-prerender
   - 장점: vite 네이티브, 가벼움
   - 단점: 복잡한 케이스 약함
   
C. vite-react-ssg
   - 장점: SSG 표준 접근
   - 단점: React Router 7 호환성 검증 필요

D. Vike (구 vite-plugin-ssr)
   - 장점: 가장 강력한 솔루션
   - 단점: 큰 마이그레이션 필요, 라우팅 재작성

E. vite-plugin-ssr-react 
   - 비교적 가벼운 SSR

추천: A (@prerenderer/rollup-plugin + puppeteer)
이유:
- React Router 7 호환성 안정적
- 동적 라우트 (/clinics/:id) 처리 쉬움
- 기존 코드 거의 안 건드림

→ 사용자에게 추천안 보고 후 승인 받기.
```

## 1-4. SEOHead 컴포넌트 활용 계획

```
기존 SEOHead 컴포넌트를 어떻게 활용할지 결정:

옵션 1: SEOHead를 그대로 두고, prerender 시 puppeteer가 React 렌더링 결과를 캡처
  → 가장 변경 적음. 기존 동작 유지.
  
옵션 2: SEOHead 외에 빌드 시점 정적 메타 주입 추가
  → 안전망 추가. 더 robust.

추천: 옵션 1 (현재 구조 유지) + Step 3에서 추가 schema만 주입
```

## ✅ Step 1 완료 검증 체크리스트

- [ ] CLAUDE.md vs 실제 코드 일치 확인 완료
- [ ] 클리닉 실제 ID 10개 추출됨
- [ ] 현재 빌드 결과의 콘텐츠 가시성 측정됨
- [ ] Prerender 도구 선택 완료
- [ ] docs/geo-diagnosis-v2.md 작성 완료

---

# Step 2: Prerender 도입 (재작성 — 실제 구조 반영)

> **소요 시간**: 4~8시간

## 2-1. 라이브러리 설치

```
선택된 도구 설치 (예: @prerenderer/rollup-plugin):

npm install --save-dev @prerenderer/rollup-plugin @prerenderer/renderer-puppeteer puppeteer
```

## 2-2. vite.config.ts 설정

```typescript
// 핵심 설정 예시 (실제 코드는 클로드코드가 환경에 맞게 작성)

import prerender from '@prerenderer/rollup-plugin';

export default defineConfig({
  plugins: [
    react(),
    // Prerender는 build 시에만
    process.env.NODE_ENV === 'production' && prerender({
      routes: [
        '/',
        '/clinics',
        // 클리닉 10개 동적 — 실제 ID는 routes.tsx에서 가져오기
        '/clinics/cancer-care',
        '/clinics/breast-cancer',
        '/clinics/gynecologic-cancer',
        '/clinics/gastric-cancer',
        '/clinics/lung-cancer',
        '/clinics/liver-cancer',
        '/clinics/post-surgery',
        '/clinics/chemotherapy',
        '/clinics/radiotherapy',
        '/facilities',
        '/about',
        '/columns',
        '/cases',
        '/health-check',
        '/reservation',
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 3000, // SEOHead가 적용될 시간 확보
        // 또는 renderAfterDocumentEvent 사용
      },
    }),
  ].filter(Boolean),
});
```

⚠️ **인증 페이지(/my-*, /admin)는 절대 prerender 목록에 추가하지 않음**

## 2-3. SEOHead 컴포넌트 prerender 호환성 확보

```
기존 SEOHead가 react-helmet-async를 사용하니까 prerender 시 자동 처리됨.
다만 다음 확인 필요:

1. 모든 페이지 컴포넌트가 SEOHead를 사용하고 있는지
2. 각 페이지의 메타 정보가 페이지마다 정확한지

페이지별 메타 매트릭스 (필요시 보강):

| 라우트 | title | description | keywords |
|--------|-------|-------------|----------|
| / | 뷰티풀한방병원 \| 국립암센터 인근 암요양병원 · 통합 암 면역 회복 | (기존) | 암요양병원, 국립암센터근처병원, 파주암요양병원 |
| /clinics | 클리닉 안내 \| 뷰티풀한방병원 통합 암 케어 | 5가지 클리닉... | 통합암케어, 한방암치료 |
| /clinics/breast-cancer | 유방암 집중케어 \| 뷰티풀한방병원 | 유방암 환자... | 유방암한방, 유방암면역 |
| /clinics/lung-cancer | 폐암 집중케어 \| 뷰티풀한방병원 | ... | ... |
| ... | ... | ... | ... |
| /about | 병원소개 · 이형석 원장 \| 뷰티풀한방병원 | ... | 이형석원장, 한방암치료 |
| /facilities | 치료환경 \| 뷰티풀한방병원 입원·치료공간 | ... | ... |
| /columns | 뷰티풀이야기 \| 암 한방치료 칼럼·영상·FAQ | ... | ... |
| /cases | 치료사례 \| 뷰티풀한방병원 | ... | ... |

각 페이지 컴포넌트의 SEOHead 호출에 위 정보 반영.
```

## 2-4. 클리닉 상세 페이지 (`/clinics/:id`) 동적 prerender

```
현재 ClinicDetail 컴포넌트가 어떻게 동작하는지 분석:

옵션 A: clinics 데이터가 코드 상수
  → 그대로 prerender. 가장 쉬움.

옵션 B: clinics 데이터가 Supabase
  → 옵션 B-1: 빌드 시점에 Supabase에서 fetch → 정적 데이터 파일 생성 → prerender
  → 옵션 B-2: 정적 props로 변환

권장:
1. clinics 데이터를 src/data/clinics.ts 같은 코드 상수로 추출 (있다면)
2. CLAUDE.md 4번 섹션 기준 5개 + 5개 = 10개 클리닉 정의
3. 각 클리닉마다:
   - 명칭, 설명, 주요 치료, 대상 환자, FAQ 5~10개
   - 관련 의료 정보 (의료광고법 준수)

이 데이터가 다음에 활용됨:
- prerender 시 정적 콘텐츠
- Step 3에서 MedicalProcedure JSON-LD
- /columns의 칼럼 콘텐츠와 cross-link
```

## 2-5. Supabase 의존 페이지 처리

```
CLAUDE.md 8번 섹션의 테이블별 사용 페이지 매핑:

- columns 테이블 → /columns 페이지의 "질환별 칼럼"
- faq 테이블 → /columns 페이지의 "FAQ"  
- videos 테이블 → /columns 페이지의 "영상 가이드"
- gallery_items 테이블 → /columns 페이지의 "뷰티풀갤러리"
- cases 테이블 → /cases 페이지

처리 전략 (옵션 B-1 권장 — 정적 prerender + 일부 동적):

방법:
1. 빌드 시점에 Supabase에서 published 콘텐츠 fetch
2. 정적 JSON으로 저장: dist/data/columns.json, dist/data/faq.json, ...
3. 페이지 컴포넌트는 빌드 시 정적 데이터 우선, 런타임 fresh data fallback
4. 새 글 작성 시 자동 재배포 (Vercel webhook + Supabase trigger 옵션)

이렇게 하면:
- AI 크롤러: 정적 HTML에서 모든 콘텐츠 봄 ✅
- 사용자: 최신 콘텐츠 봄 ✅
- 새 글: 자동 재빌드 ✅
```

## 2-6. vercel.json 설정

```json
{
  "rewrites": [
    // 정적 HTML 우선, SPA fallback
    {
      "source": "/((?!api|_next|static|.*\\..*).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/llms.txt",
      "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }]
    }
  ]
}
```

⚠️ 기존 vercel.json이 있다면 백업 후 변경. 변경 사항 주석 명시.

## 2-7. 빌드 검증

```bash
npm run build

# dist/ 검증
ls -la dist/
ls -la dist/clinics/

# 각 페이지 파일 존재 확인:
- dist/index.html
- dist/clinics/index.html
- dist/clinics/cancer-care/index.html
- dist/clinics/breast-cancer/index.html
- dist/clinics/lung-cancer/index.html
- ...
- dist/about/index.html
- dist/columns/index.html
- dist/cases/index.html

# 콘텐츠 가시성 확인:
curl http://localhost:4173/ | grep -c "통합 암 면역"
curl http://localhost:4173/clinics/lung-cancer | grep -c "폐암"
curl http://localhost:4173/about | grep -c "이형석"

# 인증 페이지는 prerender 안 됐는지 확인:
ls dist/my-consultations/ 2>&1 | grep "No such"  # 있으면 안 됨
```

## ✅ Step 2 완료 검증 체크리스트

- [ ] @prerenderer/rollup-plugin (또는 선택된 도구) 정상 작동
- [ ] 모든 prerender 대상 페이지 dist/에 HTML 생성
- [ ] /my-*, /admin 페이지는 prerender 안 됨 (보안)
- [ ] curl 테스트 시 핵심 키워드 모두 출력
- [ ] 각 페이지 SEOHead 메타 정확히 적용됨
- [ ] Vercel 프리뷰 빌드 성공
- [ ] 프리뷰 URL에서 모든 페이지 정상 동작

---

# Step 3: Schema.org JSON-LD 확장

> **CLAUDE.md 12번 섹션의 미적용 항목 모두 해결**
> **소요 시간**: 3~5시간

## 3-1. Schema 모듈 구조

```
src/lib/schema/
├── index.ts              # exports
├── organization.ts       # MedicalOrganization, Hospital, LocalBusiness
├── physician.ts          # Physician (이형석 원장 + 의료진)
├── procedures.ts         # MedicalProcedure (10개 클리닉별)
├── conditions.ts         # MedicalCondition (5개 암종)
├── specialties.ts        # MedicalSpecialty
├── faq.ts                # FAQPage (페이지별)
├── breadcrumb.ts         # BreadcrumbList 헬퍼
└── data/
    ├── hospital-info.ts  # 병원 기본 정보 상수 (CLAUDE.md 1번 기반)
    ├── physicians.ts     # 의료진 정보
    ├── clinics-data.ts   # 클리닉 10개 정보
    └── faq-data.ts       # FAQ 카테고리별
```

## 3-2. Hospital + LocalBusiness 강화

```typescript
// CLAUDE.md 1번 정보 기반 정확한 schema

export const HOSPITAL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["Hospital", "MedicalOrganization", "LocalBusiness"],
  "name": "뷰티풀한방병원",
  "alternateName": ["뷰티풀 한방병원", "Btful Hospital"],
  "url": "https://btful.co.kr",
  "telephone": "+82-31-945-2000",
  "faxNumber": "+82-31-944-1990",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "중양로 94-9",
    "addressLocality": "파주시",
    "addressRegion": "경기도",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    // 좌표는 사용자에게 확인 요청
    "latitude": null,
    "longitude": null
  },
  "openingHoursSpecification": [
    // CLAUDE.md 또는 사이트에서 확인된 운영시간
  ],
  "areaServed": [
    "파주시", "고양시", "일산", "경기도 북부"
  ],
  "medicalSpecialty": [
    "Oncology",       // 암 통합 케어
    "ComplementaryMedicine",
    "TraditionalKoreanMedicine"
  ],
  "availableService": [
    // 클리닉 10개를 MedicalProcedure 참조로
  ],
  "knowsAbout": [
    "통합 암 면역 회복",
    "한방 항암 보조치료",
    "수술 후 회복",
    "유방암", "부인암", "위암", "폐암", "간암"
  ],
  "description": "국립암센터 차량 15분 거리에 위치한 암요양 한방병원. 수술·항암·방사선 치료 후 면역과 체력 회복을 돕는 통합 암 케어 전문."
};
```

## 3-3. Physician schema (이형석 원장 + 의료진)

```typescript
// /about 페이지에 추가

export const DIRECTOR_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "이형석",
  "honorificPrefix": "원장",
  "jobTitle": "대표원장",
  "worksFor": { "@id": "https://btful.co.kr/#hospital" },
  "medicalSpecialty": "TraditionalKoreanMedicine",
  // 추가 필드는 사용자에게 확인 (학력, 자격, 임상경력)
  // E-E-A-T의 핵심
};

⚠️ 정확한 학력/자격/경력 정보는 사용자에게 확인 필수.
임의로 만들면 의료법 위반 가능성.
```

## 3-4. MedicalProcedure (클리닉 10개)

```typescript
// 각 클리닉을 MedicalProcedure로 정의

const CLINIC_PROCEDURES = [
  {
    "@type": "MedicalProcedure",
    "name": "뷰티풀 암케어 — 통합 암 면역 치료",
    "procedureType": "TherapeuticProcedure",
    "indication": [
      { "@type": "MedicalCondition", "name": "암 일반" }
    ],
    "howPerformed": "한방 면역 치료, 고주파 온열, 영양 관리, 운동 치료 통합",
    "url": "https://btful.co.kr/clinics/cancer-care",
    "performingOrganization": { "@id": "https://btful.co.kr/#hospital" }
  },
  // 9개 더...
];
```

## 3-5. MedicalCondition (5개 암종)

```typescript
// CLAUDE.md 4번의 5개 암종 + columns 카테고리 매칭

const CONDITIONS = [
  {
    "@type": "MedicalCondition",
    "name": "유방암",
    "alternateName": "Breast Cancer",
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "유방" },
    "possibleTreatment": [
      { "@id": "https://btful.co.kr/clinics/breast-cancer" }
    ]
  },
  // 부인암, 위암, 폐암, 간암 ...
];
```

## 3-6. FAQPage 확장 (페이지별 독립)

```
CLAUDE.md 12번 항목: "각 클리닉 페이지별 독립 FAQ 스키마"

현재: index.html에 11개 통합 FAQ
변경: 각 클리닉 상세 페이지에 해당 클리닉 관련 FAQ 5~7개씩 + 통합 FAQ는 /columns

데이터 소스:
- Supabase faq 테이블의 category로 매핑
- 빌드 시점에 fetch → 페이지별 정적 schema 생성
```

## 3-7. BreadcrumbList

```typescript
// 모든 페이지에 적용

// 예: /clinics/lung-cancer
const BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://btful.co.kr/" },
    { "@type": "ListItem", "position": 2, "name": "클리닉", "item": "https://btful.co.kr/clinics" },
    { "@type": "ListItem", "position": 3, "name": "폐암 집중케어", "item": "https://btful.co.kr/clinics/lung-cancer" }
  ]
};
```

## 3-8. Article schema (칼럼 콘텐츠)

```
/columns 페이지의 의료 칼럼들에 Article schema 추가:

{
  "@type": "MedicalWebPage",
  "headline": "...",
  "author": { "@type": "Person", "name": "이형석", ... },
  "datePublished": "...",
  "about": { "@type": "MedicalCondition", "name": "..." },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient" }
}

E-E-A-T의 핵심: 의료 콘텐츠의 저자/날짜/근거 명시.
```

## 3-9. 검증

```
빌드 후 모든 페이지의 JSON-LD 추출 → 다음으로 검증:

1. Schema.org Validator: https://validator.schema.org/
2. Google Rich Results Test: https://search.google.com/test/rich-results
3. 자체 스크립트: scripts/geo-monitoring/validate-schema.ts
   - 모든 페이지 fetch
   - JSON-LD 추출 및 파싱
   - 필수 필드 체크
```

## ✅ Step 3 완료 검증 체크리스트

- [ ] src/lib/schema/ 모듈 구조 완성
- [ ] Hospital + MedicalOrganization + LocalBusiness 통합
- [ ] Physician schema (이형석 원장) 정확한 정보로 작성
- [ ] 10개 클리닉 MedicalProcedure 작성
- [ ] 5개 암종 MedicalCondition 작성
- [ ] BreadcrumbList 모든 페이지 적용
- [ ] 페이지별 독립 FAQPage 적용
- [ ] /columns 글에 Article/MedicalWebPage 적용
- [ ] Schema.org Validator 모두 통과
- [ ] Google Rich Results Test 모두 통과

---

# Step 4: llms.txt + sitemap.xml + robots.txt 최적화

> **CLAUDE.md 12번 항목: sitemap 자동 생성 + robots.txt 최적화**
> **소요 시간**: 1~2시간

## 4-1. llms.txt 작성

```markdown
# 뷰티풀한방병원

> 국립암센터 차량 15분 거리, 경기도 파주시 중양로 94-9에 위치한 암요양 한방병원.
> 수술·항암·방사선 치료 후 면역과 체력 회복을 돕는 통합 암 케어 전문.

## 핵심 정보
- 위치: 경기도 파주시 중양로 94-9 (국립암센터 차량 15분)
- 전화: 031-945-2000
- 대표원장: 이형석
- 서비스 지역: 파주, 고양, 일산, 경기 북부

## 주요 페이지
- [홈](https://btful.co.kr/): 병원 개요 및 핵심 서비스
- [클리닉](https://btful.co.kr/clinics): 5가지 통합 암 케어 클리닉
- [치료환경](https://btful.co.kr/facilities): 입원·치료·힐링·영양 시설
- [뷰티풀이야기](https://btful.co.kr/columns): 의료 칼럼·영상·FAQ
- [치료사례](https://btful.co.kr/cases): 환자 회복 사례
- [병원소개](https://btful.co.kr/about): 이형석 원장 및 의료진
- [3분 건강체크](https://btful.co.kr/health-check): 자가진단
- [예약·상담](https://btful.co.kr/reservation): 상담 예약

## 5가지 클리닉
1. 뷰티풀 암케어 (https://btful.co.kr/clinics/cancer-care): 통합 암 면역 치료
2. 암별 집중케어:
   - 유방암 (https://btful.co.kr/clinics/breast-cancer)
   - 부인암 (https://btful.co.kr/clinics/gynecologic-cancer)
   - 위암 (https://btful.co.kr/clinics/gastric-cancer)
   - 폐암 (https://btful.co.kr/clinics/lung-cancer)
   - 간암 (https://btful.co.kr/clinics/liver-cancer)
3. 수술 후 회복케어 (https://btful.co.kr/clinics/post-surgery)
4. 항암치료 환자 케어 (https://btful.co.kr/clinics/chemotherapy)
5. 방사선치료 환자 케어 (https://btful.co.kr/clinics/radiotherapy)

## 차별화 포인트
- 국립암센터 차량 15분 — 협진·연계 편리
- 통합 암 면역 회복 프로그램 (한방 + 운동 + 심리 + 식이)
- 한방 전문 의료진의 환자 맞춤 케어

## Optional
- [영상 콘텐츠](https://www.youtube.com/@BTF1101): 유튜브 채널
```

## 4-2. sitemap.xml 자동 생성

```typescript
// scripts/generate-sitemap.ts

import { writeFileSync } from 'fs';
import { CLINIC_IDS } from '../src/lib/data/clinics-data';

const STATIC_ROUTES = [
  '/', '/clinics', '/facilities', '/columns', '/cases',
  '/about', '/health-check', '/reservation'
];

const DYNAMIC_ROUTES = CLINIC_IDS.map(id => `/clinics/${id}`);

const ALL_ROUTES = [...STATIC_ROUTES, ...DYNAMIC_ROUTES];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_ROUTES.map(route => `  <url>
    <loc>https://btful.co.kr${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync('public/sitemap.xml', sitemap);

// package.json에 추가:
// "scripts": {
//   "generate-sitemap": "tsx scripts/generate-sitemap.ts",
//   "build": "npm run generate-sitemap && vite build"
// }
```

## 4-3. robots.txt 최적화

```
public/robots.txt:

User-agent: *
Allow: /

# 인증 필요 페이지 차단
Disallow: /my-consultations
Disallow: /my-results
Disallow: /my-reports
Disallow: /admin

# 네이버 봇
User-agent: Yeti
Allow: /

# 구글 봇
User-agent: Googlebot
Allow: /
User-agent: Google-Extended
Allow: /

# AI 검색 크롤러
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://btful.co.kr/sitemap.xml
```

## ✅ Step 4 완료 검증 체크리스트

- [ ] public/llms.txt 생성, 빌드 후 dist/llms.txt 위치
- [ ] sitemap 자동 생성 스크립트 작동
- [ ] sitemap.xml에 모든 prerender 페이지 포함
- [ ] robots.txt에 인증 페이지 Disallow 추가
- [ ] curl 테스트 모두 통과

---

# Step 5: Core Web Vitals + 통합 빌드 검증

> **CLAUDE.md 12번 항목: Core Web Vitals 최적화**
> **소요 시간**: 2~3시간

## 5-1. Lighthouse 측정 (프리뷰 URL)

```
프리뷰 빌드된 URL에 대해 Lighthouse 실행:

npm install -g lighthouse
lighthouse https://btful-git-feature-geo-...vercel.app/ \
  --view --preset=desktop \
  --output=html --output-path=./reports/lighthouse-home.html

대상 페이지: /, /clinics, /clinics/lung-cancer, /about, /columns

목표 점수:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 100

이슈 식별:
- LCP > 2.5s → 이미지 최적화, 폰트 preload
- CLS > 0.1 → 레이아웃 시프트 원인 (이미지 size 누락 등)
- INP > 200ms → JS 실행 최적화
```

## 5-2. 이미지 최적화

```
Supabase Storage 이미지의 경우:
- next-gen 포맷 (WebP/AVIF) 변환
- responsive sizes 적용
- lazy loading 적용

LCP 핵심 이미지 (홈 hero 등):
- preload 적용
- priority hint 적용
```

## 5-3. 자동 검증 스크립트

```typescript
// scripts/geo-monitoring/build-validate.ts

const REQUIRED_ROUTES = [
  '/', '/clinics', '/facilities', '/about', '/columns', '/cases',
  '/clinics/cancer-care',
  '/clinics/breast-cancer',
  '/clinics/gynecologic-cancer',
  '/clinics/gastric-cancer',
  '/clinics/lung-cancer',
  '/clinics/liver-cancer',
  '/clinics/post-surgery',
  '/clinics/chemotherapy',
  '/clinics/radiotherapy',
  // ...
];

const FORBIDDEN_ROUTES = [
  '/my-consultations',
  '/my-results',
  '/my-reports',
  '/admin'
];

for (const route of REQUIRED_ROUTES) {
  // dist/{route}/index.html 또는 dist{route}.html 존재 확인
  // 본문 콘텐츠 길이 ≥ 500
  // <title> 페이지마다 다름
  // <meta description> 존재
  // JSON-LD 1개 이상
  // BreadcrumbList 포함 (홈 제외)
}

for (const route of FORBIDDEN_ROUTES) {
  // dist에 prerender 안 됐는지 확인
}

// 검증 실패 시 빌드 fail
```

## ✅ Step 5 완료 검증 체크리스트

- [ ] Lighthouse SEO 점수 100
- [ ] Performance 점수 90+
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] 자동 검증 스크립트 통과
- [ ] 인증 페이지 prerender 차단 확인
- [ ] 프리뷰 URL에서 모든 페이지 정상

---

# Step 6: 배포 + After 측정 + 솔루션 자산화

> **CLAUDE.md 12번 마지막 항목: AI Overview / Perplexity-ChatGPT 인용 최적화 검증**
> **소요 시간**: 배포 1~2시간 + 며칠~몇 주 모니터링

## 6-1. PR 생성 → 사용자 검토 → main 머지

```
PR 본문 템플릿:

## 변경 사항 요약
- Prerender 도입: 16개 정적 페이지
- Schema.org 확장: MedicalProcedure(10), MedicalCondition(5), Physician, Breadcrumb
- llms.txt 추가
- sitemap.xml 자동 생성
- robots.txt: 인증 페이지 Disallow 추가
- Core Web Vitals 최적화

## 영향 범위
- 프로덕션 사이트: 모든 정적 페이지가 정적 HTML로 제공
- 인증 페이지(/my-*, /admin): 변경 없음, 보안 유지
- Supabase: 새 테이블 2개 추가 (geo_monitoring_*), 기존 데이터 무변경

## 롤백 방법
- Vercel Dashboard → 이전 배포 Promote
- 또는 git revert {commit-hash} on main

## 검증 결과
- Lighthouse: ...
- Schema validator: ✅
- 모든 라우트 curl 테스트: ✅
```

## 6-2. main 머지 후 즉시 검증

```bash
# 머지 후 5~10분 내
curl https://btful.co.kr/ | grep "통합 암 면역"
curl https://btful.co.kr/clinics/lung-cancer | grep "폐암"
curl https://btful.co.kr/about | grep "이형석"
curl https://btful.co.kr/llms.txt
curl https://btful.co.kr/sitemap.xml
curl https://btful.co.kr/robots.txt

# AI 크롤러 시뮬레이션
curl -A "ClaudeBot/1.0" https://btful.co.kr/clinics
curl -A "GPTBot/1.0" https://btful.co.kr/clinics
curl -A "PerplexityBot/1.0" https://btful.co.kr/clinics
```

## 6-3. After 데이터 수집 (1주, 2주, 4주)

```
배포 직후, 1주 후, 2주 후, 4주 후 자동 측정:

npm run geo:monitor

scripts/geo-monitoring/compare.ts:
- Before vs After 비교 리포트 자동 생성
- 인용률 변화 그래프
- 카테고리별 변화
- 경쟁 병원 점유율 변화

출력: reports/geo-comparison-{date}.md
```

## 6-4. 솔루션 자산화 (다른 병원 재적용)

```
solution-assets/ 디렉토리 정리:

solution-assets/
├── README.md                    # 적용 가이드
├── playbook-hospital-aio.md     # 병원 AIO 적용 플레이북
│
├── templates/
│   ├── CLAUDE-template.md       # 컨텍스트 문서 템플릿 (이번 CLAUDE.md 기반)
│   ├── llms-template.md         # llms.txt 템플릿
│   ├── robots-template.txt      # robots.txt 템플릿
│   ├── prerender-config.ts      # vite.config 예시
│   └── seo-component.tsx        # SEOHead 참고
│
├── schema-modules/              # 재사용 가능 schema
│   ├── medical-organization.ts
│   ├── physician.ts
│   ├── medical-procedure.ts
│   ├── medical-condition.ts
│   ├── faq-page.ts
│   └── breadcrumb.ts
│
├── monitoring/
│   ├── geo-monitor.ts           # AI 검색 모니터링
│   ├── queries-template.ts      # 쿼리 템플릿
│   └── compare-tool.ts          # Before/After 비교
│
└── case-study/
    ├── btful-before-after.md    # btful 케이스 (영업 자료)
    └── metrics-dashboard.md     # 측정 결과 대시보드
```

## ✅ Step 6 완료 검증 체크리스트

- [ ] main 머지 후 사이트 정상 작동 (10분 내 확인)
- [ ] 모든 prerender 페이지 라이브 검증
- [ ] AI 크롤러 시뮬레이션 모두 통과
- [ ] After 데이터 1차 수집 (배포 직후)
- [ ] solution-assets/ 디렉토리 완성
- [ ] 영업 자료용 Before/After 케이스 스터디 작성
- [ ] 1주/2주/4주 모니터링 일정 설정

---

# 작업 완료 후 산출물

### 사이트 자산
1. **btful.co.kr** — AI 검색 시대 대비 완료. 솔루션의 첫 라이브 데모.
2. **CLAUDE.md** — 사이트 컨텍스트 문서 (이미 보유)
3. **docs/geo-diagnosis-v2.md** — 진단 리포트
4. **scripts/geo-monitoring/** — AI 검색 모니터링 자동화

### 솔루션 자산 (사업화 핵심)
5. **solution-assets/** — 다른 병원 재적용 템플릿 일체
6. **case-study** — Before/After 영업 자료
7. **playbook** — 적용 가이드

### 영업 무기
- "ChatGPT가 뷰티풀한방병원을 X회/주 인용합니다 (이전: 0회)"
- 경쟁 병원 대비 점유율 데이터
- Lighthouse 100점 인증
- 구글 Rich Results 통과 인증

---

# 다음 비즈니스 단계

이 작업이 완료되면:

1. **무료 진단 리포트 자동화 도구** 만들기
   - 다른 병원 도메인 입력 → 자동 진단 리포트 생성
   - 영업 미팅 0회로 리드 생성

2. **두 번째 병원 적용** (7~8월 목표)
   - solution-assets/playbook 따라 적용
   - 적용 시간 70% 단축 검증

3. **솔루션 가격 패키지 확정**
   - 진단(200만원) → 구축(1,500~2,500만원) → 운영(80~150만원/월)

4. **CAS-PAGE 브랜드 런칭**
   - LS컨설팅 솔루션 라인업의 일부로

---

**작업 시작 명령어**:

```
btful-safety-guide.md 의 Safety Step 1~5가 모두 완료되었음을 확인했어.
이제 btful-geo-optimization-v2.md 의 Step 0부터 시작하자.
CLAUDE.md를 우선 정독하고, 단계별 검증 방식으로 진행해줘.
```
