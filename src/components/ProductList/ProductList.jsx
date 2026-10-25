import ProductCard from "../ProductCard/ProductCard"

export default function ProductList({ products }) {

    const product_list = products.map( (product) => {
    
        return <ProductCard key = { product.id } product = { product } />

    })

    return (
        <>
            { product_list }
        </>
    )
}