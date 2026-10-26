import "./CartItem.css";

export default function CartItem({ item, onRemove }) {
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
          
          <button onClick={() => onRemove(item.id)}> Remove from cart </button>
        </div>
      </div>
    </div>
  );
}
