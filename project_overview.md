# 프로젝트 개요

- **제목**: Todo List
- **소개**: 할 일 목록을 관리하는 To Do 서비스
- **주요 기술 스택**: Next.js, TypeScript, React
- **디자인 시안**: [Figma 링크](https://www.figma.com/design/zcM3VfCNbtiqt5aLhlv4sV/%5BKDT-%EB%8B%A8%EA%B8%B0%EC%8B%AC%ED%99%94%5D-%EC%A7%80%EC%9B%90%EC%9E%90-%EA%B3%BC%EC%A0%9C?node-id=53-2&t=Elsxy4p3kboqNW6B-1)
- **Swagger 문서**: [API 문서 링크](https://assignment-todolist-api.vercel.app/docs/)
- **API Base URL**: https://assignment-todolist-api.vercel.app/api
  - API 요청을 보낼 시, 본인만의 tenantId(닉네임, 아이디 등 식별자)를 만들어 `https://assignment-todolist-api.vercel.app/api/JHKim` 로 요청을 보내주세요.

---

## 📌 진행 기록 및 예정 사항

### 1. 기획 및 프로젝트 세팅
- [x] 프로젝트 기본 개요 작성
- [x] Figma 디자인 시안 분석 및 요구사항 도출
- [x] Swagger API 명세 분석 및 데이터 타입 정의
- [x] Next.js + TypeScript + React 프로젝트 초기 세팅

### 2. UI/UX 및 공통 컴포넌트 개발
- [x] 디자인 시스템(색상, 폰트 등) 및 글로벌 스타일 설정
- [x] 반응형 공통 레이아웃(헤더, 컨테이너 등) 구현
- [x] 공통 컴포넌트(버튼, 입력창, 체크박스 등) 개발

### 3. API 연동 및 비즈니스 로직
- [x] API 클라이언트 세팅 (Base URL 및 `tenantId` 적용)
- [x] 할 일 CRUD (생성, 조회, 수정, 삭제) 및 이미지 업로드 API 연동 모듈 작성

### 4. 페이지별 기능 구현
- [x] **메인 페이지 (Home)**
  - [x] 할 일 추가 기능 구현
  - [x] TO DO / DONE 리스트 분리 및 Empty State 처리
  - [x] 항목 상태 토글 및 삭제 기능 연결
- [x] **상세 페이지 (Detail)**
  - [x] 상세 데이터 조회 및 렌더링
  - [x] 이미지 첨부 및 썸네일 미리보기 기능 구현
  - [x] 메모 수정 기능 (4줄 이상 스크롤 처리) 구현
  - [x] 변경 사항 저장(수정) 및 삭제 기능 연결

### 5. 마무리 및 배포
- [x] 전체 UI 반응형 테스트 및 버그 수정
- [ ] 프로젝트 배포 (Vercel 등)
- [x] README.md 최종 업데이트
