import { useState, useEffect } from 'react';
interface LocalStorageStateProps {
  initialState?: any;
  key: string;
  onStorageChange?: (newValue: any) => void;
}

export function useLocalStorageState({
  initialState = '',
  key,
  onStorageChange,
}: LocalStorageStateProps) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
      if (onStorageChange) {
        onStorageChange(value); // Invoke callback to update global state
      }
    },
    [value, key, onStorageChange]
  );

  return [value, setValue];
}
