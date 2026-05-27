import { Routes, Route } from "react-router-dom";
import CompanyListPage from "./pages/my-startup-companylistpage/MyStartupCompanyListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";
import InvestmentStatusPage from "./pages/InvestmentStatusPage";
import CompareStatusPage from "./pages/CompareStatusPage";
import MyStartupCompareSelectPage from "./pages/my-startup-compare/MyStartupCompareSelectPage";
import CompanyDetailPage from "./pages/detail-page/CompanyDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CompanyListPage />} />
          <Route path="mycompare" element={<MyStartupCompareSelectPage />} />
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
