import React from "react";
import { Link } from "react-router-dom"; // Import BrowserRouter and Link
import "./Header.css";
import logo from "../../assets/pokedexLogo.svg";

function Header() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logoImage" />
        </div>
        <div className="buttonsContainer">
          {/* Use Link component instead of div for navigation */}
          <Link to="/" className="button">
            Home
          </Link>
          <Link to="/favorites" className="button">
            Favorites
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
