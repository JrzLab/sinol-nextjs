type LocalStorageKey = "event" | "class";

export const setLocalStorage = <T>(key: LocalStorageKey, value: T[]): void => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("Gagal menyimpan ke localStorage:", error);
  }
};

export const getLocalStorage = <T>(key: LocalStorageKey): T[] | null => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as T[];
    }
    return null;
  } catch (error) {
    console.error("Gagal membaca dari localStorage:", error);
    return null;
  }
};

export const removeLocalStorage = (key: LocalStorageKey): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Gagal menghapus dari localStorage:", error);
  }
};
