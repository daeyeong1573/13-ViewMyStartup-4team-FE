import { Routes, Route } from "react-router-dom";
import CompanyListPage from "./pages/CompanyListPage";
import UiDesignTestPage from "./pages/UiDesignTestPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanyListPage />} />
      <Route path="/test" element={<UiDesignTestPage />} />
      <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}

export default App;
