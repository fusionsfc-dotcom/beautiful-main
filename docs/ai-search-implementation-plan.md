# AI 검색 최적화 구현 계획안

**작성일**: 2026년 4월 9일
**기반 문서**: [ai-search-optimization-plan.md](./ai-search-optimization-plan.md)

---

## 현재 코드 상태 요약

### SEOHead 적용 현황

| 페이지 | SEOHead | JSON-LD | sitemap |
|--------|---------|---------|---------|
| Home (`/`) | O | X (index.html에 Hospital만) | O |
| Clinics (`/clinics`) | O | X | O |
| **ClinicDetail (`/clinics/:id`)** | **X** | **X** | **X** |
| Facilities (`/facilities`) | O | X | O |
| Columns (`/columns`) | O | X | O |
| **Cases (`/cases`)** | **X** | **X** | **X** |
| **Reservation (`/reservation`)** | **X** | **X** | **X** |
| **HealthCheck (`/health-check`)** | **X** | **X** | **X** |
| About (`/about`) | O | X | O |

> **X 표시 = 개선 필요**, 특히 굵은 글씨 4개 페이지는 메타 태그 자체가 없음

### 구조화 데이터 현황

- `index.html` : Hospital 스키마 1개만 존재
- 페이지별 JSON-LD : **전혀 없음**
- FAQ, Doctor, Service, Article 스키마 : **전혀 없음**

### 크롤링 현황

- robots.txt : 기본 봇만 허용 (AI 크롤러 명시 없음)
- sitemap.xml : 정적 5개 URL만 (동적 페이지 누락)
- SPA 구조 : 프리렌더링 없음 → JS 미실행 크롤러는 빈 페이지

---

## 구현 작업 목록

### Task 1. SEOHead 누락 페이지 보완

**대상 파일**:
- `src/app/pages/ClinicDetail.tsx` (SEOHead 미사용, import도 없음)
- `src/app/pages/Cases.tsx` (SEOHead 미사용, import도 없음)
- `src/app/pages/Reservation.tsx` (SEOHead 미사용)
- `src/app/pages/HealthCheck.tsx` (SEOHead 미사용)

**작업 내용**:

각 페이지에 SEOHead 컴포넌트를 추가하고, 페이지별 고유한 title/description/canonical 설정

```
ClinicDetail:
  - clinicData 객체에서 id별 title/description 자동 매핑
  - 예: title="암환자 통합 면역 치료 클리닉 | 뷰티풀한방병원"
  - canonical="https://www.btful.co.kr/clinics/cancer-immune"

Cases:
  - title="치료사례 | 뷰티풀한방병원"
  - description="뷰티풀한방병원의 실제 암, 중풍, 이명, 척추 치료사례를 확인하세요."

Reservation:
  - title="예약·상담 | 뷰티풀한방병원"
  - description="뷰티풀한방병원 진료 예약 및 상담 안내. 031-945-2000"

HealthCheck:
  - title="3분 건강 체크 | 뷰티풀한방병원"
  - description="간단한 자가 건강 체크로 현재 상태를 확인해보세요."
```

---

### Task 2. JSON-LD 구조화 데이터 컴포넌트 신규 생성

**신규 파일**: `src/components/seo/JsonLd.tsx`

범용 JSON-LD 렌더링 컴포넌트를 만들어 각 페이지에서 재사용

```tsx
// 사용 예시:
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "암환자 통합 면역 치료 클리닉",
  ...
}} />
```

**구현 방식**: `react-helmet-async`의 `<Helmet>` 내부에 `<script type="application/ld+json">` 삽입

---

### Task 3. 페이지별 구조화 데이터 추가

#### 3-1. ClinicDetail 페이지 — MedicalClinic + MedicalTherapy 스키마

**파일**: `src/app/pages/ClinicDetail.tsx`

현재 `clinicData` 객체에 3개 클리닉 데이터가 하드코딩되어 있음:
- `cancer-immune`: 암환자 통합 면역 치료 클리닉
- `tinnitus-headache`: 이명·난청·어지럼증·두통 클리닉
- `stroke-parkinsons`: 중풍·파킨슨병 클리닉

각 클리닉별 JSON-LD 추가:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "암환자 통합 면역 치료 클리닉",
  "description": "...",
  "medicalSpecialty": "Oncology",
  "availableService": [
    {
      "@type": "MedicalTherapy",
      "name": "왕뜸 · 약뜸 치료",
      "description": "열을 전달하여 체내 기혈 순환을 돕고...",
      "relevantSpecialty": "한방 암 치료"
    },
    {
      "@type": "MedicalTherapy",
      "name": "고주파 온열 암 치료",
      "description": "고주파 에너지를 이용하여 암 조직 주변의 온도를 높여..."
    }
  ],
  "isPartOf": {
    "@type": "Hospital",
    "name": "뷰티풀한방병원",
    "url": "https://www.btful.co.kr"
  }
}
```

#### 3-2. About 페이지 — Doctor/Person 스키마

**파일**: `src/app/pages/About.tsx`

현재 `doctors` 배열에 3명의 의사 데이터가 있음 (55~77번 줄):
- 김한의 원장 (암 치료 및 면역 관리)
- 이한의 원장 (중풍·파킨슨병 재활)
- 박한의 원장 (척추·관절 통증 치료)

의사 사진도 이미 Supabase에 저장됨 (DIRECTOR_IMAGE_URL 등)

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "김한의",
  "jobTitle": "원장",
  "medicalSpecialty": "암 치료 및 면역 관리",
  "description": "20년 이상의 임상 경험",
  "alumniOf": "경희대학교 한의과대학",
  "memberOf": ["대한한방종양학회", "대한암한의학회"],
  "image": "https://...doc_ceo.jpeg",
  "worksFor": {
    "@type": "Hospital",
    "name": "뷰티풀한방병원"
  }
}
```

> 참고: 현재 doctors 배열의 이름(김한의, 이한의, 박한의)이 실제 의료진과 다를 수 있음.
> 실제 사진 변수(DIRECTOR_IMAGE_URL: 이형석 병원장, DIRECTOR_2: 고은상 원장, DIRECTOR_3: 장엽섭 원장, DIRECTOR_4: 이하림 원장)와 불일치.
> **→ 실제 의료진 정보 확인 필요**

#### 3-3. Columns 페이지 — FAQPage 스키마

**파일**: `src/app/pages/Columns.tsx`

현재 `FaqSection` 컴포넌트가 존재하며 (탭 id: "faq"), Supabase에서 FAQ 데이터를 로드하는 것으로 추정

FAQ 데이터 로드 후 JSON-LD 동적 생성:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "항암 치료 중 한방 치료를 받을 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 대학병원 항암 치료와 병행하여..."
      }
    }
  ]
}
```

#### 3-4. Cases 페이지 — MedicalWebPage 스키마

**파일**: `src/app/pages/Cases.tsx`

Supabase `cases` 테이블에서 치료사례를 로드함.
카테고리: cancer, stroke, tinnitus, spine

각 사례에 BlogPosting/MedicalWebPage 스키마 추가:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "폐암 3기 환자 항암 후 회복 사례",
  "datePublished": "2026-03-15",
  "author": {
    "@type": "Physician",
    "name": "김한의"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "폐암"
  },
  "publisher": {
    "@type": "Hospital",
    "name": "뷰티풀한방병원"
  }
}
```

#### 3-5. Home 페이지 — BreadcrumbList + WebSite 스키마

**파일**: `src/app/pages/Home.tsx`

```json
[
  {
    "@type": "WebSite",
    "name": "뷰티풀한방병원",
    "url": "https://www.btful.co.kr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.btful.co.kr/columns?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
]
```

---

### Task 4. index.html 기존 Hospital 스키마 보강

**파일**: `index.html` (45~76번 줄)

현재 Hospital 스키마에 다음 필드 추가:

```diff
  {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "뷰티풀한방병원",
+   "alternateName": "Beautiful Korean Medicine Hospital",
+   "foundingDate": "20XX",          ← 실제 설립일 필요
+   "numberOfEmployees": "XX",        ← 실제 인원 필요
    "url": "https://www.btful.co.kr",
    "logo": "https://www.btful.co.kr/logo.png",
    "description": "국립암센터 인근 통합 암 면역 회복 전문 한방병원",
    "telephone": "031-945-2000",
+   "email": "info@btful.co.kr",      ← 실제 이메일 필요
    "address": { ... },
+   "geo": {
+     "@type": "GeoCoordinates",
+     "latitude": "37.XXX",           ← 실제 좌표 필요
+     "longitude": "126.XXX"
+   },
-   "openingHours": "Mo-Su 09:00-18:00",
+   "openingHoursSpecification": [
+     {
+       "@type": "OpeningHoursSpecification",
+       "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
+       "opens": "09:00",
+       "closes": "18:00"
+     },
+     {
+       "@type": "OpeningHoursSpecification",
+       "dayOfWeek": "Saturday",
+       "opens": "09:00",
+       "closes": "13:00"
+     }
+   ],
+   "department": [
+     {
+       "@type": "MedicalClinic",
+       "name": "암환자 통합 면역 치료 클리닉",
+       "url": "https://www.btful.co.kr/clinics/cancer-immune"
+     },
+     {
+       "@type": "MedicalClinic",
+       "name": "이명·난청·어지럼증·두통 클리닉",
+       "url": "https://www.btful.co.kr/clinics/tinnitus-headache"
+     },
+     {
+       "@type": "MedicalClinic",
+       "name": "중풍·파킨슨병 클리닉",
+       "url": "https://www.btful.co.kr/clinics/stroke-parkinsons"
+     }
+   ],
+   "sameAs": [
+     "https://blog.naver.com/XXXXX",  ← 실제 SNS 주소 필요
+     "https://www.instagram.com/XXXXX"
+   ]
  }
```

---

### Task 5. sitemap.xml 확장

**파일**: `public/sitemap.xml`

현재 5개 URL → 다음 URL 추가:

```xml
<!-- 클리닉 상세 페이지 -->
<url>
  <loc>https://www.btful.co.kr/clinics/cancer-immune</loc>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://www.btful.co.kr/clinics/tinnitus-headache</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://www.btful.co.kr/clinics/stroke-parkinsons</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>

<!-- 기능 페이지 -->
<url>
  <loc>https://www.btful.co.kr/cases</loc>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://www.btful.co.kr/reservation</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
<url>
  <loc>https://www.btful.co.kr/health-check</loc>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
</url>
```

---

### Task 6. robots.txt AI 크롤러 명시 허용

**파일**: `public/robots.txt`

```diff
  User-agent: *
  Allow: /

  # 네이버 봇
  User-agent: Yeti
  Allow: /

  # 구글 봇
  User-agent: Googlebot
  Allow: /

+ # AI 검색 크롤러
+ User-agent: GPTBot
+ Allow: /
+
+ User-agent: ChatGPT-User
+ Allow: /
+
+ User-agent: PerplexityBot
+ Allow: /
+
+ User-agent: Google-Extended
+ Allow: /
+
+ User-agent: Bingbot
+ Allow: /
+
+ User-agent: ClaudeBot
+ Allow: /

  Sitemap: https://www.btful.co.kr/sitemap.xml
```

---

### Task 7. SEOHead 컴포넌트 기능 확장

**파일**: `src/components/seo/SEOHead.tsx`

현재 한계:
- `naver-site-verification`에 하드코딩된 `"NAVER_VERIFICATION_CODE"` (index.html의 실제 코드와 중복/불일치)
- JSON-LD 렌더링 기능 없음
- BreadcrumbList 지원 없음

개선 내용:

```diff
  type SEOHeadProps = {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
    canonical?: string;
+   jsonLd?: Record<string, any> | Record<string, any>[];
+   noindex?: boolean;
  };
```

- `jsonLd` prop 추가: 페이지별 구조화 데이터를 Helmet 내부에 `<script type="application/ld+json">` 으로 렌더링
- 중복되는 네이버 인증 코드 제거 (index.html에서만 유지)
- `noindex` prop 추가: admin, my-* 등 비공개 페이지용

---

### Task 8. Vite 프리렌더링 플러그인 도입

**대상 파일**: `vite.config.ts`, `package.json`

**문제**: SPA 구조에서 AI 크롤러가 빈 HTML만 수신

**해결**: `vite-plugin-prerender` 를 사용해 빌드 시 주요 페이지를 정적 HTML로 생성

```
프리렌더링 대상 경로:
- /
- /clinics
- /clinics/cancer-immune
- /clinics/tinnitus-headache
- /clinics/stroke-parkinsons
- /facilities
- /columns
- /cases
- /about
- /reservation
- /health-check
```

프리렌더링 미적용 경로 (로그인 필요):
- /admin
- /my-consultations
- /my-results
- /my-reports

**대안**: Vercel에서 ISR(Incremental Static Regeneration) 또는 Edge Middleware로 봇 감지 후 서버 렌더링

---

### Task 9. 네이버 인증 코드 정리

**현재 문제**: 네이버 인증 코드가 2곳에 중복, 값도 다름

| 위치 | 값 |
|------|-----|
| `index.html:30` | `18e12f6713e833dcff2af4c97e31b314c42e37c3` (실제 값) |
| `SEOHead.tsx:46` | `NAVER_VERIFICATION_CODE` (플레이스홀더) |

**조치**: SEOHead에서 naver-site-verification 메타 태그 제거 (index.html에서만 유지)

---

## 구현 순서 (의존성 기반)

```
Phase A: 즉시 실행 가능 (데이터 확인 불필요)
──────────────────────────────────────────
  A-1. Task 6  robots.txt AI 크롤러 허용           (5분)
  A-2. Task 5  sitemap.xml URL 추가               (10분)
  A-3. Task 9  네이버 인증 코드 정리                (5분)
  A-4. Task 1  SEOHead 누락 4개 페이지 추가         (30분)

Phase B: 컴포넌트 확장
──────────────────────────────────────────
  B-1. Task 7  SEOHead에 jsonLd prop 추가          (20분)
  B-2. Task 2  JsonLd 유틸 컴포넌트 (선택)          (15분)

Phase C: 구조화 데이터 (실제 데이터 확인 후)
──────────────────────────────────────────
  C-1. Task 4  index.html Hospital 스키마 보강      (20분)
  C-2. Task 3-1 ClinicDetail MedicalClinic 스키마   (30분)
  C-3. Task 3-2 About Doctor 스키마                 (20분)
  C-4. Task 3-3 Columns FAQPage 스키마             (20분)
  C-5. Task 3-4 Cases MedicalWebPage 스키마         (20분)
  C-6. Task 3-5 Home WebSite 스키마                (10분)

Phase D: 크롤링 근본 해결
──────────────────────────────────────────
  D-1. Task 8  Vite 프리렌더링 도입                 (1~2시간)
```

---

## 구현 전 확인 필요 사항

| # | 항목 | 이유 | 현재 코드 상태 |
|---|------|------|----------------|
| 1 | **실제 의료진 이름/경력** | Doctor 스키마에 정확한 정보 필요 | About.tsx의 doctors 배열(김한의/이한의/박한의)과 이미지 변수(이형석/고은상/장엽섭/이하림)가 불일치 |
| 2 | **병원 설립일** | Hospital 스키마 foundingDate | 코드에 없음 |
| 3 | **정확한 GPS 좌표** | GeoCoordinates 스키마 | 코드에 없음 |
| 4 | **토/일 영업시간** | OpeningHoursSpecification | 현재 "Mo-Su 09:00-18:00"으로 되어있지만 실제와 다를 수 있음 |
| 5 | **SNS/블로그 URL** | sameAs 필드 | 코드에 없음 |
| 6 | **병원 이메일** | Hospital 스키마 | 코드에 없음 |
| 7 | **Bing Webmaster 등록 여부** | ChatGPT Search 노출 | 확인 필요 |

---

## 검증 방법

구현 완료 후 다음 도구로 검증:

1. **Google 리치 결과 테스트**: https://search.google.com/test/rich-results
2. **Schema.org 검증기**: https://validator.schema.org/
3. **Google Search Console**: 구조화 데이터 보고서
4. **Lighthouse SEO 점수**: Chrome DevTools
5. **수동 크롤링 테스트**: `curl` 로 프리렌더링된 HTML 확인
6. **AI 검색 테스트**: Perplexity/ChatGPT에서 "파주 한방병원", "국립암센터 근처 한방병원" 검색

---

## 요약

| 구분 | 작업 수 | 예상 소요 |
|------|---------|-----------|
| Phase A (즉시) | 4개 | 50분 |
| Phase B (컴포넌트) | 2개 | 35분 |
| Phase C (구조화 데이터) | 6개 | 2시간 |
| Phase D (프리렌더링) | 1개 | 1~2시간 |
| **전체** | **13개 Task** | **약 4~5시간** |

Phase A는 확인 없이 즉시 진행 가능합니다.
Phase C는 위 "확인 필요 사항" 7가지 중 최소 1번(의료진 정보)이 확인되어야 정확한 구현이 가능합니다.
