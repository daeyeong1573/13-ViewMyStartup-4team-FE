import { useEffect, useState } from "react";
import MyCompanyApi from "@/services/myCompanyService";

const company = new MyCompanyApi();

export function useGetStartupList(options = {}) {
  const [companyList, setCompanyList] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const params = new URLSearchParams({
      page: 1,
      limit: 10,
      orderBy: "desc",
      search: "",
      ...options,
    });

    async function getApi() {
      try {
        const result = await company.getCompanyList(params);
        setCompanyList(result.data);
        setPagination(result.pagination);
      } catch (error) {
        console.error(error.message);
      }
    }
    getApi();
  }, [options.orderBy, options.limit, options.search, options.page]);

  return { companyList, pagination };
}
