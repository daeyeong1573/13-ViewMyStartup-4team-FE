import { MAX_SIZE } from "@/constants/company";
import { useState } from "react";

export function useCompareCompany() {
  const [compareCompanyList, setCompareCompanyList] = useState([]);

  // 기업 추가 (최대 5개)
  const addCompareCompany = (company) => {
    if (compareCompanyList.length >= MAX_SIZE) return;
    if (compareCompanyList.some((c) => c.id === company.id)) return; // 중복 방지
    setCompareCompanyList((prev) => [...prev, company]);
  };

  // 개별 기업 제거
  const removeCompany = (companyId) => {
    setCompareCompanyList((prev) => prev.filter((c) => c.id !== companyId));
  };

  // 전체 초기화
  const resetCompanies = () => setCompareCompanyList([]);

  return {
    compareCompanyList,
    addCompareCompany,
    removeCompany,
    resetCompanies,
  };
}
