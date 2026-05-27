import styles from "./MyStartupCompanyListPage.module.css";

const MyStartupCompanyListPageTable = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.startupTable}>
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
          {data.length > 0 ? (
            data.map((startup) => (
              <tr key={startup.id}>
                <td className={styles.center}>{startup.rank || "-"}위</td>
                <td className={styles.companyName}>
                  {startup.logo ? (
                    <img
                      src={startup.logo}
                      alt={`${startup.name} 로고`}
                      className={styles.companyLogo}
                    />
                  ) : (
                    <div className={styles.companyLogoPlaceholder}></div>
                  )}
                  {startup.name}
                </td>
                <td className={styles.description}>
                  {startup.description || "-"}
                </td>
                <td className={styles.center}>{startup.category || "-"}</td>
                <td className={styles.center}>
                  {startup.cumulativeInvestment || "-"}
                </td>
                <td className={styles.center}>
                  {startup.annualRevenue || "-"}
                </td>
                <td className={styles.center}>
                  {startup.employeeCount || "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className={styles.center}
                style={{ padding: "40px" }}
              >
                조건에 맞는 스타트업 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyStartupCompanyListPageTable;
