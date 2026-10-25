import { useParams } from "react-router-dom";
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

  return (
    <>
      <h2>ProductDetailPage</h2>
      <p>{data.title}</p>
      <p>{data.price}</p>
      <img src={data.image} alt={data.title} />
      <p>{data.description}</p>
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
    </>
  );
}
