import { API } from "./apiService";

export default class MyCompanyApi {
  async getCompanyList(params) {
    return API.get(`/startups?${params}`);
  }

  async postCompareCompany(data) {
    return API.post(`/compare`, data);
  }
}
