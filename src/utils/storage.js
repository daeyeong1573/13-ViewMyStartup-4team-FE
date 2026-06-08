export const getStorage = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
