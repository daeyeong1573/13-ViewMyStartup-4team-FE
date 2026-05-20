<<<<<<< HEAD
import { useState } from "react";
import Pagination from "./Pagination";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // 2. 전체 페이지 개수
  const totalPages = 12;

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>팀 프로젝트 메인 화면</h1>
      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #333",
          borderRadius: "8px",
        }}
      >
        <h2>현재 보여지는 데이터 목록</h2>
        <p>이곳에 팀원들이 각자의 컴포넌트 등을 배치하면 됩니다.</p>
      </div>

      {/* 3. 공용 Pagination 컴포넌트 호출 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
=======
import { Routes, Route } from "react-router-dom";
import CompanyListPage from "./pages/CompanyListPage";
import UiDesignTestPage from "./pages/UiDesignTestPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";
import MyStartupComparePage from "./pages/MyStartupComparePage";
import InvestmentStatusPage from "./pages/InvestmentStatusPage";
import CompareStatusPage from "./pages/CompareStatusPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CompanyListPage />} />
        <Route path="mycompare" element={<MyStartupComparePage />} />
        <Route path="comparestat" element={<CompareStatusPage />} />
        <Route path="investstat" element={<InvestmentStatusPage />} />
        <Route path="test" element={<UiDesignTestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
>>>>>>> 49cd609c19537415d8bb9d292211c9f79b5d0d2b

export default App;
