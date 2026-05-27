import styles from "./MyStartupCompareSelectPage.module.css";
import { useState } from "react";
import { useMyCompany } from "@/hooks/useMyCompany";
import { useMyCompanyStorage } from "@/hooks/useMyCompanyStorage";
import { useGetStartupList } from "@/hooks/useGetStartupList";
import { useCompareCompany } from "@/hooks/useCompareCompany";
import CardArea from "@/components/common/startup-compare/CardArea";
import CompareCardContent from "@/components/common/startup-compare/CompareCardContent";
import MyCompanyCardContent from "@/components/common/startup-compare/MyCompanyCardContent";
import Modal from "@/components/common/Modal";
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/common/Pagination";
import MyCompanyModalItem from "./MyCompanyModalItem";
import { useCompareCompanyStorage } from "@/hooks/useCompareCompanyStorage";
import Button from "@/components/ui/Button";
import { MAX_SIZE } from "@/constants/company";

const INITIAL_FILTER = {
  search: "",
  currentPage: 1,
  limit: 5,
  orderBy: "desc",
};

export default function MyStartupCompareSelectPage() {
  //내가선택한 기업 UI
  const { myCompany, selectCompany, cancelCompany } = useMyCompany();
  //저장된 선택했던 기업 목록
  const { myCompanyStorageList, addMyCompanyStorage } = useMyCompanyStorage();

  //비교기업 리스트
  const {
    compareCompanyList,
    addCompareCompany,
    removeCompany,
    resetCompanies,
  } = useCompareCompany();

  //저장된 비교 기업
  const {
    compareStorageList,
    addCompareStorageCompany,
    removeCompareCompany,
    clearCompareCompanies,
  } = useCompareCompanyStorage();

  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [inputValue, setInputValue] = useState("");

  const { search, currentPage, limit, orderBy } = filter;
  //모달 상태
  const [isModalOpen, setIsModalOpen] = useState({ my: false, compare: false });
  //검색결과
  const [isSearch, setIsSearch] = useState(false);

  const { companyList, pagination } = useGetStartupList({
    search,
    page: currentPage,
    limit,
    orderBy,
  });

  const isCompareActive = myCompany && compareCompanyList.length >= 1;

  const handleSearch = () => {
    setIsSearch(true);
    setFilter((prev) => ({ ...prev, search: inputValue, currentPage: 1 }));
  };

  const handleClear = () => {
    setInputValue("");
    setIsSearch(false);
    setFilter((prev) => ({ ...prev, search: "", currentPage: 1 }));
  };

  const handleReset = () => {};

  const handleCompanyRemove = (company) => {
    removeCompany(company.id);
  };

  const handleModalClose = (type) => {
    setIsSearch(false);
    setInputValue("");
    setIsModalOpen((prev) => ({ ...prev, [type]: false }));
    setFilter(INITIAL_FILTER);
  };

  const handleMyCompanySelect = (company) => {
    selectCompany(company);
    addMyCompanyStorage(company);
    handleModalClose("my");
  };

  const handleCompareCompanySelect = (company) => {
    addCompareCompany(company);
    addCompareStorageCompany(company);
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.inner}>
        <CardArea
          header="나의 기업을 선택해 주세요!"
          label="나의 기업 선택"
          actionButton={
            compareCompanyList.length >= 1 && (
              <Button variant="reset" status="active" onClick={handleReset}>
                전체 초기화
              </Button>
            )
          }
        >
          <MyCompanyCardContent
            myCompany={myCompany}
            onAdd={() => setIsModalOpen((prev) => ({ ...prev, my: true }))}
            onCancel={cancelCompany}
          />
        </CardArea>

        {myCompany && (
          <CardArea
            header={`어떤 기업이 궁금하세요? (최대${MAX_SIZE}개)`}
            label="비교 기업 선택"
            actionButton={
              <button
                className={styles.addCompareBtn}
                type="button"
                onClick={() =>
                  setIsModalOpen((prev) => ({ ...prev, compare: true }))
                }
                disabled={compareCompanyList.length >= MAX_SIZE}
              >
                기업 추가하기
              </button>
            }
          >
            <CompareCardContent
              compareCompanies={compareCompanyList}
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

      {isModalOpen.my && (
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
          {myCompanyStorageList.length > 0 && (
            <MyCompanyModalItem
              title="최근 선택된 기업"
              total={myCompanyStorageList.length}
              list={myCompanyStorageList}
              handleClick={handleMyCompanySelect}
            />
          )}

          {isSearch && (
            <>
              <MyCompanyModalItem
                title="검색 결과"
                total={pagination.total}
                list={companyList}
                handleClick={handleMyCompanySelect}
              />

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
      {/* 비교 기업 모달 */}
      {isModalOpen.compare && (
        <Modal
          title="비교 기업 선택하기"
          onClose={() => handleModalClose("compare")}
        >
          <SearchBar
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClear={handleClear}
            onSubmit={handleSearch}
          />

          {compareCompanyList.length > 0 && (
            <MyCompanyModalItem
              title="선택한 기업"
              total={compareCompanyList.length}
              list={compareCompanyList}
              buttonText="선택 해제"
              status="inactive"
              handleClick={handleCompanyRemove}
            />
          )}

          {isSearch && (
            <>
              <MyCompanyModalItem
                title="검색 결과"
                total={pagination.total}
                list={companyList}
                handleClick={handleCompareCompanySelect}
                selectedIds={compareCompanyList.map((c) => c.id)}
              />
              {compareCompanyList.length >= MAX_SIZE && (
                <p className={styles.maxTxt}>
                  *비교할 기업은 최대 {MAX_SIZE}개까지 선택 가능합니다.
                </p>
              )}
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
