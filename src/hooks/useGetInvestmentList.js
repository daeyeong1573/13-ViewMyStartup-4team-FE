import { useEffect, useState } from "react";
import { InvestmentStatusApi } from "@/services/investmentStatusService";

export function useGetInvestmentList(options = {}) {
  const [companyList, setCompanyList] = useState([]);
  const [pagination, setPagination] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInvestments() {
      try {
        setIsLoading(true);

        const result = await InvestmentStatusApi.getInvestmentStatusList({
          page: options.page || 1,
          limit: options.limit || 10,
          orderBy: options.orderBy || "virtualInvestment_desc",
        });

        setCompanyList(result.data);
        setPagination(result.pagination);
      } catch (error) {
        console.error("투자 현황 API 에러:", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInvestments();
  }, [options.orderBy, options.limit, options.page]);

  return { companyList, pagination, isLoading };
}
