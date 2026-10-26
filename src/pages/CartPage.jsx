import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../components/CartItem/CartItem.css";

import CartItem from "../components/CartItem/CartItem";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [quantityDrafts, setQuantityDrafts] = useState({});

  function deleteFromCart(id) {
    setCart((prev) => {
      return prev.filter((product) => id !== product.id);
    });
    cleanDraft(id);
  }

  const updateQuantity = (id, quantity) => {
    const numericQuantity = Number(quantity);
    if (Number.isInteger(numericQuantity) && numericQuantity > 0) {
      setCart((prev) => {
        return prev.map((productInCart) => {
          if (productInCart.id === id) {
            return { ...productInCart, quantity: numericQuantity };
          } else {
            return productInCart;
          }
        });
      });
      cleanDraft(id);
    }
  };

  const updateDraft = (id, typedvalue) => {
    setQuantityDrafts((prev) => {
      return { ...prev, [id]: typedvalue };
    });
  };

  const cleanDraft = (id) => {
    setQuantityDrafts((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const show_items = cart.map((item) => {
    return (
      <CartItem
        quantityInput={quantityDrafts[item.id] ?? item.quantity}
        onQuantityChange={updateDraft}
        key={item.id}
        item={item}
        onRemove={deleteFromCart}
        onUpdateCartQuantity={updateQuantity}
      />
    );
  });

  const subtotals = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);

  const tax = 0.1;
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotals + subtotals * tax + shipping;

  return (
    <>
      <h2>Cart</h2>
      {show_items}

      {cart.length === 0 ? (
        <p id="cart-empty-msg"> Your cart is Empty</p>
      ) : (
        <div id="cart-page-totals">
          <p><b>Subtotal: </b>{subtotals.toFixed(2)}$</p>
          <p><b>Tax: </b>{tax * 100}%</p>
          <p><b>Shipping: </b>{shipping}$</p>
          <p><b>Total: {total.toFixed(2)}$</b></p>
        </div>
      )}
    </>
  );
}
