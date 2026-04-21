import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/orders">Orders</NavLink>
      {" | "}
      <NavLink to="/filter">Filter</NavLink>
      {" | "}
      <NavLink to="/stats">Stats</NavLink>
    </nav>
  );
};

export default NavBar;
