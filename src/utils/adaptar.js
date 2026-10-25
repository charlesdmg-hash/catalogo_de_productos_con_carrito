export default function adapt(products) {
  const adapted_products = products.map((product) => {
    return {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    };
  });

  return adapted_products;
}
