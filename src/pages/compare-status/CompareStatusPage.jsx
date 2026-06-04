import React from "react";
import styles from "./CompareStatusPage.module.css";
import Dropdown from "../../components/common/Dropdown";
import Pagination from "../../components/common/Pagination";
import { useGetCompareStatus } from "@/hooks/useGetCompareStatus";

const COMPARE_STATUS_OPTIONS = [
  { label: "나의 기업 선택 횟수 높은순", value: "myStartupCount_desc" },
  { label: "나의 기업 선택 횟수 낮은순", value: "myStartupCount_asc" },
  { label: "비교 기업 선택 횟수 높은순", value: "compareStartupCount_desc" },
  { label: "비교 기업 선택 횟수 낮은순", value: "compareStartupCount_asc" },
];

export default function CompareStatusPage() {
  const { startups, currentSort, setCurrentSort, page, setPage, totalPages } =
    useGetCompareStatus(COMPARE_STATUS_OPTIONS[0]);
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.pageTitle}>비교 현황</h2>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              options={COMPARE_STATUS_OPTIONS}
              selected={currentSort}
              onSelect={(chosenOption) => {
                setCurrentSort(chosenOption);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <div className={styles.tableHeaderContainer}>
            <div className={styles.tableHeaderRow}>
              <div className={styles.colRank}>순위</div>
              <div className={styles.colCompany}>기업 명</div>{" "}
              <div className={styles.colIntro}>기업 소개</div>
              <div className={styles.colCategory}>카테고리</div>
              <div className={styles.colCount}>나의 기업 선택 횟수</div>
              <div className={styles.colInvestment}>비교 기업 선택 횟수</div>
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
                    {(startup.compareStartupCount || 0).toLocaleString()}
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
