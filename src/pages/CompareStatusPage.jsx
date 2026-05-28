import React, { useState, useEffect } from "react";
import styles from "./CompareStatusPage.module.css";
import Dropdown from "../components/common/Dropdown";
import Pagination from "../components/common/Pagination";

export default function CompareStatusPage() {
  const comparePageOptions = [
    { label: "나의 기업 선택 횟수 높은순", value: "myStartupCount_desc" },
    { label: "나의 기업 선택 횟수 낮은순", value: "myStartupCount_asc" },
    { label: "실제 누적 투자 금액 높은순", value: "investmentAmount_desc" },
    { label: "실제 누적 투자 금액 낮은순", value: "investmentAmount_asc" },
  ];

  // currentSort의 초기값으로 첫 번째 옵션 객체를 할당합니다.
  const [currentSort, setCurrentSort] = useState(comparePageOptions[0]);
  const [startups, setStartups] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCompareData = async () => {
      try {
        const sortValue =
          currentSort && typeof currentSort === "object"
            ? currentSort.value
            : currentSort;

        const response = await fetch(
          `http://localhost:3000/startups?orderBy=${sortValue}&page=${page}&limit=5`,
        );
        const resBody = await response.json();
        setStartups(resBody.data || []);
        if (resBody.pagination) {
          setTotalPages(resBody.pagination.totalPages || 1);
        }
      } catch (error) {
        console.error("연동 에러:", error);
      }
    };
    fetchCompareData();
  }, [currentSort, page]);

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.pageTitle}>비교 현황</h2>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              options={comparePageOptions}
              selected={currentSort}
              onSelect={(chosenOption) => {
                // 💥 드롭다운 클릭 시 넘어오는 값(객체든 문자열이든) 상태에 그대로 주입
                setCurrentSort(chosenOption);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* 간소화된 기업 리스트 */}
        <div className={styles.listContainer}>
          {startups.map((startup, index) => (
            <div key={startup.id} className={styles.startupListItem}>
              <div className={styles.leftSection}>
                <div className={styles.rankNumber}>
                  {(page - 1) * 5 + index + 1}
                </div>
                <div className={styles.logoContainer}>
                  {startup.imgUrl && (
                    <img
                      src={startup.imgUrl}
                      alt="로고"
                      className={styles.logoImage}
                    />
                  )}
                </div>
              </div>

              <div className={styles.middleSection}>
                <h3 className={styles.startupName}>{startup.name}</h3>
                <span className={styles.categoryTag}>{startup.category}</span>
                <p className={styles.startupDescription}>
                  {startup.description}
                </p>
              </div>

              <div className={styles.rightSection}>
                <div className={styles.metaDataBlock}>
                  <span>나의 기업 선택 횟수 : </span>
                  <strong>{startup.myStartupCount}회</strong>
                </div>
                <div className={styles.metaDataBlock}>
                  <span>실제 누적 투자 금액 : </span>
                  <strong>{startup.totalInvestment}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(targetPage) => setPage(targetPage)}
          />
        </div>
      </main>
    </div>
  );
}
