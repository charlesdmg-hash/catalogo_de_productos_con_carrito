import { CartContext } from "./CartContext";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage({ key: "cart", initialValue: [] });
  function addToCart(product) {
    setCart((prev) => {
      if (prev.find((productInCart) => productInCart.id === product.id)) {
        return prev.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
