import React from "react";
import styles from "./CompareStatusPage.module.css";
import Dropdown from "../../components/common/Dropdown";
import Pagination from "../../components/common/Pagination";
import { useGetCompareStatus } from "@/hooks/useGetCompareStatus";
import { LIMIT } from "@/constants/company";

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
          <table className={styles.tableHeaderContainer}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.colRank}>순위</th>
                <th className={styles.colCompany}>기업 명</th>
                <th className={styles.colIntro}>기업 소개</th>
                <th className={styles.colCategory}>카테고리</th>
                <th className={styles.colCount}>나의 기업 선택 횟수</th>
                <th className={styles.colInvestment}>비교 기업 선택 횟수</th>
              </tr>
            </thead>
            <tbody className={styles.tableBodyContainer}>
              {startups.map((startup, index) => (
                <tr key={startup.id} className={styles.tableBodyRow}>
                  <td className={styles.colRank}>
                    {(page - 1) * LIMIT + index + 1}위
                  </td>

                  <td className={styles.colCompanyBody}>
                    <div className={styles.logoWrapper}>
                      {startup.imgUrl && (
                        <img
                          src={startup.imgUrl}
                          alt="로고"
                          className={styles.companyLogo}
                        />
                      )}
                    </div>
                    <span className={styles.companyNameText}>
                      {startup.name}
                    </span>
                  </td>

                  <td className={styles.colIntro}>
                    <div className={styles.introFlexWrapper}>
                      <p className={styles.introParagraph}>
                        {startup.description}
                      </p>
                    </div>
                  </td>

                  <td className={styles.colCategory}>
                    <span className={styles.categoryNameText}>
                      {startup.category}
                    </span>
                  </td>

                  <td className={styles.colCount}>
                    <span className={styles.countText}>
                      {(startup.myStartupCount ?? 0).toLocaleString()}
                    </span>
                  </td>

                  <td className={styles.colInvestment}>
                    <strong className={styles.investmentText}>
                      {(startup.compareStartupCount ?? 0).toLocaleString()}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
