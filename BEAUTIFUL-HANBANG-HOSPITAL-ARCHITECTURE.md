# 뷰티풀한방병원 웹앱 완전 설계 문서

## 📋 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [디자인 시스템](#3-디자인-시스템)
4. [라우팅 구조](#4-라우팅-구조)
5. [컴포넌트 아키텍처](#5-컴포넌트-아키텍처)
6. [인증 시스템](#6-인증-시스템)
7. [백엔드 구조](#7-백엔드-구조)
8. [데이터베이스 설계](#8-데이터베이스-설계)
9. [페이지별 상세 구조](#9-페이지별-상세-구조)
10. [개발 환경 설정](#10-개발-환경-설정)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 정보
- **프로젝트명**: 뷰티풀한방병원 모바일 퍼스트 의료 웹앱
- **버전**: 0.0.1
- **개발 환경**: React 18.3.1 + Vite 6.3.5 + TypeScript
- **배포 환경**: Figma Make Platform
- **데이터베이스**: Supabase (PostgreSQL + Edge Functions)

### 1.2 프로젝트 특징
- **모바일 퍼스트 디자인**: 반응형 디자인으로 모바일과 데스크톱 모두 지원
- **의료법 준수**: 과장 표현 없는 신뢰 기반 메시지
- **미니멀 디자인**: Butterfly Pink를 강조색으로 한 깔끔한 UI
- **다중 페이지 구조**: React Router 기반 SPA (Single Page Application)

### 1.3 핵심 기능
- ✅ 4대 핵심 클리닉 소개 (항암·중풍·이명·척추)
- ✅ 전문 칼럼 게시판 (CRUD 지원)
- ✅ 온라인 상담 예약 시스템
- ✅ 건강검진 문진표 작성
- ✅ 회원 인증 및 마이페이지
- ✅ 치료 사례 (로그인 필수)
- ✅ 실시간 플로팅 상담 버튼

---

## 2. 기술 스택

### 2.1 프론트엔드 핵심 라이브러리

```json
{
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "react-router": "7.13.0",
  "vite": "6.3.5",
  "tailwindcss": "4.1.12"
}
```

### 2.2 UI 컴포넌트 라이브러리
- **Radix UI**: 접근성 중심 Headless UI 컴포넌트
  - Accordion, Alert Dialog, Avatar, Badge, Button, Card 등 40+ 컴포넌트
- **Material UI**: 일부 복잡한 컴포넌트에 사용
  - @mui/material (7.3.5)
  - @mui/icons-material (7.3.5)
- **Lucide React**: 아이콘 라이브러리 (0.487.0)

### 2.3 애니메이션 & 인터랙션
- **Motion (Framer Motion)**: 페이지 전환 및 스크롤 애니메이션 (12.23.24)
- **Embla Carousel**: 이미지 캐러셀 (8.6.0)
- **React DnD**: 드래그 앤 드롭 (16.0.1)

### 2.4 폼 & 데이터 관리
- **React Hook Form**: 폼 상태 관리 (7.55.0)
- **Date-fns**: 날짜 처리 (3.6.0)
- **React Day Picker**: 날짜 선택 UI (8.10.1)

### 2.5 백엔드 & 인프라
- **Supabase**: 인증, 데이터베이스, 스토리지
- **Supabase Edge Functions**: Deno 기반 서버리스 API
- **Hono**: Edge Function용 경량 웹 프레임워크

### 2.6 개발 도구
- **@vitejs/plugin-react**: React Fast Refresh 지원
- **@tailwindcss/vite**: Tailwind CSS v4 통합
- **PostCSS**: CSS 후처리

---

## 3. 디자인 시스템

### 3.1 컬러 팔레트

#### 주요 브랜드 컬러
```css
--butterfly-pink: #E91E7A;    /* 메인 강조색 (Primary) */
--blue-gray: #3E5266;          /* 텍스트 & 헤딩 (Foreground) */
--muted-blue: #8FA8BA;         /* 서브 텍스트 & 보조 UI (Secondary) */
--airy-white: #F8F9FA;         /* 배경색 (Background) */
--silver-gray: #6B7D8C;        /* 비활성 텍스트 (Muted Foreground) */
```

#### 시스템 컬러
```css
--background: #F8F9FA;
--foreground: #3E5266;
--card: #ffffff;
--primary: #E91E7A;
--primary-foreground: #ffffff;
--secondary: #8FA8BA;
--destructive: #d4183d;
--border: rgba(143, 168, 186, 0.2);
```

### 3.2 타이포그래피

#### 폰트 크기 스케일
```css
--text-2xl: 28px;   /* h1 */
--text-xl: 22px;    /* h2 */
--text-lg: 20px;    /* h3 */
--text-base: 16px;  /* body, h4 */
```

#### 기본 스타일
- **h1**: 28px, Medium (500), Line-height 1.5
- **h2**: 22px, Medium (500), Line-height 1.5
- **h3**: 20px, Medium (500), Line-height 1.5
- **h4**: 16px, Medium (500), Line-height 1.5
- **body/p**: 16px, Normal (400), Line-height 1.5
- **button**: 16px, Medium (500), Line-height 1.5

### 3.3 간격 및 레이아웃
- **Border Radius**: 12px (--radius)
- **최대 콘텐츠 너비**: 1280px (max-w-screen-xl)
- **모바일 바텀 탭**: 64px (h-16)
- **헤더 높이**: 
  - 모바일: 64px (h-16)
  - 데스크톱: 80px (h-20)

### 3.4 반응형 브레이크포인트
- **모바일**: < 1024px (기본)
- **데스크톱**: ≥ 1024px (lg:)

---

## 4. 라우팅 구조

### 4.1 라우터 설정 (`/src/app/routes.tsx`)

```typescript
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,  // 레이아웃 컴포넌트
    children: [
      { index: true, Component: Home },                     // 홈
      { path: "clinics", Component: Clinics },              // 클리닉 목록
      { path: "clinics/:id", Component: ClinicDetail },     // 클리닉 상세
      { path: "facilities", Component: Facilities },        // 치료환경
      { path: "columns", Component: Columns },              // 전문칼럼
      { path: "reservation", Component: Reservation },      // 상담예약
      { path: "health-check", Component: HealthCheck },     // 건강검진
      { path: "cases", Component: Cases },                  // 치료사례 (로그인 필수)
      { path: "my-consultations", Component: MyConsultations },  // 내 상담 내역
      { path: "my-results", Component: MyResults },         // 내 검사 결과
      { path: "my-reports", Component: MyReports },         // 치료 경과
      { path: "about", Component: About },                  // 병원소개
    ],
  },
]);
```

### 4.2 페이지별 URL 및 접근 권한

| URL | 페이지 | 로그인 필요 | 설명 |
|-----|--------|------------|------|
| `/` | Home | X | 랜딩 페이지 |
| `/clinics` | Clinics | X | 4대 클리닉 소개 |
| `/clinics/:id` | ClinicDetail | X | 개별 클리닉 상세 |
| `/facilities` | Facilities | X | 치료 환경 및 시설 |
| `/columns` | Columns | X | 전문 칼럼 목록 |
| `/reservation` | Reservation | X | 온라인 상담 예약 |
| `/health-check` | HealthCheck | X | 건강검진 문진표 |
| `/cases` | Cases | **✅ 필수** | 치료 사례 (환자 보호) |
| `/my-consultations` | MyConsultations | **✅ 필수** | 상담 내역 조회 |
| `/my-results` | MyResults | **✅ 필수** | 검사 결과 조회 |
| `/my-reports` | MyReports | **✅ 필수** | 치료 경과 리포트 |
| `/about` | About | X | 병원 소개 및 오시는 길 |

---

## 5. 컴포넌트 아키텍처

### 5.1 디렉토리 구조

```
/src/app/
├── App.tsx                    # 앱 엔트리포인트 (RouterProvider)
├── routes.tsx                 # 라우팅 설정
├── contexts/
│   └── AuthContext.tsx        # 인증 컨텍스트 (로그인 상태 관리)
├── components/
│   ├── GlobalHeader.tsx       # 전역 헤더 (로고, 네비게이션, 로그인)
│   ├── LoginModal.tsx         # 로그인 모달
│   ├── FloatingConsultButton.tsx  # 플로팅 상담 버튼
│   ├── figma/
│   │   └── ImageWithFallback.tsx  # 이미지 폴백 처리 (보호됨)
│   └── ui/
│       ├── accordion.tsx      # Radix Accordion
│       ├── alert-dialog.tsx   # Alert Dialog
│       ├── button.tsx         # Button 컴포넌트
│       ├── card.tsx           # Card 컴포넌트
│       ├── dialog.tsx         # Dialog 컴포넌트
│       ├── dropdown-menu.tsx  # Dropdown Menu
│       ├── input.tsx          # Input 컴포넌트
│       ├── select.tsx         # Select 컴포넌트
│       ├── textarea.tsx       # Textarea 컴포넌트
│       └── ... (40+ UI 컴포넌트)
└── pages/
    ├── Root.tsx               # 레이아웃 루트 (헤더, 바텀탭, AuthProvider)
    ├── Home.tsx               # 홈 페이지
    ├── Clinics.tsx            # 클리닉 목록
    ├── ClinicDetail.tsx       # 클리닉 상세
    ├── Facilities.tsx         # 치료환경
    ├── Columns.tsx            # 전문칼럼
    ├── Reservation.tsx        # 상담예약
    ├── HealthCheck.tsx        # 건강검진
    ├── Cases.tsx              # 치료사례
    ├── MyConsultations.tsx    # 내 상담 내역
    ├── MyResults.tsx          # 내 검사 결과
    ├── MyReports.tsx          # 치료 경과
    └── About.tsx              # 병원소개
```

### 5.2 핵심 컴포넌트 설명

#### 5.2.1 App.tsx (엔트리포인트)
```typescript
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
```

#### 5.2.2 Root.tsx (레이아웃 컴포넌트)
- **역할**: 모든 페이지의 공통 레이아웃 제공
- **구성 요소**:
  1. `AuthProvider`: 전역 인증 상태 관리
  2. `GlobalHeader`: 최상단 고정 헤더
  3. `<Outlet />`: 자식 라우트 렌더링 영역
  4. `FloatingConsultButton`: 사이드바/플로팅 상담 버튼
  5. 모바일 바텀 탭 네비게이션

**특징**:
- 페이지 전환 시 자동 스크롤 최상단 이동
- 데스크톱: 사이드바 형태로 상담 버튼 표시
- 모바일: 하단 고정 탭바 + 플로팅 버튼

#### 5.2.3 GlobalHeader.tsx
**기능**:
- 스크롤 시 그림자 효과 (scrolled 상태)
- 로그인/로그아웃 상태 관리
- 사용자 이름 마스킹 (첫 글자만 표시, 나머지 O)
- "치료사례" 클릭 시 로그인 체크
- 드롭다운 메뉴: 내 상담/검사결과/경과 리포트

**모바일 레이아웃**:
- 좌측: 로고 + 병원명
- 우측: 치료사례 버튼 + 로그인 버튼/사용자 메뉴

**데스크톱 레이아웃**:
- 좌측: 로고 + 병원명
- 중앙: 네비게이션 링크 (홈/클리닉/치료환경/전문칼럼/병원소개/치료사례)
- 우측: 로그인 버튼 + 상담 신청 버튼

#### 5.2.4 LoginModal.tsx
**Props**:
```typescript
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  purpose?: "cases" | "general";  // 로그인 목적
}
```

**기능**:
- 이메일/비밀번호 폼
- 목적별 안내 메시지 (치료사례 접근 시)
- 유효성 검증
- 로그인 성공 시 목적에 따라 페이지 이동
- 배경 클릭 시 모달 닫기

**현재 상태**: Mock 인증 (실제 API 미연결)

#### 5.2.5 FloatingConsultButton.tsx
**데스크톱 모드**:
- 우측 사이드바에 고정
- 상담 신청 버튼 (큰 핑크 버튼)
- 전화 상담 안내
- 운영 시간 표시

**모바일 모드**:
- 우측 하단에 플로팅
- 핑크 원형 버튼
- 클릭 시 `/reservation` 페이지로 이동

### 5.3 UI 컴포넌트 라이브러리 구조

모든 UI 컴포넌트는 `/src/app/components/ui/` 폴더에 위치하며, Radix UI를 기반으로 작성됨.

**주요 컴포넌트**:
- **버튼**: button.tsx
- **폼**: input.tsx, textarea.tsx, select.tsx, checkbox.tsx, radio-group.tsx
- **레이아웃**: card.tsx, separator.tsx, sheet.tsx, sidebar.tsx
- **오버레이**: dialog.tsx, alert-dialog.tsx, popover.tsx, tooltip.tsx
- **네비게이션**: navigation-menu.tsx, breadcrumb.tsx, pagination.tsx, tabs.tsx
- **데이터**: table.tsx, accordion.tsx, collapsible.tsx
- **피드백**: alert.tsx, progress.tsx, skeleton.tsx, sonner.tsx (Toast)

---

## 6. 인증 시스템

### 6.1 현재 구현 (Mock 인증)

#### AuthContext.tsx 구조

```typescript
interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
```

**현재 동작**:
- `login()`: Mock 사용자 생성 (API 호출 없음)
- `logout()`: 상태 초기화
- `isAuthenticated`: `user` 객체 존재 여부로 판단

### 6.2 Supabase Auth 통합 계획

#### 6.2.1 필요한 환경 변수
```typescript
// /utils/supabase/info.tsx
export const projectId = "pzivoxyngofrrpdjramu"
export const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 6.2.2 Supabase Client 초기화 (예정)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
)
```

#### 6.2.3 Auth 플로우 설계

**회원가입 플로우**:
1. 사용자가 이메일/비밀번호/이름 입력
2. 프론트엔드 → 서버 POST `/make-server-ee767080/auth/signup`
3. 서버: `supabase.auth.admin.createUser()` 호출
4. 이메일 자동 확인 (`email_confirm: true`)
5. 성공 시 사용자 정보 반환

**로그인 플로우**:
1. 사용자가 이메일/비밀번호 입력
2. 프론트엔드: `supabase.auth.signInWithPassword()` 호출
3. 성공 시 `access_token` 획득
4. AuthContext에 사용자 정보 저장
5. 세션 지속 (LocalStorage)

**세션 복원**:
1. 페이지 로드 시 `supabase.auth.getSession()` 호출
2. 유효한 세션이 있으면 자동 로그인

**로그아웃**:
1. `supabase.auth.signOut()` 호출
2. AuthContext 초기화
3. 홈으로 리다이렉트

### 6.3 보호된 라우트 구현 (예정)

```typescript
// ProtectedRoute 컴포넌트
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}

// routes.tsx에 적용
{
  path: "cases",
  element: (
    <ProtectedRoute>
      <Cases />
    </ProtectedRoute>
  )
}
```

### 6.4 관리자 권한 시스템 (예정)

**관리자 계정**:
- `admin@beautiful.com` (시스템 관리자)
- `doctor@beautiful.com` (원장님)

**관리자 전용 기능**:
- 전문 칼럼 작성/수정/삭제
- 이미지 업로드
- 치료 사례 관리

**권한 체크 로직**:
```typescript
const isAdmin = (email: string) => {
  const adminEmails = ['admin@beautiful.com', 'doctor@beautiful.com'];
  return adminEmails.includes(email);
};
```

---

## 7. 백엔드 구조

### 7.1 Supabase Edge Function 설정

**위치**: `/supabase/functions/server/index.tsx`

**프레임워크**: Hono (Express-like routing for Deno)

### 7.2 현재 백엔드 상태

**기본 구조**:
```typescript
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";

const app = new Hono();

// CORS 설정
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// 로깅
app.use('*', logger(console.log));

// 헬스체크
app.get("/make-server-ee767080/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);
```

**현재 상태**: 최소 구성만 존재 (헬스체크만 구현)

### 7.3 구현 필요 API 엔드포인트

#### 7.3.1 인증 관련
```
POST /make-server-ee767080/auth/signup
POST /make-server-ee767080/auth/init-admin
```

#### 7.3.2 전문 칼럼 관리
```
GET    /make-server-ee767080/columns           # 목록 조회
GET    /make-server-ee767080/columns/:id       # 상세 조회
POST   /make-server-ee767080/columns           # 작성 (관리자)
PUT    /make-server-ee767080/columns/:id       # 수정 (관리자)
DELETE /make-server-ee767080/columns/:id       # 삭제 (관리자)
```

#### 7.3.3 이미지 업로드
```
POST /make-server-ee767080/upload               # 이미지 업로드 (관리자)
```

#### 7.3.4 댓글 관리
```
POST   /make-server-ee767080/comments           # 댓글 작성
DELETE /make-server-ee767080/comments/:columnId/:commentId  # 댓글 삭제
```

#### 7.3.5 상담 예약
```
POST /make-server-ee767080/reservations         # 상담 신청
GET  /make-server-ee767080/reservations         # 상담 내역 조회 (로그인)
```

#### 7.3.6 건강검진 문진표
```
POST /make-server-ee767080/health-check         # 문진표 제출
GET  /make-server-ee767080/health-check/:id     # 문진표 조회
```

### 7.4 인증 미들웨어 설계

**JWT 토큰 검증**:
```typescript
const requireAuth = async (c: Context, next: Next) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  // ANON_KEY로 JWT 검증
  const supabaseAuth = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );
  
  const { data: { user }, error } = await supabaseAuth.auth.getUser(accessToken);
  
  if (!user || error) {
    return c.json({ error: '인증이 필요합니다' }, 401);
  }
  
  c.set('user', user);
  await next();
};
```

**관리자 권한 체크**:
```typescript
const requireAdmin = async (c: Context, next: Next) => {
  const user = c.get('user');
  const adminEmails = ['admin@beautiful.com', 'doctor@beautiful.com'];
  
  if (!adminEmails.includes(user.email || '')) {
    return c.json({ error: '관리자 권한이 필요합니다' }, 403);
  }
  
  await next();
};
```

### 7.5 Supabase Storage 통합

**버킷 설정**:
```typescript
const bucketName = "make-ee767080-columns";

// 버킷 초기화
const { data: buckets } = await supabase.storage.listBuckets();
const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
if (!bucketExists) {
  await supabase.storage.createBucket(bucketName, { public: false });
}
```

**이미지 업로드 플로우**:
1. 클라이언트: FormData로 이미지 전송
2. 서버: 인증 확인 → Storage 업로드
3. Signed URL 생성 (1년 유효)
4. URL 반환

---

## 8. 데이터베이스 설계

### 8.1 KV Store 기반 데이터 모델

**특징**:
- Supabase의 `kv_store_ee767080` 테이블 사용
- Key-Value 구조로 유연한 데이터 저장
- 별도 마이그레이션 불필요

**KV Store 유틸리티** (`/supabase/functions/server/kv_store.tsx`):
```typescript
// 단일 조회
await kv.get(key: string): Promise<any>

// 단일 저장
await kv.set(key: string, value: any): Promise<void>

// 단일 삭제
await kv.del(key: string): Promise<void>

// 다중 조회
await kv.mget(keys: string[]): Promise<any[]>

// 다중 저장
await kv.mset(entries: Array<[string, any]>): Promise<void>

// 다중 삭제
await kv.mdel(keys: string[]): Promise<void>

// 접두사 기반 조회
await kv.getByPrefix(prefix: string): Promise<Array<{key: string, value: any}>>
```

### 8.2 데이터 모델 (Key Naming Convention)

#### 8.2.1 전문 칼럼
**키 형식**: `column:{id}`

**데이터 구조**:
```typescript
interface Column {
  id: string;                      // 고유 ID (timestamp-random)
  title: string;                   // 제목
  content: string;                 // 본문 (Markdown 지원)
  category: string;                // 카테고리 (항암/중풍/이명/척추)
  thumbnailUrl: string | null;     // 썸네일 이미지 URL
  authorName: string;              // 작성자 이름
  authorEmail: string;             // 작성자 이메일
  createdAt: string;               // 생성 시간 (ISO 8601)
  updatedAt: string;               // 수정 시간 (ISO 8601)
  views: number;                   // 조회수
}
```

**예시**:
```typescript
await kv.set('column:1704067200000-abc123', {
  id: '1704067200000-abc123',
  title: '항암 치료 중 식이요법의 중요성',
  content: '## 항암 치료 시 영양 관리...',
  category: '항암',
  thumbnailUrl: 'https://...',
  authorName: '시스템 관리자',
  authorEmail: 'admin@beautiful.com',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  views: 0
});
```

#### 8.2.2 댓글
**키 형식**: `comment:{columnId}:{commentId}`

**데이터 구조**:
```typescript
interface Comment {
  id: string;                      // 댓글 ID
  columnId: string;                // 칼럼 ID
  content: string;                 // 댓글 내용
  authorName: string;              // 작성자 이름
  authorEmail: string;             // 작성자 이메일
  createdAt: string;               // 작성 시간
}
```

**예시**:
```typescript
await kv.set('comment:1704067200000-abc123:1704067300000-def456', {
  id: '1704067300000-def456',
  columnId: '1704067200000-abc123',
  content: '유익한 정보 감사합니다!',
  authorName: '김민수',
  authorEmail: 'user@example.com',
  createdAt: '2024-01-01T00:05:00Z'
});
```

#### 8.2.3 상담 예약
**키 형식**: `reservation:{id}`

**데이터 구조**:
```typescript
interface Reservation {
  id: string;
  name: string;                    // 이름
  phone: string;                   // 연락처
  email?: string;                  // 이메일 (선택)
  category: string;                // 상담 분야 (항암/중풍/이명/척추/기타)
  preferredDate: string;           // 희망 날짜
  preferredTime: string;           // 희망 시간
  message: string;                 // 상담 내용
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  userId?: string;                 // 로그인 사용자 ID (선택)
}
```

#### 8.2.4 건강검진 문진표
**키 형식**: `health-check:{id}`

**데이터 구조**:
```typescript
interface HealthCheck {
  id: string;
  userId?: string;                 // 로그인 사용자 ID
  name: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  
  // 문진 항목
  symptoms: string[];              // 현재 증상
  medicalHistory: string[];        // 과거 병력
  medications: string;             // 복용 중인 약
  allergies: string;               // 알레르기
  lifestyle: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;              // 운동 빈도
    sleep: string;                 // 수면 시간
  };
  
  createdAt: string;
  status: 'submitted' | 'reviewed';
}
```

#### 8.2.5 사용자 프로필 (Supabase Auth 연동)
Supabase Auth의 `user_metadata` 사용:
```typescript
interface UserMetadata {
  name: string;                    // 사용자 이름
  phone?: string;                  // 연락처
  birthdate?: string;              // 생년월일
  address?: string;                // 주소
}
```

### 8.3 인덱싱 및 쿼리 패턴

#### 목록 조회 (전체)
```typescript
const allColumns = await kv.getByPrefix('column:');
const columns = allColumns.map(item => item.value);
```

#### 필터링 (카테고리별)
```typescript
const allColumns = await kv.getByPrefix('column:');
const filteredColumns = allColumns
  .map(item => item.value)
  .filter(col => col.category === '항암');
```

#### 정렬 (최신순)
```typescript
columns.sort((a, b) => 
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
```

#### 관계 데이터 조회 (칼럼 + 댓글)
```typescript
const column = await kv.get(`column:${id}`);
const commentsData = await kv.getByPrefix(`comment:${id}:`);
const comments = commentsData.map(item => item.value);
```

---

## 9. 페이지별 상세 구조

### 9.1 Home (홈 페이지)

**URL**: `/`

**섹션 구조**:
1. **히어로 섹션**: 풀스크린 배경 이미지 + 메인 카피
2. **4대 클리닉 카드**: 항암/중풍/이명/척추 클리닉 소개
3. **치료 원리 다이어그램**: 3단계 회복 프로세스
4. **인프라 신뢰 섹션**: 4장의 이미지 그리드
5. **CTA 섹션**: 상담 신청 유도

**데이터**:
```typescript
const clinicCards = [
  {
    id: "cancer-immune",
    title: "항암 중·후 회복",
    description: "항암 순응도 유지 및 부작용 관리 중심 입원 케어",
    icon: Heart,
    image: "https://images.unsplash.com/..."
  },
  // ... 3개 더
];

const principles = [
  {
    step: "스트레스 → 자율신경 → 회복",
    description: "과도한 교감신경을 이완시켜 자연 치유력 기반 회복",
    icon: "🔄"
  },
  // ... 2개 더
];
```

### 9.2 Clinics (클리닉 목록)

**URL**: `/clinics`

**섹션 구조**:
1. **Philosophy Section**: 진료 철학 선언
2. **4대 클리닉 상세**: 각 클리닉별 목표 및 설명
3. **Principles Section**: 공통 적용 원리
4. **CTA Section**: 예약 유도

**클리닉 데이터**:
```typescript
const clinics = [
  {
    id: "cancer",
    title: "통합 암 면역 클리닉",
    headline: "항암을 멈추지 않도록 돕는 병원",
    description: "항암 부작용 관리와 자율신경 안정화를 통해 치료 순응도를 높이고 회복 기반을 유지합니다.",
    goals: ["통증 관리", "수면 개선", "체력 유지", "항암 지속 지원"],
    image: "https://...",
    imagePosition: "left"
  },
  {
    id: "stroke",
    title: "뇌신경 재활 클리닉",
    headline: "신경 가소성 촉진 기반 1:1 집중 재활",
    description: "중풍, 파킨슨병 등 뇌신경 손상 환자의 기능 회복을 위한 맞춤 재활 프로그램",
    goals: ["운동 기능 회복", "인지 기능 개선", "일상 복귀 지원"],
    image: "https://...",
    imagePosition: "right"
  },
  {
    id: "tinnitus",
    title: "이명·두통·어지럼 클리닉",
    headline: "원인 분석 기반 신경 교정 치료",
    description: "자율신경 불균형 해소 및 뇌 혈류 개선을 통한 증상 완화",
    goals: ["이명 강도 감소", "두통 빈도 감소", "균형 감각 회복"],
    image: "https://...",
    imagePosition: "left"
  },
  {
    id: "spine",
    title: "척추·관절 통증 클리닉",
    headline: "신경 압박 해소 중심 치료",
    description: "디스크, 협착증 등 구조적 압박 완화를 통한 통증 감소 및 기능 회복",
    goals: ["통증 감소", "가동 범위 회복", "일상 기능 개선"],
    image: "https://...",
    imagePosition: "right"
  }
];
```

### 9.3 ClinicDetail (클리닉 상세)

**URL**: `/clinics/:id`

**ID 파라미터**:
- `cancer`: 통합 암 면역 클리닉
- `stroke`: 뇌신경 재활 클리닉
- `tinnitus`: 이명·두통·어지럼 클리닉
- `spine`: 척추·관절 통증 클리닉

**섹션 구조**:
1. 클리닉 소개
2. 치료 대상
3. 치료 프로그램
4. 치료 프로세스
5. FAQ
6. 예약 CTA

### 9.4 Facilities (치료환경)

**URL**: `/facilities`

**섹션 구조**:
1. **히어로**: 병원 외관 이미지
2. **시설 소개**: 병실/치료실/편의시설
3. **입원 프로그램**: 1주/2주/4주 프로그램
4. **일일 스케줄**: 시간별 치료 일정
5. **편의시설**: 카페/휴게실/상담실

### 9.5 Columns (전문칼럼)

**URL**: `/columns`

**기능**:
- 칼럼 목록 조회 (카드 그리드)
- 카테고리 필터 (전체/항암/중풍/이명/척추)
- 칼럼 상세 페이지로 이동
- 관리자: 칼럼 작성/수정/삭제 (로그인 필요)

**UI 구성**:
```
[카테고리 탭]
[칼럼 카드 그리드]
  - 썸네일 이미지
  - 제목
  - 요약
  - 작성자
  - 작성일
  - 조회수
```

**데이터 플로우**:
```
GET /make-server-ee767080/columns?category=항암
→ 서버: kv.getByPrefix('column:')
→ 필터링 & 정렬
→ 반환
```

### 9.6 Reservation (상담예약)

**URL**: `/reservation`

**폼 필드**:
```typescript
interface ReservationForm {
  name: string;              // 필수
  phone: string;             // 필수
  email?: string;            // 선택
  category: string;          // 필수 (항암/중풍/이명/척추/기타)
  preferredDate: string;     // 필수
  preferredTime: string;     // 필수 (오전/오후/저녁)
  message: string;           // 필수
}
```

**제출 플로우**:
1. 폼 유효성 검증
2. POST `/make-server-ee767080/reservations`
3. 성공 시 감사 페이지 또는 모달 표시
4. 실패 시 에러 메시지

### 9.7 HealthCheck (건강검진 문진표)

**URL**: `/health-check`

**섹션**:
1. 기본 정보 (이름/나이/성별/연락처)
2. 현재 증상 체크리스트
3. 과거 병력
4. 복용 약물
5. 생활 습관 (흡연/음주/운동/수면)
6. 추가 메모

**제출 플로우**:
1. 다단계 폼 (Step 1 → Step 2 → Step 3)
2. POST `/make-server-ee767080/health-check`
3. 제출 완료 안내

### 9.8 Cases (치료사례)

**URL**: `/cases` (🔒 로그인 필수)

**접근 제어**:
```typescript
// GlobalHeader.tsx
const handleCasesClick = () => {
  if (!isAuthenticated) {
    setLoginPurpose("cases");
    setShowLoginModal(true);  // 로그인 모달 표시
  } else {
    navigate("/cases");
  }
};
```

**콘텐츠 구조**:
- Before/After 이미지
- 환자 정보 (익명화)
- 치료 기간
- 치료 내용
- 결과 요약

### 9.9 MyConsultations (내 상담 내역)

**URL**: `/my-consultations` (🔒 로그인 필수)

**기능**:
- 사용자가 신청한 상담 목록 조회
- 상담 상태별 필터 (대기중/확정/완료/취소)
- 상담 상세 정보 확인

### 9.10 MyResults (내 검사 결과)

**URL**: `/my-results` (🔒 로그인 필수)

**기능**:
- 건강검진 결과 조회
- 진단 검사 결과 조회
- PDF 다운로드

### 9.11 MyReports (치료 경과 리포트)

**URL**: `/my-reports` (🔒 로그인 필수)

**기능**:
- 치료 경과 타임라인
- 증상 변화 그래프
- 의료진 소견
- 다음 치료 계획

### 9.12 About (병원소개)

**URL**: `/about`

**섹션**:
1. 병원 소개 (비전/미션)
2. 의료진 소개
3. 진료 시간
4. 오시는 길 (지도 임베드)
5. 주차 안내
6. 문의처

---

## 10. 개발 환경 설정

### 10.1 프로젝트 시작

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행 (포트: 3000)
pnpm dev

# 프로덕션 빌드
pnpm build
```

### 10.2 환경 변수

**Supabase 환경 변수** (자동 생성):
```typescript
// /utils/supabase/info.tsx
export const projectId = "pzivoxyngofrrpdjramu"
export const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**서버 환경 변수** (Supabase Edge Function):
- `SUPABASE_URL`: Supabase 프로젝트 URL
- `SUPABASE_ANON_KEY`: Public Anon Key (JWT 검증용)
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key (관리 작업용)

### 10.3 파일 구조 요약

```
/
├── package.json                    # 의존성 관리
├── vite.config.ts                  # Vite 설정
├── postcss.config.mjs              # PostCSS 설정
├── /src/
│   ├── /app/
│   │   ├── App.tsx                 # 앱 엔트리포인트
│   │   ├── routes.tsx              # 라우팅 설정
│   │   ├── /contexts/
│   │   │   └── AuthContext.tsx    # 인증 컨텍스트
│   │   ├── /components/
│   │   │   ├── GlobalHeader.tsx   # 전역 헤더
│   │   │   ├── LoginModal.tsx     # 로그인 모달
│   │   │   ├── FloatingConsultButton.tsx
│   │   │   ├── /figma/
│   │   │   │   └── ImageWithFallback.tsx  # 보호됨
│   │   │   └── /ui/               # UI 컴포넌트 라이브러리
│   │   └── /pages/                # 페이지 컴포넌트
│   ├── /styles/
│   │   ├── fonts.css              # 폰트 임포트
│   │   ├── index.css              # 전역 스타일
│   │   ├── tailwind.css           # Tailwind 진입점
│   │   └── theme.css              # 테마 변수
│   └── /imports/                  # Figma 임포트 파일
├── /supabase/
│   └── /functions/
│       └── /server/
│           ├── index.tsx          # Edge Function 메인
│           └── kv_store.tsx       # KV Store 유틸리티 (보호됨)
└── /utils/
    └── /supabase/
        └── info.tsx               # Supabase 정보 (보호됨)
```

### 10.4 보호된 파일 (수정 금지)

다음 파일들은 시스템에서 자동 관리되므로 **절대 수정하지 말 것**:
1. `/src/app/components/figma/ImageWithFallback.tsx`
2. `/pnpm-lock.yaml`
3. `/supabase/functions/server/kv_store.tsx`
4. `/utils/supabase/info.tsx`

### 10.5 스타일 가이드라인

**Tailwind CSS 사용 원칙**:
- 인라인 클래스 우선 사용
- 커스텀 CSS는 `/src/styles/theme.css`에 추가
- 컬러는 CSS 변수 사용 (예: `text-[#E91E7A]` 또는 `text-primary`)

**컴포넌트 작성 원칙**:
- 함수형 컴포넌트 사용
- TypeScript 타입 명시
- Props 인터페이스 정의
- 접근성 고려 (aria-label, role 등)

### 10.6 Git 워크플로우 (권장)

```bash
# Feature 브랜치 생성
git checkout -b feature/column-crud

# 작업 커밋
git add .
git commit -m "feat: 전문칼럼 CRUD 기능 구현"

# 메인 브랜치 병합
git checkout main
git merge feature/column-crud
```

---

## 11. 추가 구현 필요 사항

### 11.1 우선순위 High

1. **Supabase Auth 통합**
   - AuthContext를 실제 Supabase Auth로 교체
   - 로그인/로그아웃/회원가입 API 연결
   - 세션 지속 및 복원

2. **전문 칼럼 CRUD**
   - 백엔드 API 완성
   - 관리자 칼럼 작성 UI
   - 이미지 업로드 기능
   - 댓글 시스템

3. **상담 예약 시스템**
   - 예약 폼 제출 API
   - 예약 확인 이메일/SMS
   - 관리자 예약 관리 페이지

4. **건강검진 문진표**
   - 다단계 폼 UI
   - 제출 API
   - 의료진 검토 페이지

### 11.2 우선순위 Medium

5. **치료 사례 관리**
   - 사례 CRUD API
   - 이미지 업로드 및 관리
   - 익명화 처리

6. **마이페이지 통합**
   - 상담 내역 조회
   - 검사 결과 조회
   - 경과 리포트 조회

7. **알림 시스템**
   - 예약 확정 알림
   - 검사 결과 알림
   - 칼럼 댓글 알림

### 11.3 우선순위 Low

8. **검색 기능**
   - 칼럼 검색
   - 태그 기반 필터링

9. **소셜 로그인**
   - Google/Kakao/Naver 로그인

10. **다국어 지원**
    - 영어/중국어 버전

---

## 12. 의료법 준수 가이드

### 12.1 금지 표현
❌ "치료", "완치", "효과 보장", "최고", "최상"
❌ Before/After 과도한 강조
❌ 의료 기기 광고성 표현

### 12.2 권장 표현
✅ "회복 지원", "관리", "도움", "개선 가능성"
✅ "전문 상담 후 결정"
✅ "개인차가 있을 수 있습니다"

### 12.3 필수 고지 사항
- 의료 행위는 의료진과 상담 후 결정
- 치료 결과는 개인마다 다를 수 있음
- 부작용 가능성 안내

---

## 13. 성능 최적화 전략

### 13.1 이미지 최적화
- Unsplash 이미지 사용 (`utm_source=figma&utm_medium=referral`)
- ImageWithFallback 컴포넌트로 로딩 에러 처리
- Lazy Loading 적용

### 13.2 코드 스플리팅
- React Router 기반 자동 코드 스플리팅
- 동적 import() 사용

### 13.3 캐싱 전략
- Supabase Session 캐싱 (LocalStorage)
- 칼럼 목록 클라이언트 캐싱 (React Query 도입 고려)

---

## 14. 보안 고려사항

### 14.1 프론트엔드
- XSS 방지: 사용자 입력 sanitize
- CSRF 방지: Supabase가 자동 처리
- HTTPS 강제

### 14.2 백엔드
- JWT 토큰 검증 (ANON_KEY 사용)
- 관리자 권한 체크
- Rate Limiting (DDoS 방지)
- SQL Injection 방지 (KV Store는 안전)

### 14.3 데이터 보호
- 개인정보 암호화 저장
- 민감 정보 마스킹 (전화번호, 이메일)
- GDPR/개인정보보호법 준수

---

## 15. 테스트 계획

### 15.1 단위 테스트
- 컴포넌트 렌더링 테스트
- 유틸리티 함수 테스트
- AuthContext 로직 테스트

### 15.2 통합 테스트
- 로그인 플로우 E2E 테스트
- 칼럼 작성 플로우 테스트
- 예약 플로우 테스트

### 15.3 사용자 테스트
- 모바일 기기 실사용 테스트
- 접근성 테스트 (스크린리더)
- 크로스 브라우저 테스트

---

## 16. 배포 체크리스트

### 16.1 프론트엔드
- [ ] 환경 변수 설정
- [ ] 프로덕션 빌드 테스트
- [ ] 이미지 최적화 확인
- [ ] 메타 태그 설정 (SEO)
- [ ] Favicon 설정
- [ ] 404 페이지 처리

### 16.2 백엔드
- [ ] Supabase Edge Function 배포
- [ ] 환경 변수 설정 (URL, Keys)
- [ ] CORS 설정 확인
- [ ] 에러 로깅 설정
- [ ] 관리자 계정 생성

### 16.3 데이터베이스
- [ ] KV Store 테이블 확인
- [ ] Storage 버킷 생성
- [ ] 백업 설정

---

## 17. 유지보수 가이드

### 17.1 정기 점검 항목
- Supabase 사용량 모니터링
- 에러 로그 확인
- 사용자 피드백 수집
- 의료법 준수 여부 재검토

### 17.2 업데이트 정책
- 보안 패치: 즉시 적용
- 기능 추가: 분기별 계획
- 디자인 개선: 사용자 피드백 기반

### 17.3 문서 관리
- API 문서 최신화
- 컴포넌트 문서 작성
- 변경 이력 기록

---

## 18. 연락처 및 지원

### 18.1 개발 관련 문의
- **프로젝트 관리자**: [이메일 주소]
- **기술 지원**: Figma Make Support

### 18.2 의료 콘텐츠 문의
- **원장님**: doctor@beautiful.com
- **시스템 관리자**: admin@beautiful.com

### 18.3 긴급 연락처
- **서버 장애**: [긴급 연락처]
- **보안 이슈**: [보안팀 연락처]

---

## 19. 부록

### 19.1 자주 사용하는 명령어

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 타입 체크
tsc --noEmit

# 린트 (설정 필요)
pnpm lint

# 포맷팅 (설정 필요)
pnpm format
```

### 19.2 유용한 링크
- [React Router 문서](https://reactrouter.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Supabase 문서](https://supabase.com/docs)
- [Radix UI 문서](https://www.radix-ui.com/)
- [Hono 문서](https://hono.dev/)

### 19.3 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**문서 버전**: 1.0.0  
**최종 수정일**: 2026-03-04  
**작성자**: Figma Make AI Assistant

---

이 문서는 뷰티풀한방병원 웹앱의 완전한 아키텍처를 담고 있으며, ChatGPT와의 협업 시 참고 자료로 사용할 수 있습니다. 필요한 부분을 수정하거나 확장하여 사용하세요.
