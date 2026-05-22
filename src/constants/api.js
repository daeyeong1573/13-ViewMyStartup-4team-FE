export const BASE_URL = "http://localhost:3000"; //배포후에는 .env로 관리합니다.

export const API = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) =>
    request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  patch: (endpoint, data) =>
    request(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};

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

    if (!response.ok) {
      throw new Error(`Http Error : ${response.status}`);
    }
    if (response.status === 204) return null;

    return response.json();
  } catch (error) {
    console.error(`Request 에러: ${error.message}`);
    throw error;
  }
}
