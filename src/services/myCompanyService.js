import { API } from "@/constants/api";

export default class MyCompanyApi {
  async getCompanyList(params) {
    return API.get(`/startups?${params}`);
  }
}
