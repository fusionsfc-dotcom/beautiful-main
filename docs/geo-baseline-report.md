# GEO Baseline 리포트 — 뷰티풀한방병원 (btful.co.kr)

> **영업 자료 baseline — GEO 작업 전 현황**
> After 재측정 후 Before/After 비교 자료로 활용

---

## 측정 개요

| 항목 | 내용 |
|------|------|
| 측정일 | 2026-04-26 |
| 측정 방법 | Claude API (claude-sonnet-4-5) |
| 쿼리 수 | 30개 (암요양병원 중심 설계) |
| Run ID | run_baseline_2026-04-26_2008 |
| 소요 시간 | 47.3초 |

---

## 핵심 수치

### 전체 인용률: **40%** (12/30)

| 카테고리 | 쿼리 수 | 인용 | 인용률 | 평가 |
|---------|---------|------|--------|------|
| location (지역 검색) | 7 | 4 | **57%** | 강점 |
| treatment (치료 키워드) | 6 | 3 | **50%** | 양호 |
| condition (암종별) | 7 | 2 | **28%** | 개선 필요 |
| patient_language (환자 구어체) | 5 | 1 | **20%** | 개선 필요 |
| comparison (비교·의사결정) | 3 | 0 | **0%** | 핵심 취약점 |
| brand (브랜드 직접) | 2 | 2 | **100%** | 정상 |

### 인용 유형 분포

| 유형 | 건수 | 의미 |
|------|------|------|
| name | 8 | "뷰티풀한방병원" 직접 언급 |
| alias | 3 | "뷰티풀 한방병원" 등 변형 |
| director | 1 | "이형석 원장" 언급 |
| **domain** | **0** | **btful.co.kr URL 미인용 — 클릭 유도 불가** |
| none | 18 | 미언급 |

---

## 핵심 진단 3가지

### 1. 비교 검색에서 노출 0% — 의사결정 검색 누락
- "암요양병원과 한방병원 차이", "통합치료 가능한 요양병원" 등
- AI가 개념 설명 시 뷰티풀한방병원을 사례로 활용하지 못함
- **원인**: 개념·비교 콘텐츠가 구조화 데이터로 표현되지 않음
- **처방**: FAQPage 스키마 확장 + comparison 콘텐츠 강화

### 2. 환자 일상 언어 인식률 낮음 (20%)
- "엄마 암인데 요양병원 어디 좋아요", "항암하면서 한방 같이 받을 수 있는 병원"
- 보호자·환자의 구어체 검색에 AI가 병원을 연결하지 못함
- **원인**: E-E-A-T 부족 — 실제 환자 스토리·치료 사례 구조화 미흡
- **처방**: MedicalWebPage 스키마 + 치료사례 구조화

### 3. 도메인(URL) 인용 0% — 클릭 유도 못함
- AI 응답에 btful.co.kr URL이 단 한 번도 등장하지 않음
- 병원명 언급돼도 사용자가 직접 찾아가야 함
- **원인**: SPA 구조로 AI 크롤러가 페이지 콘텐츠 미인식
- **처방**: Prerender (정적 HTML) + llms.txt + sitemap.xml

---

## After 목표

| 카테고리 | Before | 목표 After | 핵심 작업 |
|---------|--------|-----------|---------|
| location | 57% | 80%+ | Prerender + LocalBusiness 스키마 |
| treatment | 50% | 75%+ | MedicalProcedure 스키마 |
| condition | 28% | 60%+ | MedicalCondition 스키마 + 클리닉 FAQ |
| patient_language | 20% | 50%+ | E-E-A-T + 치료사례 구조화 |
| comparison | 0% | 40%+ | FAQPage 확장 + 비교 콘텐츠 |
| brand | 100% | 100% | 유지 |
| **전체** | **40%** | **70%+** | Prerender + JSON-LD + llms.txt |

---

## 영업 포인트 (After 측정 완료 후 사용)

```
"GEO 작업 전: AI 검색에서 뷰티풀한방병원 인용률 40%
 GEO 작업 후: [After 수치]%로 상승
 특히 비교 검색(0% → __)과 도메인 인용(0% → __)이 핵심 개선"
```

> After 측정: GEO Step 1~5 완료 후 `npm run geo:monitor` 재실행
> 비교 리포트: `npm run geo:compare reports/geo-baseline-2026-04-26.json reports/geo-after-{date}.json`
