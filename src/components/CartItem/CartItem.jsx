import "./CartItem.css";

export default function CartItem({
  item,
  onRemove,
  quantityInput,
  onQuantityChange,
  onUpdateCartQuantity,
}) {
  const submitHandler = (e) => {
    e.preventDefault();
    onUpdateCartQuantity(item.id, quantityInput);
  };

  return (
    <div className="product-card">
      <h2>{item.name}</h2>
      <div className="cart-info">
        <img id="cart-item-img" src={item.image} alt={item.name} />
        <div id="cart-item-info">
          <p>Price: {item.price}$</p>
          <p>
            <b>Total: {item.price * item.quantity}$</b>
          </p>
        </div>
        <div className="cart-form">
          <form onSubmit={(e) => submitHandler(e)}>
            <label htmlFor={`quantity-${item.id}`}>Quantity</label>
            <div id="update-qty">
              <input
                id={`quantity-${item.id}`}
                min={1}
                step={1}
                required
                type="number"
                value={quantityInput}
                onChange={(e) => {
                  onQuantityChange(item.id, e.target.value);
                }}
              />

              <button id="update-qty-btn" type="submit">
                {" "}
                +{" "}
              </button>
            </div>
          </form>
          <button onClick={() => onRemove(item.id)}> Remove from cart </button>
        </div>
      </div>
    </div>
  );
}
