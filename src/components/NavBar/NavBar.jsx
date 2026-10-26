import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <div id="nav-link">
        <NavLink to={"/"}> Home </NavLink>
        <NavLink to={"/products"}> Products </NavLink>
      </div>
      <NavLink to={"/cart"}>
        <svg
          width="22px"
          height="22px"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16.5" cy="18.5" r="1.5" />
          <circle cx="9.5" cy="18.5" r="1.5" />
          <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
        </svg>
      </NavLink>
    </nav>
  );
}
