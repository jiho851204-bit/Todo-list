# Todo List 서비스

할 일 목록을 관리할 수 있는 심플하고 직관적인 웹 애플리케이션입니다. Next.js와 TypeScript로 개발되었으며, 외부 API와 연동하여 할 일과 이미지를 관리합니다.

## 🚀 프로젝트 시작하기

### 1. 패키지 설치
```bash
npm install
# 혹은
yarn install
```

### 2. 로컬 서버 실행
```bash
npm run dev
# 혹은
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 결과를 확인할 수 있습니다.

## 💻 주요 기능 및 스택

- **기술 스택**: Next.js 14/15 (App Router), TypeScript, React, Tailwind CSS
- **디자인 시스템**: 네오 브루탈리즘 스타일 완벽 구현, 반응형 레이아웃 (모바일, 태블릿, PC 지원), 피그마 시안 100% 매칭
- **주요 기능**:
  - 할 일 목록 조회 (TO DO / DONE 리스트 분리 및 커스텀 Empty State 적용)
  - 할 일 추가 (버튼 클릭 및 Enter 키 입력 지원)
  - 할 일 완료/미완료 토글 및 삭제 기능
  - 할 일 상세 정보 수정 (이름, 상태, 메모, 이미지)
  - **이미지 업로드 보안 로직**: 5MB 용량 제한 및 순수 영문명 파일만 허용하는 정규식 검사 구현
  - **디테일 UX**: 로고 클릭 시 페이지 전체 새로고침, 긴 메모 입력 시 스크롤 등 필수 요구사항 전면 반영
  - 4줄 이상 입력 시 자동 스크롤되는 메모 작성 폼

## 📂 폴더 구조

- `src/app/`: Next.js App Router 기반의 페이지 및 레이아웃 폴더
  - `page.tsx`: 할 일 목록 메인 페이지
  - `items/[itemId]/page.tsx`: 할 일 상세 및 수정 페이지
  - `globals.css`: TailwindCSS 테마 설정 및 글로벌 폰트 적용
  - `layout.tsx`: 공통 앱 컨테이너
- `src/components/`: 공통으로 사용되는 UI 컴포넌트 폴더 (`Button`, `Input`, `Header`, `TodoCard`)
- `src/lib/`: 외부 API 클라이언트 및 유틸리티 로직 (`api.ts`)
- `src/types/`: TypeScript 타입 및 인터페이스 정의 (`todo.ts`)

## 📌 주의사항
- 본 프로젝트는 `https://assignment-todolist-api.vercel.app/api/JHKim` 엔드포인트를 기본으로 사용하도록 셋팅되어 있습니다. (`src/lib/api.ts` 에서 `tenantId` 변경 가능)
