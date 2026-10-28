import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`,
  );

  const { addToCart } = useContext(CartContext);

  if (loading) return <p>Cargando ...</p>;
  if (error) return <p>{error} </p>;
  if (!data || !data.id)
    return (
      <>
        <p>Product not Found</p>
        <Link to={"/products"}>Browse products</Link>
      </>
    );

  return (
    <div className="product-detail-page">
      <h2>{data.title}</h2>

      <img src={data.image} alt={data.title} />
      <p>{data.description}</p>
      <div className="product-detail-addcart">
        <p>
          <b>{data.price}$</b>
        </p>
        <button
          onClick={() => {
            addToCart({
              id: data.id,
              name: data.title,
              price: data.price,
              image: data.image,
            });
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
