# Step 2 완료 후 결정 사항

> 작성일: 2026-04-26
> 검토 시점: After 측정 결과 확인 후

---

## 의료진 데이터 단일화 완료 (2026-04-26)

- **문제**: `About.tsx` 내 가짜 `doctors` 배열("김한의", "이한의", "박한의")이 JSON-LD Physician 스키마에 노출
- **처리**: `src/data/physicians.ts` 생성 → DoctorsSection JSX + JSON-LD 양쪽 동일 소스 사용
- **의료진 4명 확정**: 이형석(한의사), 고은상(한의사), 장영섭(일반외과 전문의), 이하림(통합치의학과 전문의)
- **검증**: `dist/about/index.html` 가짜 이름 0건 / 실제 의료진 4명 JSON-LD 정상 확인

---

## 결정 1: cancer-specific-care 페이지 구조

### 현황
- `/clinics/cancer-specific-care` 한 페이지에 5개 암종(유방암·부인암·위암·폐암·간암) 통합
- GEO Before 측정: condition 카테고리 인용률 **28%** (7개 중 2개)
- 암종별 쿼리가 별도 URL 없이 한 페이지에 묶여 있어 AI 인용 취약 가능성

### 옵션

**옵션 A: 현행 유지 + 구조화 보완** (소규모 작업)
- 현재 한 페이지 구조 유지
- 각 암종에 anchor link 추가 (`#breast-cancer`, `#lung-cancer` 등)
- 페이지 내 암종별 `MedicalCondition` JSON-LD 추가
- `cancer-specific-care` FAQ 스키마에 암종별 Q&A 분리
- 예상 효과: condition 28% → 45~55%

**옵션 B: 5개 암종 별도 라우트 분리** (대규모 작업)
- `/clinics/breast-cancer`, `/clinics/lung-cancer` 등 5개 신규 페이지
- ClinicDetail.tsx 리팩토링 + 라우트 추가
- 각 페이지 독립 SEO, JSON-LD, prerender
- 예상 효과: condition 28% → 65~80%
- 예상 작업: 2~3일

### 결정 기준
After 측정에서 condition 카테고리가 **50% 미만**이면 옵션 B 검토.
**50% 이상**이면 옵션 A 유지.

---

## 메모: /about 페이지 E-E-A-T 약함 (Step 3에서 처리)

- prerender 후 dist/about/index.html에서 "이형석" **1회** 등장
- AI 크롤러 입장에서 의료진 신뢰도 정보가 극히 부족
- **Step 3 Physician Schema 작업 시 반드시 보강:**
  - 이형석 원장 학력, 자격(한의사 면허), 임상경력 → 사용자에게 확인 필요
  - `/about` 페이지 Physician JSON-LD 추가
  - 의료진 소개 텍스트에 원장명·자격·경력 반복 노출 확보
  - E-E-A-T 목표: "이형석" 등장 횟수 5회 이상, 자격 명시

---

## 결정 2: 콘텐츠 업데이트 자동화

### 현황
- 현재: 로컬 `npm run build` → `vercel deploy --prebuilt` 수동
- 콘텐츠 업데이트 주 1~2회 (공지·칼럼·FAQ)

### 옵션

**옵션 A: 수동 (현행 유지)**
- 장점: 단순, 추가 설정 없음
- 단점: 배포 잊으면 콘텐츠 반영 지연

**옵션 B: GitHub Actions 자동화**
- Supabase Webhook → GitHub Actions trigger
- Actions에서 `npm run build` + `vercel deploy --prebuilt`
- 장점: 완전 자동화
- 단점: Actions 설정 필요 (1~2시간)

### 결정 기준
Step 2~5 완료 후 운영 편의성 확인 후 결정.
