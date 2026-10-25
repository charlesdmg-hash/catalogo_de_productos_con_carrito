import ProductCard from "../ProductCard/ProductCard"

export default function ProductList({ products, onAddToCart}) {

    const product_list = products.map( (product) => {
    
        return <ProductCard key = { product.id } product = { product } onAddToCart={ onAddToCart } />

    })

    return (
        <>
            { product_list }
        </>
    )
}