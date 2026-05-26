import { useState } from "react";
import { KEYS, MAX_SIZE } from "@/constants/company";
import { getStorage, setStorage } from "@/utils/storage";

export function useCompareCompanyStorage() {
  const [compareList, setCompareList] = useState(() =>
    getStorage(KEYS.compare),
  );

  const addCompareCompany = (company) => {
    if (compareList.length >= MAX_SIZE) return false;
    if (compareList.some((c) => c.id === company.id)) return false;

    setCompareList((prev) => {
      const updated = [...prev, company];
      setStorage(KEYS.compare, updated);
      return updated;
    });
    return true;
  };

  const removeCompareCompany = (id) => {
    setCompareList((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      setStorage(KEYS.compare, updated);
      return updated;
    });
  };

  const clearCompareCompanies = () => {
    localStorage.removeItem(KEYS.compare);
    setCompareList([]);
  };

  return {
    compareList,
    addCompareCompany,
    removeCompareCompany,
    clearCompareCompanies,
  };
}
