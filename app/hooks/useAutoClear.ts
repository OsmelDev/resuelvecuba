import { useEffect } from "react";

export function useAutoClear(
  value: string | null | undefined,
  onClear: () => void,
  delay: number = 3000,
) {
  useEffect(() => {
    if (!value) return;

    const timer = setTimeout(() => {
      onClear();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, onClear, delay]);
}
