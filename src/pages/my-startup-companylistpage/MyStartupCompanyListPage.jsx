import { useState } from "react";
import styles from "./MyStartupCompanyListPage.module.css";

import SearchBar from "@/components/ui/SearchBar";
import StartupTable from "./MyStartupCompanyListPageTable";
import Pagination from "@/components/common/Pagination";

const COMPANY_NAME_TEMPLATES = [
  "코드잇",
  "매스프레소",
  "뤼이드",
  "엘리스",
  "아이헤이트플라잉버그스",
];
const CATEGORY_TEMPLATES = ["에듀테크"];
const INVESTMENT_TEMPLATES = ["140억 원", "150억 원", "10억 원"];
const REVENUE_TEMPLATES = [
  "50억 원",
  "42억 원",
  "30억 원",
  "28억 원",
  "5억 원",
];
const EMPLOYEE_TEMPLATES = ["68명", "40명", "102명", "13명", "97명"];

const generateMockData = () => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    rank: index + 1,
    name: COMPANY_NAME_TEMPLATES[index % COMPANY_NAME_TEMPLATES.length],
    description:
      "코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다...",
    category: CATEGORY_TEMPLATES[0],
    cumulativeInvestment:
      INVESTMENT_TEMPLATES[index % INVESTMENT_TEMPLATES.length],
    annualRevenue: REVENUE_TEMPLATES[index % REVENUE_TEMPLATES.length],
    employeeCount: EMPLOYEE_TEMPLATES[index % EMPLOYEE_TEMPLATES.length],
  }));
};

const STARTUP_DATA = generateMockData();

const SortDropdown = ({ value, onChange }) => (
  <select className={styles.sortDropdown} value={value} onChange={onChange}>
    <option value="rank">기본 순</option>
    <option value="revenue">매출액 높은순</option>
    <option value="investment">투자액 높은순</option>
  </select>
);

const MyStartupCompanyListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("rank");
  const itemsPerPage = 15;

  const sortedStartups = [...STARTUP_DATA].sort((a, b) => {
    if (sortOption === "rank") return a.rank - b.rank;
    const valA = parseInt(
      sortOption === "revenue" ? a.annualRevenue : a.cumulativeInvestment,
    );
    const valB = parseInt(
      sortOption === "revenue" ? b.annualRevenue : b.cumulativeInvestment,
    );
    return valB - valA;
  });

  const totalPages = Math.ceil(sortedStartups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStartups = sortedStartups.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className={styles.startupContainer}>
      <main className={styles.mainContent}>
        <div className={styles.listHeader}>
          <h1 className={styles.listTitle}>전체 스타트업 목록</h1>

          <div className={styles.listControls}>
            <div className={styles.searchWrapper}>
              <SearchBar />
            </div>

            <SortDropdown
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <StartupTable data={paginatedStartups} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default MyStartupCompanyListPage;
