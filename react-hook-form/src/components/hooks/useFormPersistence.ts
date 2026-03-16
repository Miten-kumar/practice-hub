import { useCallback } from "react";

export function useFormPersistence<T>(key: string) {
  const load = useCallback((): Partial<T> => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, [key]);

  const save = useCallback(
    (data: T) => localStorage.setItem(key, JSON.stringify(data)),
    [key]
  );

  const clear = useCallback(() => localStorage.removeItem(key), [key]);

  return { load, save, clear };
}