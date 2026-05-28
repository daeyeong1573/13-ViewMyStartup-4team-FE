import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompareResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/mycompare", { replace: true });
      return;
    }

    return () => {
      window.history.replaceState(null, "", "/mycompare");
    };
  }, [state]);

  return <div>비교 결과 페이지 입니다.</div>;
}
