import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage({ key: "cart", initialValue: [] });
  return (
    <CartContext.Provider value={ {cart, setCart} } >
        { children }
    </CartContext.Provider>
  );
}
