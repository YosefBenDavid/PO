import React, { useState, useEffect } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { Link } from "react-router-dom";
import { extractPokemonNumber } from "../../Utilities/Utillities";
import './Favorites.scss';
import XLogo from '../../assets/Union.svg';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

type Pokemon = {
  name: string;
  number: string;
  image: string;
};

const Favorites: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Retrieve favorites from local storage
    const favorites: Pokemon[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setPokemonList(favorites);
    setIsLoading(false);
  }, []);

  const removeFromFavorites = (pokemon: Pokemon) => {
    // Remove the selected pokemon from the list
    const updatedList = pokemonList.filter(p => p.name !== pokemon.name);
    setPokemonList(updatedList);
    // Update the local storage
    localStorage.setItem("favorites", JSON.stringify(updatedList));
  };

  return (
    <div className="favorites-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {pokemonList.length === 0 ? (
            <div className="no-favorite-pokemon-list">No favorite Pokémon found.</div>
          ) : (
            <div className="favorite-pokemon-list">
              {pokemonList.map((pokemon) => (
                <div key={pokemon.number} className="pokemon-card-wrapper">
                  <div className="remove-button" onClick={() => removeFromFavorites(pokemon)}>
                    <img src={XLogo} alt="X" />
                  </div>
                  <Link to={`/pokemon/${pokemon.name}`}>
                    <PokemonCard
                      number={extractPokemonNumber(pokemon.number)}
                      img={pokemon.image}
                      name={pokemon.name}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
