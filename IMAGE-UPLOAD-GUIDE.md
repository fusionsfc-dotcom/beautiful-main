# 이미지 업로드 가이드

프롬프트에 이미지를 첨부하면 웹사이트에 반영하고 Supabase에 업로드합니다.

## 사용 방법

### 1. 최초 1회: Supabase Storage 설정

`SUPABASE-STORAGE-SETUP.md`를 따라 Storage 버킷과 RLS 정책을 설정하세요.

### 2. 이미지 첨부하여 업로드

채팅에 이미지를 첨부하고 **어디에 사용할지** 알려주세요. 예:

- "이 이미지를 메인 히어로 이미지(hero)로 사용해줘"
- "이 사진을 로고로 바꿔줘"
- "이 이미지를 doctor1(의료진 1번)로 넣어줘"

AI가 이미지를 `uploads/` 폴더에 저장하고 Supabase에 업로드한 뒤 웹사이트에 반영합니다.

### 3. 매핑 가능한 이미지 키

| 키 | 용도 |
|---|---|
| hero | 메인 히어로 이미지 |
| logo | 헤더 로고 |
| doctor1~4 | 병원소개 의료진 사진 |
| consultation | 상담/진료 이미지 |
| cancerClinic | 항암 클리닉 |
| tinnitusClinic | 이명 클리닉 |
| spineJointClinic | 척추·관절 클리닉 |

`uploads/manifest.json`에 더 많은 매핑을 추가할 수 있습니다.

### 4. 수동 업로드

```bash
# 1. 이미지를 uploads/ 폴더에 넣기 (manifest에 정의된 파일명으로)
# 2. 업로드 스크립트 실행
npm run upload-images
```

개발 서버를 재시작하면 새 이미지가 반영됩니다.
