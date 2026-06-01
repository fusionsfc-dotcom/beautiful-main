# 빌드 경고 메모

> 발견일: 2026-04-26 (Safety Step 5 Vercel 프리뷰 빌드 검토 시)
> 처리 예정: Step 5 (Core Web Vitals 최적화) 단계

---

## ⚠️ 경고 1: chunk size 865KB

**증상:**
```
(!) Some chunks are larger than 500 kB after minification.
```

**원인 추정:**
- 모든 페이지 컴포넌트가 단일 번들로 묶임
- Radix UI / Framer Motion / Recharts 등 무거운 의존성 미분리

**Step 5 처리 계획:**
1. `vite.config.ts`에 `manualChunks` 설정 추가
   ```ts
   manualChunks: {
     vendor: ['react', 'react-dom', 'react-router'],
     supabase: ['@supabase/supabase-js'],
     ui: ['@radix-ui/...'],
     motion: ['framer-motion'],
   }
   ```
2. React Router `lazy()` + `Suspense`로 페이지별 코드 스플리팅 적용
3. 목표: 초기 로드 번들 < 300KB

---

## ⚠️ 경고 2: /utils/supabase/info.tsx dynamic import 충돌

**증상:**
```
dynamic import of utils/supabase/info.tsx detected — may cause issues
```

**원인 추정:**
- `info.tsx`가 `.tsx` 확장자임에도 순수 상수만 export (JSX 없음)
- Vite가 dynamic import 경로로 혼용 감지

**Step 5 처리 계획:**
1. `utils/supabase/info.tsx` → `utils/supabase/info.ts`로 확장자 변경 검토
2. import 방식 `src/lib/supabase.ts`에서 통일 (static import만 사용)
3. 또는 환경변수 방식으로 전환 (`.env.local` + `import.meta.env`)

---

## 처리 우선순위

| 경고 | 영향 | 우선순위 |
|------|------|---------|
| chunk 865KB | LCP 지연, Performance 점수 하락 | 높음 |
| info.tsx import 충돌 | 빌드 불안정 가능성 | 중간 |

**현재 빌드는 정상 완료(Ready)** — Step 5 전까지 기능 영향 없음.
