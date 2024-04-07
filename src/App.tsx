import './App.css';
import React from 'react';
// import Favorites from './pages/Header/Header.tsx';
// import Home from './pages/Home/Home.tsx';
import Header from './components/Header/Header.tsx';
import PokemonList from './components/PokemonList/PokemonList.tsx';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <PokemonList />
    </>
  );
}

export default App;
