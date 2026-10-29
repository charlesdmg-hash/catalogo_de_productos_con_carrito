import { Link } from "react-router-dom";

import clothing from "../assets/clothing.jpg";
import jewellery from "../assets/jewellery.jpeg";
import ssd from "../assets/ssd.jpg";

export default function HomePage() {
  return (
    <div className="home-grid-container">
      <div className="home-card">
        <img src={clothing} alt="clothing" />
        <div className="text-overlay">
          <p>Explore clothing</p>
          <Link to={"/products?category=men%27s+clothing"}>Browse men</Link>
          <Link to={"/products?category=women%27s+clothing"}>Browse women</Link>
        </div>
      </div>
      <div id="unique-home-card" className="home-card">
        <img src={jewellery} alt="jewellery" />
        <div className="text-overlay">
          <p>Explore Jewelry</p>
          <Link to={"/products?category=jewelery"}>Browse items</Link>
        </div>
      </div>
      <div className="home-card">
        <img src={ssd} alt="ssd" />
        <div className="text-overlay">
          <p>Explore SSD</p>
          <Link to={"/products?category=electronics"}>Browse items</Link>
        </div>
      </div>
    </div>
  );
}
