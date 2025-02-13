import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Cerebra Network</Link>
        </div>
        <div className="navbar-links">
          <Link to="/search">Search</Link>
          <Link to="/swap">Swap</Link>
          <Link to="/dex">DEX</Link>
          <Link to="/lp-pool">LP Pool</Link>
          <Link to="/marketplace">Marketplace</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
