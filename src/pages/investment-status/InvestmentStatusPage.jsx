import styles from "./InvestmentStatusPage.module.css";
import { useState } from "react";

import { useGetInvestmentList } from "@/hooks/useGetInvestmentList";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";
import { formatCurrencyToKorea } from "@/utils/format";

const INITIAL_FILTER = {
  currentPage: 1,
  limit: 10,
  orderBy: "virtualInvestment_desc",
};

export default function InvestmentStatusPage() {
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

  const sortOptions = [
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

  const handleSortSelect = (option) => {
    console.log("드롭다운에서 선택된 값:", option);

    const selectedValue = typeof option === "string" ? option : option.value;
    setFilter((prev) => ({ ...prev, orderBy: selectedValue, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setFilter((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>투자 현황</h1>
          <div className={styles.filterWrapper}>
            <Dropdown options={sortOptions} onSelect={handleSortSelect} />
          </div>
        </div>

        <div className={styles.tableHeaderWrapper}>
          <div className={styles.tableHeader}>
            <div>순위</div>
            <div>기업명</div>
            <div>기업 소개</div>
            <div>카테고리</div>
            <div>View My Startup 투자 금액</div>
            <div>실제 누적 투자 금액</div>
          </div>
        </div>

        <div className={styles.tableBodyWrapper}>
          {/*삼항 연산자를 중첩하거나 분리하여 로딩 중일 때의 UI를 먼저 출력 */}
          {isLoading ? (
            <div className={styles.loadingState}>
              데이터를 불러오는 중입니다...
            </div>
          ) : companyList.length > 0 ? (
            companyList.map((company, index) => {
              const rank = (currentPage - 1) * limit + index + 1;
              return (
                <div key={company.id} className={styles.tableRow}>
                  <div className={styles.rank}>{rank}위</div>
                  <div className={styles.companyInfo}>
                    <img
                      src={company.imgUrl}
                      alt={`${company.name} 로고`}
                      className={styles.logo}
                    />
                    <span className={styles.companyName}>{company.name}</span>
                  </div>
                  <div
                    className={styles.description}
                    title={company.description}
                  >
                    {company.description}
                  </div>
                  <div className={styles.category}>{company.category}</div>

                  <div className={styles.investAmount}>
                    {formatCurrencyToKorea(
                      company.virtualInvestmentTotal ||
                        company.virtualInvestment ||
                        0,
                    )}
                    원
                  </div>
                  <div className={styles.actualAmount}>
                    {formatCurrencyToKorea(company.totalInvestment || 0)}원
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              투자 현황 데이터가 없습니다.
            </div>
          )}
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
