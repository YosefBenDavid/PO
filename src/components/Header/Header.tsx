import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import BrowserRouter and Link
import './Header.css';
import logo from '../../assets/pokedexLogo.svg';

function Header() {
  return (
    <Router> {/* Wrap the Header component with BrowserRouter */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logoImage" />
        </div>
        <div className="buttonsContainer">
          {/* Use Link component instead of div for navigation */}
          <Link to="/" className="button">Home</Link>
          <Link to="/favorites" className="button">Favorites</Link>
        </div>
      </header>
    </Router>
  );
}

export default Header;
