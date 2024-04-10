import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/pokedexLogo.svg";

function Header() {
  const [activeButton, setActiveButton] = useState<string>("home");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logoImage" />
          </Link>
        </div>
        <div className="buttonsContainer">
          <Link
            to="/"
            className={`button ${activeButton === "home" ? "active" : ""}`}
            onClick={() => handleButtonClick("home")}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`button ${
              activeButton === "favorites" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("favorites")}
          >
            Favorites
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
