
// --- Cache Helpers ---
export const setCache = (key: string, data: any, ttlMinutes: number) => {
  const now = new Date().getTime();
  const item = {
    data,
    expiry: now + ttlMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getCache = (key: string): any | null => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};
