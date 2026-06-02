import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CompareResultPage.module.css";
import CardArea from "@/components/common/startup-compare/CardArea";
import CompanyCard from "@/components/ui/CompanyCard";
import Dropdown from "@/components/common/Dropdown";
import Button from "@/components/ui/Button";
import { useMyCompanyStorage } from "@/hooks/useMyCompanyStorage";
import defaultLogo from "@/assets/images/default_image.png";
import { formatCurrencyToKorea } from "@/utils/format";

const COMPARE_SORT_OPTIONS = [
  { label: "누적 투자금액 높은순", value: "totalInvestment_desc" },
  { label: "누적 투자금액 낮은순", value: "totalInvestment_asc" },
  { label: "매출액 높은순", value: "revenue_desc" },
  { label: "매출액 낮은순", value: "revenue_asc" },
  { label: "고용 인원 많은순", value: "employees_desc" },
  { label: "고용 인원 적은순", value: "employees_asc" },
];

const RANK_SORT_OPTIONS = [
  { label: "매출액 높은순", value: "revenue_desc" },
  { label: "매출액 낮은순", value: "revenue_asc" },
  { label: "누적 투자금액 높은순", value: "totalInvestment_desc" },
  { label: "누적 투자금액 낮은순", value: "totalInvestment_asc" },
  { label: "고용 인원 많은순", value: "employees_desc" },
  { label: "고용 인원 적은순", value: "employees_asc" },
];

export default function CompareResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { myCompanyStorageList } = useMyCompanyStorage();

  const [compareSort, setCompareSort] = useState(COMPARE_SORT_OPTIONS[0].value);
  const [rankSort, setRankSort] = useState(RANK_SORT_OPTIONS[0].value);

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

  const { myStartupId, compareStartupIds } = state;

  const myCompany =
    myCompanyStorageList.find((c) => c.id === myStartupId) ?? null;

  // 더미 데이터
  const allCompanies = useMemo(() => {
    const myRow = myCompany
      ? {
          ...myCompany,
          description: "기업 소개를 불러오는 중입니다.",
          totalInvestment: null,
          revenue: null,
          employees: null,
        }
      : null;

    const compareRows = (compareStartupIds ?? []).map((id, i) => ({
      id,
      name: `비교 기업 ${i + 1}`,
      imgUrl: null,
      category: "-",
      description: "기업 소개를 불러오는 중입니다.",
      totalInvestment: null,
      revenue: null,
      employees: null,
    }));

    return [...(myRow ? [myRow] : []), ...compareRows];
  }, [myCompany, compareStartupIds]);

  // TODO: API 연동 시 allCompanies → API 데이터로 교체
  // useGetCompareResult({ myStartupId, compareStartupIds, orderBy: compareSort })

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
          {myCompany ? (
            <CompanyCard
              image={myCompany.imgUrl}
              name={myCompany.name}
              category={myCompany.category}
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
            options={COMPARE_SORT_OPTIONS}
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
              </tr>
            </thead>
            <tbody>
              {allCompanies.map((company) => (
                <tr key={company.id}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 기업 순위 확인하기 */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>기업 순위 확인하기</h2>
          <Dropdown
            options={RANK_SORT_OPTIONS}
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
              {allCompanies.map((company, index) => (
                <tr key={company.id}>
                  <td className={styles.rankCell}>{index + 1}위</td>
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
                    {company.employees != null ? `${company.employees}명` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <Button
            variant="solid"
            onClick={() => navigate(`/startup/${myStartupId}`)}
          >
            나의 기업에 투자하기
          </Button>
        </div>
      </div>
    </main>
  );
}
