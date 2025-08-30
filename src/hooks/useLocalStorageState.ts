import { useState, useEffect } from "react";

export function useLocalStorageState<T>(initialState: T, key: string) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialState; // SSR guard

    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Fallback: localStorage might be unavailable (e.g., private mode)
    }
  }, [value, key]);

  return [value, setValue] as const;
}
