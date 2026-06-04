import { useState, useMemo } from "react";
import styles from "./MyStartupCompanyListPage.module.css";

import SearchBar from "@/components/ui/SearchBar";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";
import { formatCurrencyToKorea } from "@/utils/format";
import { useGetStartupList } from "@/hooks/useGetStartupList";

const INITIAL_FILTER = {
  currentPage: 1,
  limit: 10,
  orderBy: "totalInvestment_desc",
  keyword: "",
};

const SORT_OPTIONS = [
  { label: "누적 투자금액 높은순", value: "totalInvestment_desc" },
  { label: "누적 투자금액 낮은순", value: "totalInvestment_asc" },
  { label: "매출액 높은순", value: "revenue_desc" },
  { label: "매출액 낮은순", value: "revenue_asc" },
  { label: "고용 인원 많은순", value: "employeeCount_desc" },
  { label: "고용 인원 적은순", value: "employeeCount_asc" },
];

export default function MyStartupCompanyListPage() {
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const { currentPage, limit, orderBy, keyword } = filter;

  const { companyList = [], pagination = {} } = useGetStartupList({
    page: currentPage,
    limit,
    orderBy,
    search: keyword,
  });

  const sortedCompanyList = useMemo(() => {
    if (!companyList || companyList.length === 0) return [];

    const sorted = [...companyList];
    sorted.sort((a, b) => {
      const valA = (key) => Number(a[key] || 0);
      const valB = (key) => Number(b[key] || 0);

      switch (orderBy) {
        case "totalInvestment_desc":
          return valB("totalInvestment") - valA("totalInvestment");
        case "totalInvestment_asc":
          return valA("totalInvestment") - valB("totalInvestment");
        case "revenue_desc":
          return valB("revenue") - valA("revenue");
        case "revenue_asc":
          return valA("revenue") - valB("revenue");
        case "employeeCount_desc":
          return valB("employeeCount") - valA("employeeCount");
        case "employeeCount_asc":
          return valA("employeeCount") - valB("employeeCount");
        default:
          return 0;
      }
    });

    return sorted;
  }, [companyList, orderBy]);

  const handleSearch = (e) => {
    setFilter((prev) => ({ ...prev, keyword: e.target.value, currentPage: 1 }));
  };

  const handleClearSearch = () => {
    setFilter((prev) => ({ ...prev, keyword: "", currentPage: 1 }));
  };

  const handleSortSelect = (option) => {
    const selectedValue = option?.value || option;
    setFilter((prev) => ({ ...prev, orderBy: selectedValue, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setFilter((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentArea}>
        <div className={styles.topSection}>
          <h1 className={styles.pageTitle}>전체 스타트업 목록</h1>

          <div className={styles.actionControls}>
            <SearchBar
              value={keyword}
              onChange={handleSearch}
              onClear={handleClearSearch}
            />
            <div className={styles.dropdownContainer}>
              <Dropdown options={SORT_OPTIONS} onSelect={handleSortSelect} />
            </div>
          </div>
        </div>

        <div className={styles.tableScrollArea}>
          <table className={styles.startupTable}>
            <thead className={styles.theadStyle}>
              <tr>
                <th className={styles.colRank}>순위</th>
                <th className={styles.colCompany}>기업명</th>
                <th className={styles.colDesc}>기업 소개</th>
                <th className={styles.colCategory}>카테고리</th>
                <th className={styles.colInvest}>누적 투자 금액</th>
                <th className={styles.colRevenue}>매출액</th>
                <th className={styles.colEmp}>고용 인원</th>
              </tr>
            </thead>

            <tbody>
              <tr className={styles.spacerRow}>
                <td colSpan="10"></td>
              </tr>
            </tbody>

            <tbody className={styles.tbodyStyle}>
              {sortedCompanyList.length > 0 ? (
                sortedCompanyList.map((company, index) => {
                  const rank = (currentPage - 1) * limit + index + 1;
                  return (
                    <tr key={company.id} className={styles.tbodyRow}>
                      <td className={styles.cellRankText}>{rank}위</td>

                      <td>
                        <div className={styles.cellCompanyWrap}>
                          {company.logo || company.imgUrl ? (
                            <img
                              src={company.logo || company.imgUrl}
                              alt={`${company.name} 로고`}
                              className={styles.brandLogo}
                            />
                          ) : (
                            <div className={styles.brandLogoPlaceholder}></div>
                          )}
                          <span className={styles.brandName}>
                            {company.name}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div
                          className={styles.cellDescText}
                          title={company.description}
                        >
                          {company.description || "-"}
                        </div>
                      </td>

                      <td className={styles.cellStandardText}>
                        {company.category || "-"}
                      </td>

                      <td className={styles.cellAmountText}>
                        {company.totalInvestment || company.cumulativeInvestment
                          ? `${formatCurrencyToKorea(
                              company.totalInvestment ||
                                company.cumulativeInvestment,
                            )} 원`
                          : "-"}
                      </td>

                      <td className={styles.cellAmountText}>
                        {company.revenue || company.annualRevenue
                          ? `${formatCurrencyToKorea(
                              company.revenue || company.annualRevenue,
                            )} 원`
                          : "-"}
                      </td>

                      <td className={styles.cellStandardText}>
                        {company.employeeCount
                          ? `${company.employeeCount}명`
                          : "-"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className={styles.emptyContent}>
                      조건에 맞는 스타트업 데이터가 없습니다.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 1 && (
          <div className={styles.pageNavContainer}>
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
