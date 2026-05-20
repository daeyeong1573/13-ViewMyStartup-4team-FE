<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 📈 4팀 초급 프로젝트 ViewMyStartup FE

> 최근에는 벤처 캐피탈에 비해 개인 투자자들의 스타트업에 대한 관심이 증가하고 있습니다.
> 하지만 스타트업에 관한 정보 접근성에는 여전히 큰 격차가 존재합니다.
> 이러한 상황을 개선하기 위해, 개인 투자자들이 스타트업을 선택하여 그들의 누적 투자 금액, 매출액 등을 확인하고 비교할 수 있는 모의 투자 서비스를 제작합니다.

---

## 📌 브랜치 전략

| 브랜치   | 설명               |
| -------- | ------------------ |
| `main`   | 기준 브랜치        |
| `dev`    | 통합 테스트 브랜치 |
| `feat/*` | 기능 개발 브랜치   |

### 브랜치 흐름

```
feat/* → dev → main
```

### 브랜치 규칙

- **feat/**: 기능 개발 시 `dev` 브랜치에서 분기하여 작업합니다.

```bash
  git checkout dev
  git checkout -b feat/기능명
```

- **dev**: 각 기능 개발 완료 후 PR을 통해 병합하고 통합 테스트를 진행합니다.
- **main**: 테스트가 완료된 `dev` 브랜치를 병합하여 배포합니다.

---

## 📌 커밋 컨벤션

| 타입       | 설명                 |
| ---------- | -------------------- |
| `feat`     | 새로운 기능 추가     |
| `fix`      | 버그 수정            |
| `refactor` | 코드 리팩토링        |
| `chore`    | 빌드, 설정 파일 수정 |

**예시**

```
feat: 게시글 등록 API 추가
fix: 댓글 목록 조회 필터 오류 수정
docs: API 명세서 업데이트
```

---

## 🛠️ 기술 스택

| 분류                      | 기술             |
| :------------------------ | :--------------- |
| **라이브러리/프레임워크** | React + Vite     |
| **언어**                  | JavaScript       |
| **스타일**                | CSS Modules      |
| **라우팅**                | React Router DOM |
| **유효성 검사**           | Zod              |
| **배포**                  | Netlify          |

---

## 📂 폴더 구조

```
# 📂 View My Startup - FE Folder Structure

src/
├── 📁 assets/             # 이미지, 아이콘, 폰트 등 정적 리소스
├── 📁 components/         # 재사용 가능한 컴포넌트
│   ├── 📁 common/         # Pagination, Table, Modal 등 공통 UI
│   └── 📁 ui/             # 버튼, 입력창 등 기초 원자 컴포넌트
├── 📁 constants/          # 상수 관리
│   └── 📄 api.js          # BASE_URL 및 API 엔드포인트 상수
├── 📁 hooks/              # usePageSize 등 공통 커스텀 훅
├── 📁 layouts/            # Header, Footer를 포함한 공통 레이아웃
├── 📁 pages/              # 도메인별 페이지 구성
├── 📁 services/           # API 호출 로직 (api.js)
├── 📁 styles/             # 전역 스타일 및 변수
│   ├── 📄 reset.css       # 브라우저 스타일 초기화
│   └── 📄 variables.module.css # 공통 색상/폰트 변수
├── 📁 utils/              # 유틸리티 함수
│   └── 📄 schema.js       # Zod를 활용한 유효성 검사 스키마
├── 📄 App.jsx             # React Router 경로 설정
└── 📄 main.jsx            # Entry point 및 StrictMode 적용

# ⚙️ Configuration Files (Root)
├── 📄 .gitignore          # 불필요 파일 업로드 차단
├── 📄 .prettierrc         # 코드 포맷팅 규칙
├── 📄 eslint.config.js    # 린트 설정
├── 📄 netlify.toml        # netlify 빌드 설정
└── 📄 package.json        # 의존성 및 스크립트 관리
```
>>>>>>> 49cd609c19537415d8bb9d292211c9f79b5d0d2b
