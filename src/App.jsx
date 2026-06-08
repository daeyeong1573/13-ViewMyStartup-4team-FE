import { Routes, Route } from "react-router-dom";
import MyStartupCompanyListPage from "./pages/my-startup-companylistpage/MyStartupCompanyListPage";

import NotFoundPage from "./pages/not-found-page/NotFoundPage";
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
          <Route index element={<MyStartupCompanyListPage />} />
          <Route path="mycompare" element={<MyStartupCompareSelectPage />} />
          <Route path="mycompare/result" element={<CompareResultPage />} />
          <Route path="comparestat" element={<CompareStatusPage />} />
          <Route path="investstat" element={<InvestmentStatusPage />} />
          <Route path="companies/:id" element={<CompanyDetailPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
