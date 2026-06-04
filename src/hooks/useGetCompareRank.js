import { useEffect, useState } from "react";
import compareService from "@/services/compareResultService";

export default function useGetCompareRank(options = {}) {
  const [compareRankList, setCompareRankList] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams({
      orderBy: "totalInvestment_desc",
      ...options,
    });
    async function fetchGetResult() {
      try {
        const result = await compareService.getCompareRankList(params);
        console.log(`log : ${result.nearbyStartups}`);
        setCompareRankList(result.nearbyStartups);
      } catch (error) {
        console.error(`HTTP GetCompareRankList : ${error.message}`);
      }
    }
    fetchGetResult();
  }, [options.orderBy]);

  return { compareRankList };
}
