import { Routes, Route } from "react-router-dom";
import CompanyListPage from "./pages/CompanyListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";
import InvestmentStatusPage from "./pages/investment-status/InvestmentStatusPage";
import CompareStatusPage from "./pages/compare-status/CompareStatusPage";
import MyStartupCompareSelectPage from "./pages/my-startup-compare/MyStartupCompareSelectPage";
import CompanyDetailPage from "./pages/detail-page/CompanyDetailPage";
import CompareResultPage from "./pages/my-startup-compare/CompareResultPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CompanyListPage />} />
          <Route path="mycompare" element={<MyStartupCompareSelectPage />} />
          <Route path="mycompare/result" element={<CompareResultPage />} />
          <Route path="comparestat" element={<CompareStatusPage />} />
          <Route path="investstat" element={<InvestmentStatusPage />} />
          {/* 임시 라우트 */}
          <Route path="companydetail" element={<CompanyDetailPage />} />
          {/*//TODO <Route path="companies/:id" element={<CompanyDetailPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
