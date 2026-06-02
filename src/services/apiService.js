import { BASE_URL } from "@/constants/api.js";

async function request(endpoint, options = {}) {
  const { body, ...customConfig } = options;

  const config = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

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
  post: (endpoint, data) => request(endpoint, { method: "POST", body: data }),
  patch: (endpoint, data) => request(endpoint, { method: "PATCH", body: data }),
  delete: (endpoint, data) =>
    request(endpoint, { method: "DELETE", body: data }),
};
