import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h2>HomePage</h2>
      <p>You can shop for your favorite items</p>
      <Link to={"/products"}>Browse items</Link>
    </>
  );
}
