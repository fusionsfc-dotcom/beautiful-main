# 뷰티풀한방병원 — Claude 컨텍스트 문서

> AI 검색 최적화(AIO) 작업 시 Claude가 사이트 전체 구조를 빠르게 파악하기 위한 레퍼런스 문서.

---

## 1. 병원 기본 정보

| 항목 | 내용 |
|------|------|
| 병원명 | 뷰티풀한방병원 |
| 위치 | 경기도 파주시 중양로 94-9 |
| 전화 | 031-945-2000 |
| 팩스 | 031-944-1990 |
| 대표원장 | 이형석 |
| 핵심 포지셔닝 | 국립암센터 차량 15분 · 암요양병원 · 통합 암 면역 회복 |
| 서비스 지역 | 파주, 고양, 일산, 경기 북부 |
| 테마 컬러 | #E91E7A (핑크), #3E5266 (다크 블루) |

---

## 2. 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 18.3.1 + TypeScript |
| 빌드 도구 | Vite 6.3.5 |
| 라우팅 | React Router 7.13.0 |
| 스타일링 | Tailwind CSS 4.1.12 + Emotion |
| UI 컴포넌트 | Radix UI + shadcn/ui |
| 데이터베이스 | Supabase (PostgreSQL) |
| 인증 | Supabase Auth |
| SEO | React Helmet Async 3.0.0 |
| 애니메이션 | Framer Motion, Embla Carousel |
| 배포 | Vercel |
| 이미지 CDN | Supabase Storage |

---

## 3. 페이지 라우팅 구조

```
/                    → 홈 (Home)
/clinics             → 클리닉 목록
/clinics/:id         → 클리닉 상세
/facilities          → 치료환경
/columns             → 뷰티풀이야기 (콘텐츠 허브)
/reservation         → 예약·상담
/health-check        → 3분 건강 체크
/cases               → 치료사례
/about               → 병원소개
/my-consultations    → 내 상담 내역 (로그인 필요)
/my-results          → 내 검사 결과 (로그인 필요)
/my-reports          → 치료 경과 리포트 (로그인 필요)
/admin               → 관리자 페이지 (admin 권한 필요)
```

---

## 4. 진료 서비스 구조 (클리닉)

1. **뷰티풀 암케어** — 통합 암 면역 치료
2. **암별 집중케어** — 암종별 집중 케어
   - 유방암 / 부인암 / 위암 / 폐암 / 간암
3. **수술 후 회복케어** — 수술 후 체력·면역 회복
4. **항암치료 환자 케어** — 항암 부작용 관리
5. **방사선치료 환자 케어** — 방사선 부작용 관리

---

## 5. 콘텐츠 구조 (/columns — 뷰티풀이야기)

| 섹션 | 설명 |
|------|------|
| 뷰티풀갤러리 | 이미지 갤러리 |
| 영상 가이드 | 유튜브 영상 (암·재활·이명·병원 소개) |
| 질환별 칼럼 | 의료 칼럼 (암종별 카테고리) |
| 자주하는 질문 (FAQ) | FAQPage JSON-LD 스키마 적용 |
| 질문하기 | Q&A 제출 폼 |

**칼럼/FAQ 카테고리:**
`cancer` · `gynecologic_cancer` · `gastro_cancer` · `lung_cancer` · `liver_cancer` · `other_cancer`

---

## 6. 치료환경 구조 (/facilities)

| 섹션 | 내용 |
|------|------|
| 입원·병동 | 1~4인실, 스타일링 공간, 파우더룸 |
| 치료공간 | 고주파 온열치료, 한약 치료, 통증 관리, X-ray |
| 힐링생활 | 라이프스타일 공예 프로그램 |
| 영양식단 | 영양 식단 관리 |

---

## 7. 병원소개 구조 (/about)

| 섹션 | 내용 |
|------|------|
| 병원소개 | 미션·비전·차별점 |
| 의료진 | 원장 프로필 |
| 오시는길 | 지도·교통 안내 |
| 진료안내 | 진료 시간·절차 |
| 공지안내 | 비용·공지 (HilaC 유전자 검사, 치과 진료 포함) |

---

## 8. Supabase 데이터베이스 스키마

> ⚠️ **실제 테이블 목록 (2026-04-26 Supabase 직접 확인)**: `cases`, `columns`, `faqs`, `gallery`, `kv_store_ee767080`, `notices`, `profiles`, `videos` — 총 8개
> 코드 작성 시 반드시 실제 테이블명 사용 (`faq` → `faqs`, `gallery_items` → `gallery`)

### profiles
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid PK | auth.users 참조 |
| email | text unique | 이메일 |
| role | text | 'user' \| 'admin' |
| created_at | timestamp | |

### columns (의료 칼럼)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | |
| title | text | 제목 |
| summary | text | 요약 |
| content | text | 본문 |
| category | text | 암종별 카테고리 |
| thumbnail | text | 썸네일 URL |
| views | integer | 조회수 |
| author_id | uuid | |
| created_at, updated_at | timestamp | |

### faqs (자주하는 질문) ⚠️ 실제 테이블명: `faqs` (복수형)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | |
| question | text | 질문 |
| answer | text | 답변 |
| category | text | 암종별 카테고리 |
| author_id | uuid | |
| created_at, updated_at | timestamp | |

### videos (영상)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | |
| title | text | 제목 |
| description | text | 설명 |
| youtube_url | text | 유튜브 URL |
| category | text | cancer·rehab·tinnitus·hospital |
| views | integer | 조회수 |

### gallery (갤러리) ⚠️ 실제 테이블명: `gallery` (gallery_items 아님)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | |
| image_url | text | 이미지 URL |
| category | text | program·diet·environment·event·etc |
| caption | text | 설명 캡션 |

### cases (치료사례)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | |
| title | text | 제목 |
| content | text | 내용 |
| thumbnail | text | 썸네일 |
| category | text | 카테고리 |

### notices (공지안내) ⚠️ CLAUDE.md 초안에 없었던 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | |
| title | text | 공지 제목 |
| content | text | 공지 내용 (진료비·안내문 등 풍부한 텍스트) |
| author_id | uuid FK | profiles.id |
| is_published | boolean | 공개 여부 (true만 노출) |
| created_at | timestamp | |
- **사용 위치:** `/about` 페이지 → **공지안내** 탭 (`NoticesSection` 컴포넌트)
- **GEO 의미:** 진료비·치료 안내 등 텍스트 정보 포함 → prerender 대상 `/about`에서 AI 크롤러 노출 필요
- **처리 방향:** Step 2-5 "Supabase 의존 페이지" 전략 적용 (빌드 시점 정적 fetch)

### kv_store_ee767080 (정체 미확인)
- 절대 건드리지 않음. 향후 사용자가 직접 확인.

---

## 9. 현재 SEO 구현 현황

### SEOHead 컴포넌트 (`/src/components/seo/SEOHead.tsx`)
- 페이지별 동적 title / description
- Open Graph 태그 (og:type, og:title, og:description, og:image, og:url, og:locale=ko_KR)
- Twitter Card 태그
- Keywords 메타태그
- Canonical URL
- Robots 지시어 (index/follow 제어)

### 기본 메타 설정
- **Title:** `뷰티풀한방병원 | 국립암센터 인근 암요양병원 · 통합 암 면역 회복`
- **Description:** `국립암센터 차량 15분, 경기도 파주시 암요양병원. 수술·항암·방사선 치료 후 면역과 체력 회복을 돕는 뷰티풀한방병원...`
- **주요 키워드:** 암요양병원, 국립암센터근처병원, 파주암요양병원

### JSON-LD 구조화 데이터 (`index.html`)
- `Hospital` 스키마 — 병원명, 주소, 전화, 좌표, 운영시간, 서비스
- `FAQPage` 스키마 — 11개 Q&A (/columns 페이지)
- 네이버·구글 사이트 인증 메타태그 적용

---

## 10. 내비게이션 구조

### 상단 GNB (데스크탑)
홈 → 클리닉 → 치료환경 → 뷰티풀이야기 → 병원소개 → 로그인

### 하단 탭바 (모바일)
홈 · 클리닉 · 치료환경 · 뷰티풀이야기 · 병원소개

### 플로팅 요소
- 우측 사이드바: 상담 신청 위젯 (데스크탑)

---

## 11. 파일 구조 요약

```
/src
├── /app
│   ├── /pages          # 13개 페이지 컴포넌트
│   ├── /components     # Header, Footer, LoginModal, FloatingButton
│   │   ├── /ui         # 50+ Radix UI 컴포넌트
│   │   └── /figma      # ImageWithFallback
│   ├── /contexts       # AuthContext
│   └── routes.tsx      # 라우팅 정의
├── /components
│   └── /seo            # SEOHead 컴포넌트
├── /lib
│   └── supabase.ts     # Supabase 클라이언트 + TypeScript 타입
└── /styles             # Tailwind CSS

/public                 # 정적 자산
/scripts                # 빌드·배포 스크립트
/supabase               # DB 마이그레이션
```

---

## 12. 콘텐츠 업데이트 → 자동 재빌드 전략

> **결정 (2026-04-26):** A안 채택 — Supabase Webhook + Vercel Deploy Hook

### 채택 이유
- ISR(B)는 Next.js 전용, Vite+React에서 불가
- 수동(C)는 관리자 운영 부담 과다
- Supabase Database Webhook → Vercel Deploy Hook POST 연결로 완전 자동화 가능

### 구현 개요 (Step 2-5에서 정식 구현)
1. Vercel Dashboard → Project Settings → Git → **Deploy Hooks** → URL 생성
2. Supabase Dashboard → Database → **Webhooks** → 테이블별 트리거 설정
   - 대상 테이블: `columns`, `faqs`, `videos`, `gallery`, `notices`, `cases`
   - 이벤트: INSERT / UPDATE / DELETE
   - 엔드포인트: Vercel Deploy Hook URL (POST)
3. 새 글 작성 → Supabase Webhook → Vercel 자동 재빌드 → 정적 HTML 갱신

### 주의
- Vercel Deploy Hook URL은 `.env.local`에 보관, 절대 커밋 금지
- Supabase Webhook 설정은 사용자가 직접 진행 (Claude는 안내만)

---

## 13. GEO 작업 완료 후 별도 진행 TODO

> 보안 관련 — GEO 작업과 독립적으로 진행

- [ ] Supabase 8개 테이블 RLS 정책 전수 점검
- [ ] `/admin` 페이지 anon key 권한 차단 검증
- [ ] consultations 등 민감 데이터 테이블 RLS 강화 여부 확인

---

## 14. AI 검색 최적화(AIO) 현황 및 개선 포인트

### 현재 적용된 AIO 요소
- [x] JSON-LD Hospital 스키마
- [x] FAQPage 스키마 (11개 Q&A)
- [x] Open Graph / Twitter Card
- [x] 구글·네이버 사이트 인증
- [x] 모바일 반응형 디자인
- [x] 페이지별 동적 메타태그

### AIO 개선 필요 항목 (향후 작업 대상)
- [ ] `MedicalCondition` / `MedicalProcedure` / `MedicalSpecialty` JSON-LD 추가
- [ ] `BreadcrumbList` 구조화 데이터
- [ ] `LocalBusiness` + `MedicalBusiness` 스키마 강화
- [ ] 각 클리닉 페이지별 독립 FAQ 스키마
- [ ] 콘텐츠 E-E-A-T 강화 (의료진 프로필 구조화)
- [ ] 사이트맵(sitemap.xml) 자동 생성
- [ ] robots.txt 최적화
- [ ] Core Web Vitals 최적화 (LCP, CLS, INP)
- [ ] AI Overview 타겟 콘텐츠 구조화
- [ ] Perplexity/ChatGPT 인용 최적화를 위한 명확한 팩트 문장 구조
