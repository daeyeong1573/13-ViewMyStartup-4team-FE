import styles from "./MyStartupCompareSelectPage.module.css";
import { useState } from "react";
import { useMyCompany } from "@/hooks/useMyCompany";
import CardArea from "@/components/common/startup-compare/CardArea";
import CompareCardContent from "@/components/common/startup-compare/CompareCardContent";
import MyCompanyCardContent from "@/components/common/startup-compare/MyCompanyCardContent";
import Modal from "@/components/common/Modal";
import SearchBar from "@/components/ui/SearchBar";
import CompanyListItem from "@/components/ui/CompanyListItem";

export default function MyStartupCompareSelectPage() {
  const { myCompany, selectCompany, cancelCompany } = useMyCompany();
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    my: false,
    compare: false,
  });

  const isCompareActive = myCompany && compareCompanies.length >= 1;

  const handleCompanyRemove = (id) => {
    setCompareCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  const dummyCompany = {
    id: "sta-001",
    name: "코드잇",
    category: "에듀테크",
    imgUrl: "https://placehold.co/64x64/7c3aed/white?text=code",
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.inner}>
        {/* 나의 기업 */}
        <CardArea header="나의 기업을 선택해 주세요!" label="나의 기업 선택">
          <MyCompanyCardContent
            myCompany={myCompany}
            onAdd={() => setModalOpen((prev) => ({ ...prev, my: true }))} // 여기에 모달 버튼
            onCancel={cancelCompany}
          />
        </CardArea>

        {/* 비교 기업 (나의 기업 선택 후 표시) */}
        {myCompany && (
          <CardArea
            header="어떤 기업이 궁금하세요?"
            label="비교 기업 선택"
            actionButton={
              <button className={styles.addCompareBtn} type="button">
                기업 추가하기
              </button> //동일하게 모달버튼
            }
          >
            <CompareCardContent
              compareCompanies={compareCompanies}
              onRemove={handleCompanyRemove}
            />
          </CardArea>
        )}

        <div className={styles.footer}>
          <button
            className={`${styles.compareBtn} ${isCompareActive ? styles.compareBtnActive : ""}`}
            type="button"
            disabled={!isCompareActive}
            aria-disabled={!isCompareActive}
          >
            기업 비교하기
          </button>
        </div>
      </div>

      {modalOpen.my && (
        <Modal
          title="나의 기업 선택하기"
          onClose={() => setModalOpen({ my: false })}
        >
          <SearchBar />
          <h2 className={styles.modalHeader}>최근에 선택된 기업 ()</h2>
          <CompanyListItem
            logo={dummyCompany.imgUrl}
            name="코드잇"
            category="에듀 테크"
            variant="outline"
            status="active"
            buttonText="선택하기"
          />
        </Modal>
      )}
    </main>
  );
}
