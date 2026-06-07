Profile Avatar

# 📈 4팀 초급 프로젝트 ViewMyStartup FE

## 👥 팀 소개

**{ 4TEAM }**

> 📋 [팀 노션 바로가기](https://www.notion.so/80c2f79de80783a0a284015743ff7fd6?v=0e72f79de80782889de98818b9a2d6e2&source=copy_link)

| 이름   | GitHub                                           |
| ------ | ------------------------------------------------ |
| 김대영 | [@daeyeong1573](https://github.com/daeyeong1573) |
| 김은진 | [@Eznnni](https://github.com/Eznnni)             |
| 채지훈 | [@jihun-chae](https://github.com/jihun-chae)     |
| 안미영 | [@ANNDAILY](https://github.com/ANNDAILY)         |

---

## 📌 프로젝트 소개

> 최근에는 벤처 캐피탈에 비해 개인 투자자들의 스타트업에 대한 관심이 증가하고 있습니다.
> 하지만 스타트업에 관한 정보 접근성에는 여전히 큰 격차가 존재합니다.
> 이러한 상황을 개선하기 위해, 개인 투자자들이 스타트업을 선택하여 그들의 누적 투자 금액, 매출액 등을 확인하고 비교할 수 있는 모의 투자 서비스를 제작합니다.

**프로젝트 기간** : 2026. 05. 18 ~ 2026. 06. 08

---

## 🛠 기술 스택

| 구분          | 기술                              |
| ------------- | --------------------------------- |
| **Frontend**  | JavaScript, React.js, CSS Modules |
| **Backend**   | Express.js, Prisma ORM            |
| **Database**  | PostgreSQL                        |
| **공통 Tool** | Git & GitHub, Discord             |

---

## 👨‍💻 팀원별 구현 기능 상세

### 김대영

**나의 기업 선택하기**

- 로컬스토리지를 활용한 최근 선택 기업 저장
- 기업 검색 기능
- 전체 리셋 기능

**비교 기업 선택하기**

- 나의 기업으로 선택된 기업 비교 기업 검색 결과 비활성화
- 최대 5개까지 비교 기업 선택 기능

**나의 기업 선택 결과**

- API 연동을 통한 선택 · 비교 기업 정보 파싱
- 선택 기업 기준 ±2 랭크 인접 기업 파싱
- 드롭다운을 통한 정렬 기능

**나의 기업 투자하기**

- 투자하기 / 수정하기 모달 제작
- Zod를 활용한 유효성 검사

### 안미영

**전체 기업 투자 현황 조회**

- 가상 투자 및 실제 투자 금액 조회 (순위, 기업명, 기업 소개, 카테고리, View My Startup 투자 금액, 실제 누적 투자 금액)
- 드롭다운 필터 정렬 기능 (View My Startup 투자 금액 / 실제 누적 투자 금액 기준 오름차순 · 내림차순, 동일 금액 시 기업명 가나다순 2차 정렬)

**Not Found 페이지**

- 404 오류 안내 UI 구현
- 홈으로 돌아가기 기능

### 김은진

**초기 세팅 및 아키텍처**

- Vite (JS + React) 환경 구축
- Prettier / ESLint를 통한 코드 컨벤션 강제
- 폴더 구조 표준화 및 SPA 라우팅 설정

**공통 컴포넌트 시스템**

- `Input`, `Popup`, `Dropdown`, `SearchBar`, `GNB`, `Button` 등 재사용 가능한 공통 컴포넌트 구현
- 디자인 시스템 (스타일 변수) 적용

**기업 상세 페이지**

- 동적 라우팅 구현
- 상세 정보 및 가상 투자 데이터 렌더링
- 투자 생성 / 수정 모달 연동
- 투자 삭제 모달 구현 및 연동

**비교 현황 페이지**

- `<table>` 시맨틱 마크업 리팩터링
- `useGetCompareStatus` 훅을 활용한 데이터 로직 분리
- CSS Modules를 통한 레이아웃 최적화

---

## 📁 폴더 구조

```
src/
├── assets/
├── components/
├── constants/
├── hooks/
├── layouts/
├── pages/
├── schema/
├── services/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

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

## 🌐 구현 홈페이지

> [https://13-view-my-startup-4team-fe.vercel.app/](https://13-view-my-startup-4team-fe.vercel.app/)

---

## 📝 프로젝트 회고록

| 이름   | 링크                                                                                   |
| ------ | -------------------------------------------------------------------------------------- |
| 김대영 | [회고록 보기](https://www.notion.so/4cd2f79de80783daa4ab01a9e2d331e3?source=copy_link) |
| 김은진 | [회고록 보기](https://www.notion.so/3642f79de807809da6fcf7dd16aff300?source=copy_link) |
| 안미영 | [회고록 보기](https://www.notion.so/3642f79de8078040a810ec99abe5c6b3?source=copy_link) |
| 채지훈 | [회고록 보기](https://www.notion.so/3642f79de8078083a2d1f69920d3c421?source=copy_link) |
