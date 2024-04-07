import React, { useState, useEffect } from "react";
import "./PokemonList.css";
import PokemonCard from "../PokemonCard/PokemonCard";

// Define the Pokemon type
type Pokemon = {
  name: string;
  url: string;
  number: string;
  image: string;
};

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false); // State variable to trigger re-render after search

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((response) => response.json())
      .then((data) => {
        // Fetch additional details for each Pokemon
        Promise.all(data.results.map((pokemon: Pokemon) => fetchPokemonDetails(pokemon)))
          .then((pokemonWithDetails) => {
            setPokemonList(pokemonWithDetails);
            setNextPage(data.next);
          });
      })
      .catch((error) => {
        console.error("Error fetching Pokemon:", error);
      });
  }, []);

  // Function to fetch additional details for a single Pokemon
  const fetchPokemonDetails = (pokemon: Pokemon): Promise<Pokemon> => {
    return fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => ({
        name: pokemon.name,
        url: pokemon.url,
        number: extractPokemonNumber(pokemon.url),
        image: data.sprites.front_default,
      }));
  };

  const extractPokemonNumber = (url: string): string => {
    const segments = url.split("/");
    const number = segments[segments.length - 2].padStart(3, "0");
    return `#${number}`;
  };

  const handleSearch = () => {
    const results = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(results);
    setSearchTrigger(!searchTrigger); // Toggle the searchTrigger state to force a re-render
  };

  const loadMorePokemon = () => {
    if (nextPage) {
      fetch(nextPage)
        .then((response) => response.json())
        .then((data) => {
          Promise.all(data.results.map((pokemon: Pokemon) => fetchPokemonDetails(pokemon)))
            .then((pokemonWithDetails) => {
              setPokemonList((prevList) => [...prevList, ...pokemonWithDetails]);
              setNextPage(data.next);
              setSearchTrigger(!searchTrigger); // Toggle the searchTrigger state to force a re-render
            });
        })
        .catch((error) => {
          console.error("Error fetching more Pokemon:", error);
        });
    }
  };

  return (
    <div className="pokemon-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="pokemon-list">
        {(searchResult.length === 0 ? pokemonList : searchResult).map((pokemon, index) => (
          <PokemonCard
            key={index}
            number={pokemon.number}
            img={pokemon.image}
            name={pokemon.name}
          />
        ))}
      </div>
      {nextPage && (
        <button className="load-more-button" onClick={loadMorePokemon}>
          Load more...
        </button>
      )}
    </div>
  );
}

export default PokemonList;
