import { useState } from "react";
import { KEYS, MAX_SIZE } from "@/constants/company";
import { getStorage, setStorage } from "@/utils/storage";

export function useCompareCompanyStorage() {
  const [compareStorageList, setCompareStorageList] = useState(() =>
    getStorage(KEYS.compare),
  );

  const addCompareStorageCompany = (company) => {
    if (compareStorageList.length >= MAX_SIZE) return false;
    if (compareStorageList.some((c) => c.id === company.id)) return false;

    setCompareStorageList((prev) => {
      const updated = [...prev, company];
      setStorage(KEYS.compare, updated);
      return updated;
    });
    return true;
  };

  const removeCompareCompany = (id) => {
    setCompareStorageList((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      setStorage(KEYS.compare, updated);
      return updated;
    });
  };

  const clearCompareCompanies = () => {
    localStorage.removeItem(KEYS.compare);
    setCompareStorageList([]);
  };

  return {
    compareStorageList,
    addCompareStorageCompany,
    removeCompareCompany,
    clearCompareCompanies,
  };
}
