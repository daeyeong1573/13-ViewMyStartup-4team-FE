import styles from "./InvestmentStatusPage.module.css";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";
import { formatCurrencyToKorea } from "@/utils/format";

function InvestmentStatusPage() {
  const currentPage = 1;
  const limit = 10;
  const pagination = { totalPages: 5 };

  const companyList = [
    {
      id: 1,
      name: "테스트 스타트업 A",
      description:
        "이것은 UI 퍼블리싱을 테스트하기 위한 기업 소개글입니다. 2줄 이상 길어졌을 때 말줄임표 처리가 예쁘게 잘 되는지 확인합니다.",
      category: "IT/플랫폼",
      virtualInvestment: 1000000000,
      totalInvestment: 5000000000,
      imgUrl: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "테스트 스타트업 B",
      description: "테스트 기업입니다.",
      category: "에듀테크",
      virtualInvestmentTotal: 500000000,
      totalInvestment: 2500000000,
      imgUrl: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "테스트 스타트업 c",
      description: "테스트 기업입니다.",
      category: "에듀테크",
      virtualInvestmentTotal: 400000000,
      totalInvestment: 1500000000,
      imgUrl: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "테스트 스타트업 D",
      description: "테스트 기업입니다.",
      category: "에듀테크",
      virtualInvestmentTotal: 300000000,
      totalInvestment: 1000000000,
      imgUrl: "https://via.placeholder.com/40",
    },
  ];

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

  return (
    <main className={styles.mainContainer}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>투자 현황</h1>
          <div className={styles.filterWrapper}>
            <Dropdown options={sortOptions} onSelect={() => {}} />
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
          {companyList.map((company, index) => {
            const rank = index + 1;
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
                <div className={styles.description} title={company.description}>
                  {company.description}
                </div>
                <div className={styles.category}>{company.category}</div>
                <div className={styles.investAmount}>
                  {formatCurrencyToKorea(
                    company.virtualInvestmentTotal || company.virtualInvestment,
                  )}
                  원
                </div>
                <div className={styles.actualAmount}>
                  {formatCurrencyToKorea(company.totalInvestment)}원
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </main>
  );
}

export default InvestmentStatusPage;
