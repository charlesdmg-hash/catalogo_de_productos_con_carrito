import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <div className="product-card-info">
        <img src={product.image} alt={product.name} />
        <div id="card-info">
          <p id="description">{product.description}</p>
          <p>
            <b>Price: {product.price}$</b>
          </p>
        </div>
      </div>

      <div id="product-links">
        <Link to={`/products/${product.id}`}>View Details</Link>
        <button onClick={() => onAddToCart(product)}> Add to cart </button>
      </div>
    </div>
  );
}
