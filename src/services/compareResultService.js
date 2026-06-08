import { API } from "./apiService";

async function getCompareList(params) {
  return API.get(`/compare/result?${params}`);
}

async function getCompareRankList(params) {
  return API.get(`/compare/rank?${params}`);
}

const compareService = {
  getCompareList,
  getCompareRankList,
};

export default compareService;
