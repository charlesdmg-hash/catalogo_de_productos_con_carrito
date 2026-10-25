import ProductList from "../components/ProductList/ProductList";
import Header from "../components/Header/Header";
import CartItem from "../components/CartItem/CartItem";
import SearchBar from "../components/SearchBar/SearchBar";
import { useState } from "react";

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [quantityInput, setQuantityInput] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [searchText, setSearchText] = useState("");

  const test_product = [
    {
      id: 1,
      name: "Laptop",
      price: 250,
      image:
        "https://g2u-wp-prod.s3-ap-southeast-2.amazonaws.com/wp-content/uploads/2025/01/shutterstock_2328203513-900x666.jpg",
    },

    {
      id: 2,
      name: "Tablet",
      price: 400,
      image:
        "https://g2u-wp-prod.s3-ap-southeast-2.amazonaws.com/wp-content/uploads/2025/01/shutterstock_2328203513-900x666.jpg",
    },

    {
      id: 3,
      name: "PS5",
      price: 500,
      image:
        "https://g2u-wp-prod.s3-ap-southeast-2.amazonaws.com/wp-content/uploads/2025/01/shutterstock_2328203513-900x666.jpg",
    },
  ];

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

  function deleteFromCart(id) {
    setCart((prev) => {
      return prev.filter((product) => id !== product.id);
    });
  }

  const show_items = cart.map((item) => {
    return <CartItem key={item.id} item={item} onRemove={deleteFromCart} />;
  });

  const options = cart.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {" "}
        {option.name}{" "}
      </option>
    );
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (selectedProductId) {
      const id = Number(selectedProductId);
      const quantity = Number(quantityInput);

      if (Number.isInteger(quantity) && quantity > 0) {
        setCart((prev) => {
          return prev.map((productInCart) => {
            if (productInCart.id === id) {
              return { ...productInCart, quantity: quantity };
            } else {
              return productInCart;
            }
          });
        });
      }
    }
  };

  const filteredProducts = test_product.filter((product) => {
    return product.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      <Header name={"Charles"} />
      <p>{cart.length}</p>
      {show_items}
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type="number"
          value={quantityInput}
          onChange={(e) => {
            setQuantityInput(e.target.value);
          }}
        />
        <select
          name=""
          id=""
          value={selectedProductId}
          onChange={(e) => {
            setSelectedProductId(e.target.value);
          }}
        >
          <option value="">Choose a product</option>
          {options}
        </select>

        <button type="submit"> Update Quantity </button>
      </form>
      <SearchBar value={searchText} onSearch={setSearchText} />
      {filteredProducts.length === 0 ? (
        <p>No products Found</p>
      ) : (
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      )}
    </>
  );
}
