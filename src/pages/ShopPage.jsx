import ProductList from "../components/ProductList/ProductList";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import adapt from "../utils/adaptar";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";

import { useState, useMemo, useContext } from "react";

export default function ShopPage() {
  const { cart, setCart } = useContext(CartContext);
  const [searchText, setSearchText] = useState("");

  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products",
  );

  function addToCart(product) {
    setCart((prev) => {
      if (prev.find((productInCart) => productInCart.id === product.id)) {
        return prev.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  const filteredProducts = useMemo(() => {
    const products = adapt(data);

    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    });

    return filteredProducts;
  }, [data, searchText]);

  if (loading) return <p>Cargando ...</p>;
  if (error) return <p>{error} </p>;

  return (
    <>
      <Header name={"Charles"} />
      <p>{cart.length}</p>
      
      <SearchBar value={searchText} onSearch={setSearchText} />
      {filteredProducts.length === 0 ? (
        <p>No products Found</p>
      ) : (
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      )}
    </>
  );
}
