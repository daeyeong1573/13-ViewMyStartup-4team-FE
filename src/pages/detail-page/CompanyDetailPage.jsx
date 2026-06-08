import styles from "./CompanyDetailPage.module.css";
import defaultLogo from "@/assets/images/default_image.png";
import Button from "@/components/ui/Button";
import kebabIcon from "@/assets/icons/ic_kebab.png";
import { useState, useRef, useEffect, useMemo } from "react";
import { formatCurrencyToKorea } from "@/utils/format";
import Pagination from "@/components/common/Pagination";
import DeleteModal from "./DeleteModal";
import Popup from "@/components/common/Popup";
import { useParams } from "react-router-dom";
import { useGetStartupDetail } from "@/hooks/useGetStartupDetail";
import { StartupDetailApi } from "@/services/startupDetailService";
import InvestmentsModal from "@/components/modal/InvestmentsModal";
import Modal from "@/components/common/Modal";

function CompanyDetailPage() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetStartupDetail(id, {
    page: currentPage,
    limit: 5,
  });

  const [openKebabId, setOpenKebabId] = useState(null);
  const openKebabIdRef = useRef(openKebabId);
  const tableRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: "",
  });

  const company = data || {};
  const investments = useMemo(() => data?.investmentList?.data || [], [data]);

  const pagination = useMemo(
    () => data?.investmentList?.pagination || { totalPages: 1, page: 1 },
    [data],
  );

  const totalAmountSum = data?.virtualInvestmentTotal || 0;
  const formattedTotalAmount = formatCurrencyToKorea(totalAmountSum);

  // 드롭다운 밖을 누르면 닫히는 로직
  useEffect(() => {
    openKebabIdRef.current = openKebabId;
  }, [openKebabId]);

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

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          데이터를 불러오고 있습니다.
          <br /> 잠시만 기다려주세요!
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          해당 기업 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  function handleKebabToggle(id) {
    setOpenKebabId(openKebabId === id ? null : id);
  }

  // 모달 관련 로직

  function handleOpenDeleteModal(id) {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setDeletingId(null);
    setPassword("");
  }

  async function handleConfirmDelete() {
    try {
      await StartupDetailApi.deleteInvestment(deletingId, password);
      console.log(`${deletingId} 항목 삭제 실행`);
      handleCloseDeleteModal();
      refetch();
    } catch (error) {
      console.error(error.message);
      setIsDeleteModalOpen(false);
      setIsErrorPopupOpen(true);
      setPassword("");
    }
  }

  function handleOpenEditModal(item) {
    setSelectedInvestment(item);
    setIsEditModalOpen(true);
    setOpenKebabId(null);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedInvestment(null);
  }

  async function handleConfirmEdit(submittedData) {
    try {
      await StartupDetailApi.updateInvestment(selectedInvestment.id, {
        investorName: submittedData.investorName,
        amount: submittedData.amount,
        comment: submittedData.comment,
        password: submittedData.password,
      });
      handleCloseEditModal();

      setSuccessModal({
        isOpen: true,
        message: "투자 정보가 수정되었어요!",
      });

      refetch();
    } catch (error) {
      console.error(error.message);
      alert(error.message || "수정에 실패했습니다.");
    }
  }

  async function handleCreateInvestmentSubmit(submittedData) {
    try {
      (await StartupDetailApi.createInvestment({
        startupId: id,
        investorName: submittedData.investorName,
        amount: submittedData.amount,
        comment: submittedData.comment,
        password: submittedData.password,
      }),
        setIsCreateModalOpen(false));

      setSuccessModal({
        isOpen: true,
        message: "투자가 완료되었어요!",
      });

      refetch();
    } catch (error) {
      console.error(error.message);
      alert(error.message || "투자 생성에 실패했습니다.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        {/* 상단 기업 헤더 */}
        <section className={styles.header}>
          <div className={styles.profileSection}>
            <div className={styles.imageWrapper}>
              <img
                src={company.imgUrl || defaultLogo}
                alt={`${company.name} 로고`}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.infoBox}>
              <h1 className={styles.companyName}>{company.name}</h1>
              <span className={styles.categoryText}>{company.category}</span>
            </div>
          </div>
        </section>

        {/* 수치 카드 섹션 */}
        <section className={styles.statWrapper}>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statLabel}>누적 투자 금액</span>
              <span className={styles.statValue}>
                {formatCurrencyToKorea(company.totalInvestment)} 원
              </span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statLabel}>매출액</span>
              <span className={styles.statValue}>
                {formatCurrencyToKorea(company.revenue)} 원
              </span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statLabel}>고용 인원</span>
              <span className={styles.statValue}>
                {company.employeeCount}명
              </span>
            </div>
          </div>
        </section>

        {/* 기업 소개 섹션 */}
        <section className={styles.descriptionSection}>
          <h3 className={styles.descriptionTitle}>기업 소개</h3>
          <p className={styles.descriptionText}>{company.description}</p>
        </section>

        {/* 투자 현황 섹션 */}
        <section className={styles.investmentSection}>
          <div className={styles.investmentHeader}>
            <h2 className={styles.investmentHeaderTitle}>
              View My Startup에서 받은 투자
            </h2>
            <div className={styles.actionButtons}>
              <Button
                variant="solid"
                size="large"
                onClick={() => setIsCreateModalOpen(true)}
              >
                기업투자하기
              </Button>
            </div>
          </div>

          {investments.length === 0 ? (
            <div className={styles.statusContainer}>
              <p className={styles.emptyMention}>
                아직 투자한 기업이 없어요.
                <br />
                버튼을 눌러 기업에 투자해보세요!
              </p>
            </div>
          ) : (
            <>
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
                  {investments.map((item) => (
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
                        {formatCurrencyToKorea(item.amount)}원
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
                            type="button"
                            onClick={() => handleKebabToggle(item.id)}
                            className={styles.kebabBtn}
                          >
                            <img src={kebabIcon} alt="더보기" />
                          </button>
                          {openKebabId === item.id && (
                            <div className={styles.kebabDropdown}>
                              <button
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() => handleOpenEditModal(item)}
                              >
                                수정하기
                              </button>
                              <button
                                type="button"
                                className={`${styles.dropdownItem} ${styles.deleteText}`}
                                onClick={() => handleOpenDeleteModal(item.id)}
                              >
                                삭제하기
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Number(pagination.totalPages)}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </section>
      </div>

      {isCreateModalOpen && (
        <InvestmentsModal
          isOpen={isCreateModalOpen}
          mode="create"
          company={company}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateInvestmentSubmit}
        />
      )}

      {isEditModalOpen && (
        <InvestmentsModal
          isOpen={isEditModalOpen}
          mode="edit"
          company={company}
          initialData={selectedInvestment}
          onClose={handleCloseEditModal}
          onSubmit={handleConfirmEdit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          password={password}
          onPasswordChange={setPassword}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isErrorPopupOpen && (
        <Popup
          onClose={() => setIsErrorPopupOpen(false)}
          onConfirm={() => setIsErrorPopupOpen(false)}
          children="잘못된 비밀번호로 삭제에 실패하셨습니다."
        ></Popup>
      )}

      {successModal.isOpen && (
        <Modal
          onClose={() =>
            setSuccessModal({
              isOpen: false,
              message: "",
            })
          }
        >
          <div className={styles.modalButtonWrapper}>
            <p className={styles.modalText}>{successModal.message}</p>

            <Button
              variant="solid"
              onClick={() =>
                setSuccessModal({
                  isOpen: false,
                  message: "",
                })
              }
            >
              확인
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CompanyDetailPage;
