import { useState, useMemo, useEffect, useRef } from "react";
import styles from "./MyStartupCompanyListPage.module.css";

import SearchBar from "@/components/ui/SearchBar";
import StartupTable from "./MyStartupCompanyListPageTable";
import Pagination from "@/components/common/Pagination";

import codeitLogo from "@/assets/CompanyLogo/codeit.png";
import mathpressoLogo from "@/assets/CompanyLogo/mathpresso.png";
import riiidLogo from "@/assets/CompanyLogo/riiid.png";
import eliceLogo from "@/assets/CompanyLogo/elice.png";
import mildangLogo from "@/assets/CompanyLogo/mildang.png";

const COMPANY_NAME_TEMPLATES = [
  "코드잇",
  "매스프레소",
  "뤼이드",
  "엘리스",
  "아이헤이트플라잉버그스",
];

const LOGO_MAP = {
  코드잇: codeitLogo,
  매스프레소: mathpressoLogo,
  뤼이드: riiidLogo,
  엘리스: eliceLogo,
  아이헤이트플라잉버그스: mildangLogo,
};

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
  return Array.from({ length: 100 }, (_, index) => {
    const name = COMPANY_NAME_TEMPLATES[index % COMPANY_NAME_TEMPLATES.length];
    return {
      id: index + 1, // 고유 식별자 (원래 순서 기억용)
      rank: index + 1,
      name: name,
      logo: LOGO_MAP[name],
      description:
        "코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다...",
      category: CATEGORY_TEMPLATES[0],
      cumulativeInvestment:
        INVESTMENT_TEMPLATES[index % INVESTMENT_TEMPLATES.length],
      annualRevenue: REVENUE_TEMPLATES[index % REVENUE_TEMPLATES.length],
      employeeCount: EMPLOYEE_TEMPLATES[index % EMPLOYEE_TEMPLATES.length],
    };
  });
};

const STARTUP_DATA = generateMockData();
const SORT_OPTIONS = [
  { label: "누적 투자금액 높은순", value: "invest_desc" },
  { label: "누적 투자금액 낮은순", value: "invest_asc" },
  { label: "매출액 높은순", value: "revenue_desc" },
  { label: "매출액 낮은순", value: "revenue_asc" },
  { label: "고용 인원 많은순", value: "emp_desc" },
  { label: "고용 인원 적은순", value: "emp_asc" },
];

const CustomDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    SORT_OPTIONS.find((opt) => opt.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <span className={styles.dropdownIcon}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="4"
              stroke="#888888"
              strokeWidth="1.5"
            />
            <path
              d="M7 10L12 15L17 10"
              stroke="#888888"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {SORT_OPTIONS.map((option) => (
            <li
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MyStartupCompanyListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("rank");
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");

  const sortedStartups = useMemo(() => {
    const filtered = STARTUP_DATA.filter((startup) =>
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sorted = filtered.sort((a, b) => {
      const getNum = (str) => parseInt(str.replace(/[^0-9]/g, "")) || 0;

      switch (sortOption) {
        case "rank":
          return a.id - b.id;
        case "invest_desc":
          return (
            getNum(b.cumulativeInvestment) - getNum(a.cumulativeInvestment)
          );
        case "invest_asc":
          return (
            getNum(a.cumulativeInvestment) - getNum(b.cumulativeInvestment)
          );
        case "revenue_desc":
          return getNum(b.annualRevenue) - getNum(a.annualRevenue);
        case "revenue_asc":
          return getNum(a.annualRevenue) - getNum(b.annualRevenue);
        case "emp_desc":
          return getNum(b.employeeCount) - getNum(a.employeeCount);
        case "emp_asc":
          return getNum(a.employeeCount) - getNum(b.employeeCount);
        default:
          return a.id - b.id;
      }
    });

    return sorted.map((startup, index) => ({
      ...startup,
      rank: index + 1,
    }));
  }, [searchTerm, sortOption]);

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
              <SearchBar
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                onClear={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              />
            </div>

            <CustomDropdown
              value={sortOption}
              onChange={(value) => {
                setSortOption(value);
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
