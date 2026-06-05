import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CompareResultPage.module.css";
import CardArea from "@/components/common/startup-compare/CardArea";
import CompanyCard from "@/components/ui/CompanyCard";
import Dropdown from "@/components/common/Dropdown";
import Button from "@/components/ui/Button";
import defaultLogo from "@/assets/images/img_gnb_logo.png";
import { formatCurrencyToKorea } from "@/utils/format";
import useGetCompareResult from "@/hooks/useGetCompareResult";
import useGetCompareRank from "@/hooks/useGetCompareRank";
import { STARTUP_SORT_OPTIONS } from "@/constants/startupSort";
import InvestmentsModal from "@/components/modal/InvestmentsModal";

export default function CompareResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [compareSort, setCompareSort] = useState(STARTUP_SORT_OPTIONS[0].value);
  const [rankSort, setRankSort] = useState(STARTUP_SORT_OPTIONS[0].value);
  const { myStartupId, compareStartupIds } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { myStartup, compareResultList } = useGetCompareResult({
    myStartupId,
    compareStartupIds,
    orderBy: compareSort,
  });

  const { compareRankList } = useGetCompareRank({
    myStartupId,
    orderBy: rankSort,
  });

  useEffect(() => {
    if (!state) {
      navigate("/mycompare", { replace: true });
      return;
    }
    return () => {
      window.history.replaceState(null, "", "/mycompare");
    };
  }, [state, navigate]);
  if (!state) return null;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.inner}>
        {/* 내가 선택한 기업 */}
        <CardArea
          header="내가 선택한 기업"
          label="나의 기업"
          actionButton={
            <Button variant="solid" onClick={() => navigate("/mycompare")}>
              다른 기업 비교하기
            </Button>
          }
        >
          {myStartup ? (
            <CompanyCard
              image={myStartup.imgUrl}
              name={myStartup.name}
              category={myStartup.category}
              singleSelect
            />
          ) : (
            <p className={styles.emptyText}>기업 정보를 불러오는 중...</p>
          )}
        </CardArea>

        {/* 비교 결과 확인하기 */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>비교 결과 확인하기</h2>
          <Dropdown
            options={STARTUP_SORT_OPTIONS}
            onSelect={(opt) => setCompareSort(opt.value)}
          />
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>기업 명</th>
                <th>기업 소개</th>
                <th>카테고리</th>
                <th>누적 투자 금액</th>
                <th>매출액</th>
                <th>고용 인원</th>
              </tr>
            </thead>
            <tbody>
              {compareResultList.map((company) => (
                <tr
                  key={company.id}
                  className={`${company.id === myStartupId ? styles.myCompanyRow : ""}`}
                >
                  <td>
                    <div className={styles.companyNameCell}>
                      <img
                        src={company.imgUrl || defaultLogo}
                        alt={`기업 ${company.name} 로고`}
                        className={styles.rowLogo}
                        onError={(e) => {
                          e.target.src = defaultLogo;
                        }}
                      />
                      <span>{company.name}</span>
                    </div>
                  </td>
                  <td>
                    <p className={styles.descCell}>{company.description}</p>
                  </td>
                  <td>{company.category}</td>
                  <td>{formatCurrencyToKorea(company.totalInvestment)}</td>
                  <td>{formatCurrencyToKorea(company.revenue)}</td>
                  <td>{company.employeeCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 기업 순위 확인하기 */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>기업 순위 확인하기</h2>
          <Dropdown
            options={STARTUP_SORT_OPTIONS}
            onSelect={(opt) => setRankSort(opt.value)}
          />
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>순위</th>
                <th>기업 명</th>
                <th>기업 소개</th>
                <th>카테고리</th>
                <th>누적 투자 금액</th>
                <th>매출액</th>
                <th>고용 인원</th>
              </tr>
            </thead>
            <tbody>
              {compareRankList.map((company) => (
                <tr
                  key={company.id}
                  className={
                    company.id === myStartupId ? styles.myCompanyRow : ""
                  }
                >
                  <td className={styles.rankCell}>{company.rank}위</td>
                  <td>
                    <div className={styles.companyNameCell}>
                      <img
                        src={company.imgUrl || defaultLogo}
                        alt={`기업 ${company.name} 로고`}
                        className={styles.rowLogo}
                        onError={(e) => {
                          e.target.src = defaultLogo;
                        }}
                      />
                      <span>{company.name}</span>
                    </div>
                  </td>
                  <td>
                    <p className={styles.descCell}>{company.description}</p>
                  </td>
                  <td>{company.category}</td>
                  <td>{formatCurrencyToKorea(company.totalInvestment)}</td>
                  <td>{formatCurrencyToKorea(company.revenue)}</td>
                  <td>
                    {company.employeeCount != null
                      ? `${company.employeeCount}명`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <Button variant="solid" onClick={() => setIsModalOpen(true)}>
            나의 기업에 투자하기
          </Button>
        </div>
      </div>

      <InvestmentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={myStartup}
        mode="create"
        onSubmit={(formData) => {
          console.log(formData);
          setIsModalOpen(false);
        }}
      />
    </main>
  );
}
