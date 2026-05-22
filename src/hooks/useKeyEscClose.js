import { useEffect } from "react";

export const useKeyEscClose = (closeThing) => {
  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.key === "Escape") {
        closeThing();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, [closeThing]); // ← 의존성 배열에 추가
};
