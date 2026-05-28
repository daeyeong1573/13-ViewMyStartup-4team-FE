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

  const [currentSort, setCurrentSort] = useState(comparePageOptions);
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
          `http://localhost:3000/compare/status?orderBy=${sortValue}&page=${page}&limit=10`,
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
                setCurrentSort(chosenOption);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          {/* ① 상단 헤더 라인 (기존 유지: 기업 명 제목 위치 고정) */}
          <div className={styles.tableHeaderContainer}>
            <div className={styles.tableHeaderRow}>
              <div className={styles.colRank}>순위</div>
              <div className={styles.colCompany}>기업 명</div>{" "}
              {/* ◀ 헤더 제목은 그대로 유지 */}
              <div className={styles.colIntro}>기업 소개</div>
              <div className={styles.colCategory}>카테고리</div>
              <div className={styles.colCount}>나의 기업 선택 횟수</div>
              <div className={styles.colInvestment}>실제 누적 투자 금액</div>
            </div>
          </div>

          <div className={styles.tableBodyContainer}>
            {startups.map((startup, index) => (
              <div key={startup.id} className={styles.tableBodyRow}>
                <div className={styles.colRank}>
                  {(page - 1) * 10 + index + 1}위
                </div>

                <div className={styles.colCompanyBody}>
                  <div className={styles.logoWrapper}>
                    {startup.imgUrl && (
                      <img
                        src={startup.imgUrl}
                        alt="로고"
                        className={styles.companyLogo}
                      />
                    )}
                  </div>
                  <span className={styles.companyNameText}>{startup.name}</span>
                </div>

                <div className={styles.colIntro}>
                  <div className={styles.introFlexWrapper}>
                    <p className={styles.introParagraph}>
                      {startup.description}
                    </p>
                  </div>
                </div>

                <div className={styles.colCategory}>
                  <span className={styles.categoryNameText}>
                    {startup.category}
                  </span>
                </div>

                <div className={styles.colCount}>
                  <span className={styles.countText}>
                    {(startup.myStartupCount || 0).toLocaleString()}
                  </span>
                </div>

                <div className={styles.colInvestment}>
                  <strong className={styles.investmentText}>
                    {(startup.totalInvestment || 0).toLocaleString()}
                  </strong>
                </div>
              </div>
            ))}
          </div>
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
