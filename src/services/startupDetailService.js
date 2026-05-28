import { INVESTMENTS_ENDPOINT, STARTUPS_ENDPOINT } from "@/constants/api";
import { API } from "./apiService";

export const StartupDetailApi = {
  //기업 상세 정보 및 가상 투자 목록 조회
  async getStartupDetail(id, params) {
    const query = new URLSearchParams(params).toString();
    return await API.get(`${STARTUPS_ENDPOINT}/${id}?${query}`);
  },

  async deleteInvestment(investmentsId, password) {
    return await API.delete(`${INVESTMENTS_ENDPOINT}/${investmentsId}`, {
      password,
    });
  },
};
