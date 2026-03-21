좋다. 지금 상황을 기준으로 하면 **Figma Make가 Supabase를 직접 제어해서 전체 시스템을 자동 생성하도록 하는 프롬프트**를 만들어야 한다.
목표는 아래 4가지다.

1. **Supabase Auth 기반 간편 회원가입**
2. **회원만 치료사례 열람**
3. **관리자 계정만 글 작성**
4. **치료사례 게시판 자동 생성**

아래 프롬프트를 그대로 Figma Make에 넣으면 된다.

---

# Figma Make 프롬프트

### Supabase 연결 + 회원 시스템 + 치료사례 게시판 자동 구축

이 웹앱을 Supabase 프로젝트와 연결한다.
Supabase Authentication과 Database를 사용하여 회원가입, 로그인, 권한 관리, 치료사례 게시판을 구현한다.

---

# 1. Supabase 연결

Supabase client를 설정한다.

사용 기능

* Supabase Auth
* Supabase Database
* Supabase Row Level Security

환경 변수

SUPABASE_URL
SUPABASE_ANON_KEY

---

# 2. 회원가입 및 로그인 시스템

간편 회원가입을 구현한다.

회원가입 방식

* 이메일 회원가입
* 구글 로그인 (OAuth)
* 카카오 로그인 (가능하면)

회원가입 시 Supabase auth.users에 자동 등록된다.

회원가입이 완료되면 public.profiles 테이블에 사용자 정보를 자동 생성한다.

필드

id (uuid, auth.users 연결)
email (text)
role (text)
created_at (timestamp)

role 기본값

user

---

# 3. 관리자 계정 구조

profiles.role 값을 기준으로 권한을 구분한다.

role 종류

user
admin

관리자 계정은 다음 권한을 가진다.

* 치료사례 작성
* 치료사례 수정
* 치료사례 삭제
* 치료사례 전체 조회

관리자는 Supabase에서 role을 admin으로 설정한다.

---

# 4. 치료사례 테이블 생성

Supabase database에 cases 테이블을 생성한다.

필드 구조

id (uuid primary key)
title (text)
content (text)
thumbnail (text)
category (text)
created_at (timestamp)
author_id (uuid → profiles.id)

---

# 5. Row Level Security 설정

cases 테이블에 RLS를 적용한다.

정책

비로그인 사용자
→ 접근 불가

로그인 사용자
→ 읽기 가능

관리자
→ 작성, 수정, 삭제 가능

---

# 6. 치료사례 페이지 구현

치료사례 메뉴는 로그인한 사용자만 접근 가능하다.

비로그인 사용자가 접근하면

로그인 페이지로 이동시킨다.

---

# 7. 치료사례 목록 UI

카드형 리스트로 구성한다.

각 카드 구성

* 썸네일 이미지
* 제목
* 간단 요약
* 작성일

클릭 시 치료사례 상세 페이지로 이동한다.

---

# 8. 치료사례 상세 페이지

구성

제목
대표 이미지
본문 내용
작성일

하단에 추천 콘텐츠 영역 표시

---

# 9. 관리자 작성 페이지

관리자 로그인 시

/admin 페이지 접근 가능

기능

치료사례 작성
치료사례 수정
치료사례 삭제

작성 폼

제목
썸네일 업로드
본문 에디터
카테고리 선택

---

# 10. 로그인 상태 UI 변경

비로그인 상태

상단 메뉴

로그인 버튼 표시

로그인 상태

로그아웃 버튼 표시
치료사례 메뉴 활성화

---

# 11. 보안 정책

Supabase RLS 활성화

cases 테이블

읽기

authenticated users

작성

admin role

수정

admin role

삭제

admin role

---

# 12. 향후 확장 고려

다음 데이터를 저장할 수 있도록 구조 확장 가능하게 설계한다.

3분 상태 체크 결과
상담 요청
질환 통계
콘텐츠 조회수

---

# 최종 목표

이 시스템은

병원 홈페이지 + 회원 시스템 + 콘텐츠 관리 시스템(CMS)

으로 동작해야 한다.

---

💡 추가로 하나만 말하겠다.
지금 병원 구조에서는 **치료사례 CMS만 만들면 부족하다.**

반드시 다음도 같이 만들어야 한다.

1️⃣ **3분 상태 체크 결과 저장 DB**
2️⃣ **환자 상담 CRM**
3️⃣ **관리자 대시보드**

이 세 개 붙이면 그냥 **병원 운영 플랫폼**이 된다.

원하면 내가
**Supabase 병원 전체 DB 구조 (완성판)**도 만들어 주겠다.
