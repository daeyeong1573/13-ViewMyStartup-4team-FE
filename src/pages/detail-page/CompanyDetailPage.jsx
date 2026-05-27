import styles from "./CompanyDetailPage.module.css";
import defaultLogo from "@/assets/images/default_image.png";
import Button from "@/components/ui/Button";
import kebabIcon from "@/assets/icons/ic_kebab.png";
import { useState, useRef, useEffect, useMemo } from "react";
import { formatCurrencyToKorea } from "@/utils/format";
import Pagination from "@/components/common/Pagination";
import DeleteModal from "./DeleteModal";

//임시 데이터
const MOCK_COMPANY = {
  imgUrl: null,
  name: "코드잇",
  category: "에듀테크",
  totalInvestment: 14000000000,
  revenue: 4430000000,
  employeeCount: 95,
  description: `코드잇은 '온라인 코딩 교육 서비스'를 운영하는 EdTech 스타트업입니다.\n\n코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다.\n\n모든 강의를 마음껏 들을 수 있는 "코드잇 무제한 멤버십"을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.\n\n“배움의 기쁨을 세상 모두에게.”\n\n이것이 코드잇의 비전입니다. 현재는 최고의 코딩 교육 서비스를 국내에서 제공하고 있지만, 이보다 더 큰 그림을 그리고 있습니다. 2021년 상반기부터 영어권 시장 진출을 시작했고, 코딩과 인접한 분야부터 스펙트럼을 넓혀 나갈 계획입니다.`,
};

const MOCK_INVESTMENTS = [
  {
    id: 1,
    investorName: "김연우",
    rank: 1,
    investAmount: 1000000000,
    comment: "코드잇은 정말 훌륭한 기업입니다!",
  },
  {
    id: 2,
    investorName: "이유지",
    rank: 2,
    investAmount: 900000000,
    comment: "코드잇의 성장 가능성은 무궁무진합니다!",
  },
  {
    id: 3,
    investorName: "안다혜",
    rank: 3,
    investAmount: 800000000,
    comment: "최고의 기업! 코드잇!",
  },
  {
    id: 4,
    investorName: "신희성",
    rank: 4,
    investAmount: 700000000,
    comment: "코드잇의 진출 분야는 무궁무진합니다.",
  },
  {
    id: 5,
    investorName: "이용섭",
    rank: 5,
    investAmount: 600000000,
    comment: "교육업계의 라이징 스타 코드잇을 신뢰합니다.",
  },
];

const MOCK_PAGINATION = { currentPage: 1, totalPages: 5 };

function CompanyDetailPage() {
  const [openKebabId, setOpenKebabId] = useState(null);
  const openKebabIdRef = useRef(openKebabId);

  function handleKebabToggle(id) {
    setOpenKebabId(openKebabId === id ? null : id);
  }

  const totalAmountSum = useMemo(
    () => MOCK_INVESTMENTS.reduce((acc, cur) => acc + cur.investAmount, 0),
    [],
  );

  const formattedTotalAmount = formatCurrencyToKorea(totalAmountSum);

  const tableRef = useRef(null);

  // 모달 관련 로직

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleCloseModal() {
    setIsDeleteModalOpen(false);
    setPassword("");
    setError("");
  }

  // 드롭다운 밖을 누르면 닫히는 로직

  useEffect(() => {
    openKebabIdRef.current = openKebabId;
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        if (openKebabIdRef.current !== null) {
          setOpenKebabId(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        {/* 상단 기업 헤더 */}
        <section className={styles.header}>
          <div className={styles.profileSection}>
            <div className={styles.imageWrapper}>
              <img
                src={MOCK_COMPANY.imgUrl || defaultLogo}
                alt={`${MOCK_COMPANY.name} 로고`}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.infoBox}>
              <h1 className={styles.companyName}>{MOCK_COMPANY.name}</h1>
              <span className={styles.categoryText}>
                {MOCK_COMPANY.category}
              </span>
            </div>
          </div>
        </section>

        {/* 수치 카드 섹션 */}
        <section className={styles.statWrapper}>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statLabel}>누적 투자 금액</span>
              <span className={styles.statValue}>
                {formatCurrencyToKorea(MOCK_COMPANY.totalInvestment)} 원
              </span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statLabel}>매출액</span>
              <span className={styles.statValue}>
                {formatCurrencyToKorea(MOCK_COMPANY.revenue)} 원
              </span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statLabel}>고용 인원</span>
              <span className={styles.statValue}>
                {MOCK_COMPANY.employeeCount}명
              </span>
            </div>
          </div>
        </section>

        {/* 기업 소개 섹션 */}
        <section className={styles.descriptionSection}>
          <h3 className={styles.descriptionTitle}>기업 소개</h3>
          <p className={styles.descriptionText}>{MOCK_COMPANY.description}</p>
        </section>

        {/* 투자 현황 섹션 */}
        <section className={styles.investmentSection}>
          <div className={styles.investmentHeader}>
            <h2 className={styles.investmentHeaderTitle}>
              View My Startup에서 받은 투자
            </h2>
            <div className={styles.actionButtons}>
              <Button variant="solid" size="large">
                기업투자하기
              </Button>
            </div>
          </div>

          <div className={styles.investmentTotalAmount}>
            총 {formattedTotalAmount} 원
          </div>

          <div
            className={styles.tableContainer}
            ref={tableRef}
            role="table"
            aria-label="투자 현황표"
          >
            <div className={styles.thead} role="rowgroup">
              <div className={styles.tr} role="row">
                <div
                  className={`${styles.cell} ${styles.colName}`}
                  role="columnheader"
                >
                  투자자 이름
                </div>
                <div
                  className={`${styles.cell} ${styles.colRank}`}
                  role="columnheader"
                >
                  순위
                </div>
                <div
                  className={`${styles.cell} ${styles.colAmount}`}
                  role="columnheader"
                >
                  투자 금액
                </div>
                <div
                  className={`${styles.cell} ${styles.colComment}`}
                  role="columnheader"
                >
                  투자 코멘트
                </div>
                <div
                  className={`${styles.cell} ${styles.colKebab}`}
                  role="columnheader"
                  aria-label="수정 및 삭제"
                ></div>
              </div>
            </div>
            <div className={styles.tbody} role="rowgroup">
              {MOCK_INVESTMENTS.map((item) => (
                <div key={item.id} className={styles.tr} role="row">
                  <div
                    className={`${styles.cell} ${styles.colName}`}
                    role="cell"
                  >
                    {item.investorName}
                  </div>
                  <div
                    className={`${styles.cell} ${styles.colRank}`}
                    role="cell"
                  >
                    {item.rank}위
                  </div>
                  <div
                    className={`${styles.cell} ${styles.colAmount}`}
                    role="cell"
                  >
                    {formatCurrencyToKorea(item.investAmount)}원
                  </div>
                  <div
                    className={`${styles.cell} ${styles.colComment}`}
                    role="cell"
                  >
                    {item.comment}
                  </div>
                  <div
                    className={`${styles.cell} ${styles.colKebab}`}
                    role="cell"
                  >
                    <div className={styles.kebabWrapper}>
                      <button
                        onClick={() => handleKebabToggle(item.id)}
                        className={styles.kebabBtn}
                      >
                        <img src={kebabIcon} alt="더보기" />
                      </button>
                      {openKebabId === item.id && (
                        <div className={styles.kebabDropdown}>
                          <button className={styles.dropdownItem}>
                            수정하기
                          </button>
                          <button
                            className={`${styles.dropdownItem} ${styles.deleteText}`}
                            onClick={() => setIsDeleteModalOpen(true)}
                          >
                            삭제하기
                          </button>
                          {isDeleteModalOpen && (
                            <DeleteModal
                              isOpen={isDeleteModalOpen}
                              onClose={handleCloseModal}
                              password={password}
                              onPassWordChange={setPassword}
                              onConfirm={() =>
                                console.log("삭제 실행:", password)
                              }
                              error={error}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={MOCK_PAGINATION.currentPage}
              totalPages={MOCK_PAGINATION.totalPages}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
