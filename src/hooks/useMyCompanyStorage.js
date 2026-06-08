import { KEYS, MAX_SIZE } from "@/constants/company";
import { getStorage, setStorage } from "@/utils/storage";
import { useState, useMemo } from "react";

export function useMyCompanyStorage() {
  const [myCompanyStorageList, setMyCompanyStorageList] = useState(() =>
    getStorage(KEYS.my),
  );

  const sortedList = useMemo(
    () => [...myCompanyStorageList].reverse(),
    [myCompanyStorageList],
  );
  const addMyCompanyStorage = (company) => {
    setMyCompanyStorageList((prev) => {
      const filtered = prev.filter((c) => c.id !== company.id);

      // 5개 초과 시 가장 오래된 것 제거
      if (filtered.length >= MAX_SIZE) {
        filtered.shift();
      }

      const updated = [...filtered, company];
      setStorage(KEYS.my, updated);
      return updated;
    });
  };

  return { myCompanyStorageList: sortedList, addMyCompanyStorage };
}
