import styles from "./InvestmentStatusPage.module.css";
import { useState } from "react";

import { useGetInvestmentList } from "@/hooks/useGetInvestmentList";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";
import { formatCurrencyToKorea } from "@/utils/format";

import { LIMIT } from "@/constants/company";
import { useNavigate } from "react-router-dom";
import { COMPANIES_ENDPOINT } from "@/constants/api";

const INITIAL_FILTER = {
  currentPage: 1,
  limit: LIMIT,
  orderBy: "virtualInvestment_desc",
};

const SORT_OPTIONS = [
  {
    label: "View My Startup 투자 금액 높은순",
    value: "virtualInvestment_desc",
  },
  {
    label: "View My Startup 투자 금액 낮은순",
    value: "virtualInvestment_asc",
  },
  { label: "실제 누적 투자 금액 높은순", value: "totalInvestment_desc" },
  { label: "실제 누적 투자 금액 낮은순", value: "totalInvestment_asc" },
];

export default function InvestmentStatusPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const { currentPage, limit, orderBy } = filter;

  const {
    companyList = [],
    pagination = {},
    isLoading,
  } = useGetInvestmentList({
    page: currentPage,
    limit,
    orderBy,
  });

  const handleSortSelect = (option) => {
    console.log("드롭다운에서 선택된 값:", option);

    const selectedValue = typeof option === "string" ? option : option.value;
    setFilter((prev) => ({ ...prev, orderBy: selectedValue, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setFilter((prev) => ({ ...prev, currentPage: page }));
  };

  const renderFormattedCurrency = (value) => {
    const formatted = formatCurrencyToKorea(value);
    if (formatted === "-") return "-";

    return formatted.endsWith("원") ? formatted : `${formatted}원`;
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>투자 현황</h1>
          <div className={styles.filterWrapper}>
            <Dropdown options={SORT_OPTIONS} onSelect={handleSortSelect} />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>순위</th>
                <th>기업명</th>
                <th>기업 소개</th>
                <th>카테고리</th>
                <th>View My Startup 투자 금액</th>
                <th>실제 누적 투자 금액</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className={styles.loadingState}>
                    데이터를 불러오는 중입니다...
                  </td>
                </tr>
              ) : companyList.length > 0 ? (
                companyList.map((company, index) => {
                  const rank = (currentPage - 1) * limit + index + 1;
                  return (
                    <tr
                      key={company.id}
                      className={styles.tableRow}
                      onClick={() =>
                        navigate(`${COMPANIES_ENDPOINT}/${company.id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td className={styles.rank}>{rank}위</td>
                      <td>
                        <div className={styles.companyInfo}>
                          <img
                            src={company.imgUrl}
                            alt={`${company.name} 로고`}
                            className={styles.logo}
                          />
                          <span className={styles.companyName}>
                            {company.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          className={styles.description}
                          title={company.description}
                        >
                          {company.description}
                        </div>
                      </td>
                      <td className={styles.category}>{company.category}</td>
                      <td className={styles.investAmount}>
                        {renderFormattedCurrency(
                          company.virtualInvestmentTotal ||
                            company.virtualInvestment ||
                            0,
                        )}
                      </td>
                      <td className={styles.actualAmount}>
                        {renderFormattedCurrency(company.totalInvestment || 0)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    투자 현황 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}
