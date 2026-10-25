import { Link } from "react-router-dom"

export default function ProductCard(
    {   
        product,
        onAddToCart 

    }

) {

    return (
        
        <div className="product-card">
            <p>{ product.name }</p>
            <p>{ product.price }</p>
            <img src={ product.image } alt={ product.name } width="100px" height="100px" />
            <Link to={`/products/${product.id}`}>View Details</Link>
            <button onClick={() => onAddToCart( product )}> Add to cart </button>
        </div>
    )
}