import { useState } from 'react'
import './App.css'
import ProductList from './components/ProductList/ProductList'
import Header from './components/Header/Header'

function App() {

  const [cart, setCart] = useState([])

  const test_product = [
    {
      id: 1,
      name: "Laptop",
      price: 250,
      image: "https://g2u-wp-prod.s3-ap-southeast-2.amazonaws.com/wp-content/uploads/2025/01/shutterstock_2328203513-900x666.jpg"
    },

    {
      id: 2,
      name: "Tablet",
      price: 400,
      image: "https://g2u-wp-prod.s3-ap-southeast-2.amazonaws.com/wp-content/uploads/2025/01/shutterstock_2328203513-900x666.jpg"
    },

    {
      id: 3,
      name: "PS5",
      price: 500,
      image: "https://g2u-wp-prod.s3-ap-southeast-2.amazonaws.com/wp-content/uploads/2025/01/shutterstock_2328203513-900x666.jpg"
    }

  ] 

  function addToCart(product) {

    if (cart.find(productInCart => productInCart.id === product.id)) {
        setCart((prev) => prev.map((item) => {
          
        if (item.id === product.id) {

          return { ...item, quantity: item.quantity + 1}

        } else {

          return item

        }
 

      }))
    } else {

        return setCart((prev) => [...prev, {...product, quantity: 1}])

    }

  }

  function deleteFromCart(id) {

      setCart((prev) => {
        
        return prev.filter((product) => id !== product.id)

      })

  }

  const show_items = cart.map((x) => {

    return (
      <div key={x.id}>

        <button onClick={() => deleteFromCart( x.id )}> Remove to cart </button>
        <p> {x.name} {x.quantity}</p>

      </div>
    )

  })

  return (
    <>
      <Header name={ "Charles" } />
      <p>{ cart.length }</p>
      { show_items }
      <ProductList products={ test_product} onAddToCart = { addToCart }/>
    </>
  )
}

export default App
