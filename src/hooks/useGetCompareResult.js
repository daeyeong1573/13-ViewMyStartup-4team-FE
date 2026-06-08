import { useEffect, useState } from "react";
import compareService from "@/services/compareResultService";

export default function useGetCompareResult(options = {}) {
  const [compareResultList, setCompareResultList] = useState([]);
  const [myStartup, setMystartup] = useState({});
  useEffect(() => {
    const params = new URLSearchParams({
      orderBy: "totalInvestment_desc",
      ...options,
    });
    async function fetchGetResult() {
      try {
        const result = await compareService.getCompareList(params);
        setMystartup(result.myStartup);
        setCompareResultList(result.compareStartups);
      } catch (error) {
        console.error(`HTTP GetCompareResult : ${error.message}`);
      }
    }
    fetchGetResult();
  }, [options.orderBy]);

  return { myStartup, compareResultList };
}
