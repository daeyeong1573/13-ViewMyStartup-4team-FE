import { API } from "./apiService";

export const InvestmentStatusApi = {
  // [GET] 투자 현황 리스트 조회 API
  async getInvestmentStatusList({
    page = 1,
    limit = 10,
    orderBy = "virtualInvestment_desc",
  }) {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      orderBy,
    }).toString();

    return await API.get(`/investments?${queryParams}`);
  },
};
