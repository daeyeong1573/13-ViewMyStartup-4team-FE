import styles from "./MyStartupCompareSelectPage.module.css";
import { useState } from "react";
import { useMyCompany } from "@/hooks/useMyCompany";
import CardArea from "@/components/common/startup-compare/CardArea";
import CompareCardContent from "@/components/common/startup-compare/CompareCardContent";
import MyCompanyCardContent from "@/components/common/startup-compare/MyCompanyCardContent";
import Modal from "@/components/common/Modal";
import SearchBar from "@/components/ui/SearchBar";
import CompanyListItem from "@/components/ui/CompanyListItem";
import { useMyCompanyStorage } from "@/hooks/useMyCompanyStorage";
import { useGetStartupList } from "@/hooks/useGetStartupList";
import Pagination from "@/components/common/Pagination";

const INITIAL_FILTER = {
  search: "",
  currentPage: 1,
  limit: 5,
  orderBy: "desc",
};

export default function MyStartupCompareSelectPage() {
  const { myCompany, selectCompany, cancelCompany } = useMyCompany();
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState({ my: false, compare: false });
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [inputValue, setInputValue] = useState("");

  const { search, currentPage, limit, orderBy } = filter;

  const { myCompanyList, addMyCompany } = useMyCompanyStorage();
  const { companyList, pagination } = useGetStartupList({
    search,
    page: currentPage,
    limit,
    orderBy,
  });

  const isCompareActive = myCompany && compareCompanies.length >= 1;

  const handleSearch = () => {
    setFilter((prev) => ({ ...prev, search: inputValue, currentPage: 1 }));
  };

  const handleClear = () => {
    setInputValue("");
    setFilter((prev) => ({ ...prev, search: "", currentPage: 1 }));
  };

  const handleCompanyRemove = (id) => {
    setCompareCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  const handleModalClose = (type) => {
    setModalOpen((prev) => ({ ...prev, [type]: false }));
    setFilter(INITIAL_FILTER);
  };

  const handleMyCompanySelect = (company) => {
    selectCompany(company);
    addMyCompany(company);
    handleModalClose("my");
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.inner}>
        <CardArea header="나의 기업을 선택해 주세요!" label="나의 기업 선택">
          <MyCompanyCardContent
            myCompany={myCompany}
            onAdd={() => setModalOpen((prev) => ({ ...prev, my: true }))}
            onCancel={cancelCompany}
          />
        </CardArea>

        {myCompany && (
          <CardArea
            header="어떤 기업이 궁금하세요?"
            label="비교 기업 선택"
            actionButton={
              <button
                className={styles.addCompareBtn}
                type="button"
                onClick={() =>
                  setModalOpen((prev) => ({ ...prev, compare: true }))
                }
              >
                기업 추가하기
              </button>
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
          onClose={() => handleModalClose("my")}
        >
          <SearchBar
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClear={handleClear}
            onSubmit={handleSearch}
          />

          {/*  최근 선택된 기업 */}
          {myCompanyList.length > 0 && (
            <>
              <h3 className={styles.modalHeader}>
                최근 선택된 기업 ({myCompanyList.length})
              </h3>
              {myCompanyList.map((company) => (
                <CompanyListItem
                  key={company.id}
                  image={company.imgUrl}
                  name={company.name}
                  category={company.category}
                  variant="outline"
                  status="active"
                  buttonText="선택하기"
                  onButtonClick={() => handleMyCompanySelect(company)}
                />
              ))}
            </>
          )}

          {companyList.length > 0 && (
            <>
              <h3 className={styles.modalHeader}>
                검색 결과 ({pagination.total})
              </h3>
              {companyList.map((company) => (
                <CompanyListItem
                  key={company.id}
                  image={company.imgUrl}
                  name={company.name}
                  category={company.category}
                  variant="outline"
                  status="active"
                  buttonText="선택하기"
                  onButtonClick={() => handleMyCompanySelect(company)}
                />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={(page) =>
                  setFilter((prev) => ({ ...prev, currentPage: page }))
                }
              />
            </>
          )}
        </Modal>
      )}
    </main>
  );
}
