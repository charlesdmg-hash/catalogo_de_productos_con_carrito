import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`)

   if (loading) return <p>Cargando ...</p>;
  if (error) return <p>{error} </p>;

  return (
    <>
      <h2>ProductDetailPage</h2>
      <p>{data.title}</p>
      <p>{data.price}</p>
      <img src={data.image} alt={data.title} />
      <p>{data.description}</p>
    </>
  );
}
