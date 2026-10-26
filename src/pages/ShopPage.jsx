import ProductList from "../components/ProductList/ProductList";
import SearchBar from "../components/SearchBar/SearchBar";
import adapt from "../utils/adaptar";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";

import { useState, useMemo, useContext } from "react";

export default function ShopPage() {
  const { cart, addToCart } = useContext(CartContext);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products",
  );

  const filteredProducts = useMemo(() => {
    const products = adapt(data);

    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    });

    return filteredProducts;
  }, [data, searchText]);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleSearch = (typedText) => {
    setSearchText(typedText);
    setCurrentPage(1);
  };

  if (loading) return <p>Cargando ...</p>;
  if (error) return <p> {error} </p>;

  return (
    <>
      <SearchBar value={searchText} onSearch={handleSearch} />
      {filteredProducts.length === 0 ? (
        <p>No products Found</p>
      ) : (
        <>
          <ProductList products={paginatedProducts} onAddToCart={addToCart} />
         
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
              Previous
            </button>
          

          <p>
            Page {currentPage} of {totalPages}{" "}
          </p>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </>
      )}
    </>
  );
}
