import { NavLink } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
  return (
    <nav>
      <NavLink to={"/"}> Home </NavLink>
      <NavLink to={"/products"}> Products </NavLink>
      <NavLink to={"/cart"}> Cart </NavLink>
    </nav>
  );
}
