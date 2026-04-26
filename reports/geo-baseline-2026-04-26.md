# GEO 측정 리포트 — Before (Prerender 적용 전)

- **측정일:** 2026-04-26
- **Run ID:** run_baseline_2026-04-26_2008
- **Phase:** before
- **엔진:** claude-sonnet-4-5
- **소요시간:** 47.3초
- **Preview URL:** https://beautiful-main-git-feature-geo-o-d8ab82-happylifecares-projects.vercel.app

---

## 전체 요약

| 항목 | 수치 |
|------|------|
| 총 쿼리 수 | 30개 |
| 병원 언급됨 | 12개 |
| **인용률 (Before)** | **40%** |

---

## 카테고리별 결과

| 카테고리 | 총 쿼리 | 언급 | 인용률 | 비고 |
|---------|---------|------|--------|------|
| location (지역 검색) | 7 | 4 | **57%** | 최고 — 지역 키워드 강점 |
| treatment (치료 키워드) | 6 | 3 | **50%** | 양호 |
| condition (암종별) | 7 | 2 | **28%** | 개선 필요 |
| patient_language (환자 구어체) | 5 | 1 | **20%** | 개선 필요 |
| comparison (비교 검색) | 3 | 0 | **0%** | 취약 — 핵심 개선 대상 |
| brand (브랜드) | 2 | 2 | **100%** | 정상 |

---

## 인용 유형 분포

| 유형 | 건수 | 설명 |
|------|------|------|
| name | 8 | "뷰티풀한방병원" 직접 언급 |
| alias | 3 | "뷰티풀 한방병원" 등 변형 |
| director | 1 | "이형석 원장" 언급 |
| domain | 0 | btful.co.kr 직접 언급 없음 |
| none | 18 | 미언급 |

---

## 분석 및 인사이트

### 강점
- **지역 키워드 57%**: 국립암센터·파주·일산 등 지역 연결성이 AI에 이미 인식됨
- **치료 키워드 50%**: 면역 회복·통합 치료 포지셔닝이 어느 정도 작동 중
- **브랜드 100%**: 직접 검색 시 100% 인용 → 브랜드 인지도 존재

### 약점 (GEO 작업의 핵심 타깃)
- **비교 검색 0%**: "암요양병원 vs 한방병원 차이" 류 쿼리에 전혀 미등장
  → 개념 설명 콘텐츠 + FAQ 구조화 데이터 필요
- **환자 구어체 20%**: "엄마 암인데 어디가 좋아요" 같은 자연어 검색 취약
  → E-E-A-T 강화 + patient-friendly 콘텐츠 구조화 필요
- **암종별 28%**: 유방암·위암·폐암 등 특정 암종 쿼리에 미등장
  → 클리닉 페이지별 MedicalCondition JSON-LD + FAQ 스키마 필요
- **domain 인용 0%**: btful.co.kr URL이 AI 응답에 전혀 안 나타남
  → llms.txt + sitemap + prerender 완료 후 개선 기대

---

## After 목표 (GEO 작업 완료 후)

| 카테고리 | Before | 목표 After |
|---------|--------|-----------|
| location | 57% | 80%+ |
| treatment | 50% | 75%+ |
| condition | 28% | 60%+ |
| patient_language | 20% | 50%+ |
| comparison | 0% | 40%+ |
| brand | 100% | 100% 유지 |
| **전체** | **40%** | **70%+** |

---

> 다음 측정: GEO Step 1~5 완료 후 `npm run geo:monitor` 재실행
> 비교: `npm run geo:compare reports/geo-baseline-2026-04-26.json reports/geo-after-{date}.json`
