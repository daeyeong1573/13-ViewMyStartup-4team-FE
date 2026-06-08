import { API } from "./apiService";

async function createInvestment(data) {
  return API.post(`/investments`, data);
}

const investmentService = {
  createInvestment,
};

export default investmentService;
