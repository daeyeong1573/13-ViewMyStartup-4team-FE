import { StartupDetailApi } from "@/services/startupDetailService";
import { useCallback, useEffect, useState } from "react";

export function useGetStartupDetail(id, options = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const page = options.page || 1;
  const limit = options.limit || 5;

  const getDetail = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);

      const result = await StartupDetailApi.getStartupDetail(id, {
        page,
        limit,
      });

      setData(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [id, page, limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getDetail();
    }, 0);

    return () => clearTimeout(timer);
  }, [getDetail]);

  //삭제된 항목을 화면에서 제거하기 위해 refetch로 getDetail 전달
  return { data, isLoading, refetch: getDetail };
}
