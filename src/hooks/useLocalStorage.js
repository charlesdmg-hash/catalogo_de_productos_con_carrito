import { useEffect, useState } from "react";

export default function useLocalStorage({ key, initialValue }) {
  const loadInitialValue = () => {
    try {
      const cart = localStorage.getItem(key);

      if (cart) return JSON.parse(cart);
      else {
        return initialValue;
      }
    } catch  {
      return initialValue;
    }
  };

  const [value, setValue] = useState(loadInitialValue);

  useEffect(() => {
    try {

        localStorage.setItem(key, JSON.stringify(value));
        
    } catch {
        throw new Error("Error ocurred")
    }
  }, [key, value])

  return [value, setValue];
}
