import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../nav.css";

const Nav = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <div className="nav-container">
        <nav>
          <Link to="Home" className="nav-link">
            <button className="nav-button">Home</button>
          </Link>
          <Link to="shop" className="nav-link">
            <button className="nav-button">Shop</button>
          </Link>
          <Link to="cart" className="nav-link">
            <button className="nav-button cart-button">
              Cart
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>
          </Link>
        </nav>
      </div>
      <main>
        <Outlet context={{ cart, setCart }} />
      </main>
    </>
  );
};

export default Nav;