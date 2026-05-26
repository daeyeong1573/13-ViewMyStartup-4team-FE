import { BASE_URL } from "@/constants/api.js";

async function request(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 204) return null;

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${endpoint}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Request 에러: ${error.message}`);
    throw error;
  }
}

export const API = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) =>
    request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  patch: (endpoint, data) =>
    request(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
//[GET] 투자 현황 리스트 조회 API
export const getInvestmentStatusList = async ({
  page = 1,
  limit = 10,
  orderBy = "virtualInvestment_desc",
}) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    orderBy,
  }).toString();

  return await API.get(`/investments?${queryParams}`);
};
