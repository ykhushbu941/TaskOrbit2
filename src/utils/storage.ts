
export const saveToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key: string, fallback: any) => {
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const updateStorage = (key: string, updater: (val: any) => any) => {
  const current = getFromStorage(key, null);
  const next = updater(current);
  saveToStorage(key, next);
  return next;
};
