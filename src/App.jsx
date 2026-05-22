import { Routes, Route } from "react-router-dom";
import CompanyListPage from "./pages/CompanyListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./layouts/Layout";
import InvestmentStatusPage from "./pages/InvestmentStatusPage";
import CompareStatusPage from "./pages/CompareStatusPage";
import MyStartupCompareSelectPage from "./pages/my-startup-compare/MyStartupCompareSelectPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CompanyListPage />} />
          <Route path="mycompare" element={<MyStartupCompareSelectPage />} />
          <Route path="comparestat" element={<CompareStatusPage />} />
          <Route path="investstat" element={<InvestmentStatusPage />} />
          <Route path="test" element={<UiDesignTestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
