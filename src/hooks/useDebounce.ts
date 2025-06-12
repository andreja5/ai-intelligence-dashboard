import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value. This is the solution without installing any additional libraries (like lodash or use-debounce).
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds (default is 300ms).
 * @returns The debounced value.
 */
export const useDebounce = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
