import { useEffect, useState } from "react";
import { BASE_URL, COMPARE_ENDPOINT, STATUS_ENDPOINT } from "@/constants/api";

export function useGetCompareStatus(sort) {
  const [startups, setStartups] = useState([]);
  const [currentSort, setCurrentSort] = useState(sort);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCompareData = async () => {
      try {
        const sortValue = currentSort?.value || "myStartupCount_desc";
        const url = `${BASE_URL}${COMPARE_ENDPOINT}${STATUS_ENDPOINT}?orderBy=${sortValue}&page=${page}&limit=10`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }

        const resBody = await response.json();
        setStartups(resBody.data ?? []);

        if (resBody.pagination) {
          setTotalPages(resBody.pagination.totalPages || 1);
        }
      } catch (error) {
        console.error("연동 에러:", error.message);
      }
    };
    fetchCompareData();
  }, [currentSort, page]);

  return { startups, currentSort, setCurrentSort, page, setPage, totalPages };
}
