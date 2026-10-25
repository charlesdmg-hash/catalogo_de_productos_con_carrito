export default function ProductCard({ product }) {

    return (
        
        <div>
            <p>{ product.name }</p>
            <p>{ product.price }</p>
            <img src={ product.image } alt={ product.name } width="100px" height="100px" />
        </div>
    )
}