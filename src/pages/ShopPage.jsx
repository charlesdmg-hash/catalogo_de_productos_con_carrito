import ProductList from "../components/ProductList/ProductList";
import SearchBar from "../components/SearchBar/SearchBar";
import adapt from "../utils/adaptar";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";
import { useSearchParams } from "react-router-dom";

import { useState, useMemo, useContext } from "react";

export default function ShopPage() {
  const { addToCart } = useContext(CartContext);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const selectedCategory = categoryFromUrl ?? "";

  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products",
  );

  const filteredProducts = useMemo(() => {
    const products = adapt(data);

    const filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedCategory === "" || product.category === selectedCategory)
      );
    });

    return filteredProducts;
  }, [data, searchText, selectedCategory]);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleSearch = (typedText) => {
    setSearchText(typedText);
    setCurrentPage(1);
  };

  const categories = data.map((product) => {
    return product.category;
  });

  const categoriesSet = [...new Set(categories)];

  if (loading) return <p>Cargando ...</p>;
  if (error) return <p> {error} </p>;

  return (
    <>
      <SearchBar value={searchText} onSearch={handleSearch} />

      <label htmlFor="categories">Category: </label>
      <select
        name="categories"
        id="categories"
        value={selectedCategory}
        onChange={(e) => {
          setSearchParams({ category: e.target.value });
          setCurrentPage(1);
        }}
      >
        <option value="">All products</option>
        {categoriesSet.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>

      {filteredProducts.length === 0 ? (
        <p>No products Found</p>
      ) : (
        <>
          <ProductList products={paginatedProducts} onAddToCart={addToCart} />

          <div id="page-nav">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              {"<--"}
            </button>

            <p>
              Page {currentPage} of {totalPages}{" "}
            </p>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              {"-->"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
