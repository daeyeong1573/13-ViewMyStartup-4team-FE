import { useState } from "react";
import PageNation from "./PageNation";
import styles from "./PageNationTestPage.module.css";

const PageNationTestPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 12;

  return (
    <div className={styles.appContainer}>
      <h1>팀 프로젝트 메인 화면</h1>

      <div className={styles.listContainer}>
        <h2>현재 보여지는 데이터 목록</h2>
        <p>
          지금 사용자가 보고 있는 페이지 번호는 <strong>{currentPage}</strong>{" "}
          페이지입니다.
        </p>
        <p>이곳에 팀원들이 각자의 리스트 컴포넌트 등을 배치하면 됩니다.</p>
      </div>

      <PageNation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PageNationTestPage;
