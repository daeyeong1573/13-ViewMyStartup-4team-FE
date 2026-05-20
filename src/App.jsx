import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import CompanyListPage from "./pages/CompanyListPage";
import UiDesignTestPage from "./pages/UiDesignTestPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";
import MyStartupComparePage from "./pages/MyStartupComparePage";
import InvestmentStatusPage from "./pages/InvestmentStatusPage";
import CompareStatusPage from "./pages/CompareStatusPage";
import PageNation from "./components/common/PagiNation";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 15;
  return (
    <>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default App;
