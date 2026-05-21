import { Routes, Route } from "react-router-dom";
import CompanyListPage from "./pages/CompanyListPage";
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
