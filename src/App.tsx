import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
// import PokemonList from "./components/PokemonList/PokemonList";
// import PokemonGrid from "./components/PokemonGrid/PokemonGrid";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
