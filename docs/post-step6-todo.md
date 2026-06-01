# GEO 작업 완료 후 TODO

> 작성일: 2026-04-26
> 처리 시점: 2026년 5월 (4월 GEO 작업 종료 후 별도 작업)

---

## 옛 Aiweb URL 잔재 정리

### 배경

Google Search Console 확인 (2026-04-26) 결과:

**정상 항목:**
- 홈 페이지 정상 색인
- Sitemap 자동 인식
- Googlebot 정상 크롤링 중

**문제 발견 — 옛 Aiweb 시절 URL이 Google 인덱스에 잔존:**
- `/dining/?q=YToy...&bmode=view&idx=168757299`
- `/dining/?q=YToy...&bmode=view&idx=126509702`
- 그 외 `/notice/`, 기타 쿼리 파라미터 형태 URL 가능성

### 영향

- AI 검색(ChatGPT/Perplexity/ClaudeBot) 결과에 깨진 링크 노출 가능성
- Google 인덱스 품질 저하 (Soft 404, Crawled but not indexed 늘어날 위험)
- 브랜드 신뢰도 손상

### 처리 방안 (택일 또는 조합)

**1. Google Search Console "URL 삭제" 메뉴 일괄 삭제**
- GSC > 색인 > 삭제 > 일시적 삭제 요청
- 패턴 입력: `/dining/`, `/notice/` 등
- 효과는 6개월 임시 → 영구 차단은 아님

**2. vercel.json 옛 URL 리다이렉트 추가 (권장)**
```json
{
  "redirects": [
    { "source": "/dining/:path*", "destination": "/", "permanent": true },
    { "source": "/notice/:path*", "destination": "/", "permanent": true }
  ]
}
```
- 301 영구 리다이렉트 → Google이 인덱스 정리

**3. robots.txt 쿼리 파라미터 Disallow 추가**
```
User-agent: *
Disallow: /*?q=
Disallow: /*?bmode=
Disallow: /*?idx=
```

### 사전 작업 — 옛 URL 인벤토리 추출

GSC > 페이지 > 모든 URL → CSV 다운로드 → 옛 패턴 필터링:
- `/dining/`
- `/notice/`
- `?q=`, `?bmode=`, `?idx=` 포함 URL

### 결정 기준

- 옛 URL이 30개 미만 → GSC 삭제 + robots Disallow
- 옛 URL이 30개 이상 → vercel.json 301 리다이렉트 + robots Disallow + GSC 삭제 (3중)

---

---

## GSC 페이지 분석 결과 (2026-04-26 추가)

### 색인 현황
- 색인됨: 309 페이지
- 색인 안 됨: 877 페이지
- 총 알려진 페이지: 1,186 (대부분 옛 Aiweb URL 잔재)

### 색인 안 된 페이지 사유
- 425개: 중복 페이지 (Aiweb `?q=` 패턴 등)
- 206개: 404 (옛 URL, 새 사이트에 없음)
- 162개: robots.txt Disallow (의도적, 정상)
- 82개: 크롤링됨 but 색인 가치 낮음
- 2개: 표준 URL 없음

### 해석
- 옛 Aiweb 사이트 URL 잔재가 Google 인덱스에 약 800~900개 잔존
- 새 prerender 사이트 13개 페이지와 별개 존재
- 시간 경과 시 자연 정리되나, 영업 자료 작성 시 영향

### 처리 단계

**[즉시 처리 — 안전망]**
1. `vercel.json` rewrites가 모든 unknown URL → `index.html` 처리하는지 검증
   (이미 적용 가능성 높음, 단순 확인)

**[1주 후 — 본격 정리]**
1. 옛 URL 패턴 분석 (살아있는 URL 종류 파악)
2. GSC "색인 안 됨" CSV 다운로드 → 패턴 분류
3. 빈도 높은 패턴부터 처리:
   - `/dining/?q=...` → `/columns` 301
   - `/notice/?q=...` → `/columns` 301
   - 기타 `/board/?q=...` → 적절 페이지 매핑
4. `vercel.json`에 redirect 규칙 추가

**[1개월 후 — 청소]**
1. GSC 삭제 메뉴에서 옛 URL 일괄 제거 요청
2. `sitemap.xml`의 13개 URL만 정확 노출되도록 보장
3. 새 인덱스만 남게 정리

### 영업 자료 활용
- 본 케이스를 솔루션 영업에 활용
- "옛 사이트 마이그레이션 시 URL 잔재 정리"가 GEO 솔루션의 추가 가치
- 타 병원도 동일 문제 보유 가능성 매우 높음

---

## 다른 후속 TODO (참고)

- Supabase RLS 정책 전수 점검 (CLAUDE.md 13번)
- `/admin` anon key 권한 차단 검증
- GSC Soft 404 / "크롤링됨 - 색인 생성 안 됨" 페이지 정리
- Core Web Vitals 측정 및 chunk 분리 (Step 5에서 일부 처리)
