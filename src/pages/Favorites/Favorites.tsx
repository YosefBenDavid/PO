import React, { useState, useEffect } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { Link } from "react-router-dom";

type Pokemon = {
  name: string;
  number: string;
  image: string;
};

const Favorites: React.FC<{ favorites: Pokemon[] }> = ({ favorites }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Set the favorite Pokemon list from props
    setPokemonList(favorites);
  }, [favorites]);

  return (
    <>
      {pokemonList.length === 0 ? (
        <div>No favorite Pokémon found.</div>
      ) : (
        <div className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <Link key={pokemon.number} to={`/pokemon/${pokemon.name}`}>
              <PokemonCard
                number={pokemon.number}
                img={pokemon.image}
                name={pokemon.name}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;
