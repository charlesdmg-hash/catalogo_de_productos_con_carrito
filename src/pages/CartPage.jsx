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

    if (id === Number(selectedProductId)) setSelectedProductId("");
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

  const subtotals = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);

  const tax = 0.1;
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotals + subtotals * tax + shipping;

  return (
    <>
      <h2>CartPage</h2>
      {show_items}
      <p>Subtotal: {subtotals.toFixed(2)}</p>
      <p>Tax: {tax * 100}%</p>
      <p>Shipping: {shipping}$</p>
      <p>Total: {total.toFixed(2)}$</p>
      {cart.length === 0 ? (
        <p> Your cart is Empty</p>
      ) : (
        <form onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            min={1}
            step={1}
            required
            type="number"
            value={quantityInput}
            onChange={(e) => {
              setQuantityInput(e.target.value);
            }}
          />
          <label htmlFor="dropdown">Select product</label>
          <select
            required
            name=""
            id="dropdown"
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
