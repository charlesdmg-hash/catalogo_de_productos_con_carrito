import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

import CartItem from "../components/CartItem/CartItem";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [quantityInput, setQuantityInput] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState("");

  function deleteFromCart(id) {
    setCart((prev) => {
      return prev.filter((product) => id !== product.id);
    });
  }

  const show_items = cart.map((item) => {
    return <CartItem key={item.id} item={item} onRemove={deleteFromCart} />;
  });

  const options = cart.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {" "}
        {option.name}{" "}
      </option>
    );
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (selectedProductId) {
      const id = Number(selectedProductId);
      const quantity = Number(quantityInput);

      if (Number.isInteger(quantity) && quantity > 0) {
        setCart((prev) => {
          return prev.map((productInCart) => {
            if (productInCart.id === id) {
              return { ...productInCart, quantity: quantity };
            } else {
              return productInCart;
            }
          });
        });
      }
    }
  };

  return (
    <>
      <h2>CartPage</h2>
      {show_items}
      {cart.length === 0 ? (
        <p> Your cart is Empty</p>
      ) : (
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            type="number"
            value={quantityInput}
            onChange={(e) => {
              setQuantityInput(e.target.value);
            }}
          />
          <select
            name=""
            id=""
            value={selectedProductId}
            onChange={(e) => {
              setSelectedProductId(e.target.value);
            }}
          >
            <option value="">Choose a product</option>
            {options}
          </select>

          <button type="submit"> Update Quantity </button>
        </form>
      )}
    </>
  );
}
