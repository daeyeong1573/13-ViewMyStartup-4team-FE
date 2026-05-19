import { Routes, Route } from "react-router-dom";
import CompanyListPage from "./pages/CompanyListPage";
import UiDesignTestPage from "./pages/UiDesignTestPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanyListPage />} />
      <Route path="/test" element={<UiDesignTestPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
