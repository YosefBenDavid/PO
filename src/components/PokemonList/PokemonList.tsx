import React, { useState, useEffect } from "react";
import "./PokemonList.scss";
import PokemonCard from "../PokemonCard/PokemonCard";
import { Link } from "react-router-dom";
import { extractPokemonNumberURL } from '../../Utilities/Utillities';

type Pokemon = {
  name: string;
  url: string;
  number: string;
  type: string[];
  image: string;
};

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);
  const [suggestionsTrigger, setSuggestionsTrigger] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0")
      .then((response) => response.json())
      .then((data) => {
        // Fetch additional details for each Pokemon
        Promise.all(
          data.results.map((pokemon: Pokemon) => fetchPokemonDetails(pokemon))
        ).then((pokemonWithDetails) => {
          setPokemonList(pokemonWithDetails);
          setNextPage(data.next);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokemon:", error);
      });
  }, []);

  useEffect(() => {
    if (searchResult.length > 0) {
      sessionStorage.setItem("searchResult", JSON.stringify(searchResult));
    }
  }, [searchResult]);

  useEffect(() => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      const updatedHistory = [...searchHistory, searchTerm];
      setSearchHistory(updatedHistory);
    }
  }, [searchTerm, searchHistory]);

  const fetchPokemonDetails = async (pokemon: Pokemon): Promise<Pokemon> => {
    const response = await fetch(pokemon.url);
    const data = await response.json();

    return {
      name: pokemon.name,
      url: pokemon.url,
      number: extractPokemonNumberURL(pokemon.url),
      image: data.sprites.front_default,
      type: data.types.map((typeInfo: { type: Pokemon }) => typeInfo.type.name),
    };
  };



  const handleSearch = () => {
    const filteredResults = pokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.type.some((type) =>
          type.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    setSearchResult(filteredResults);
    setSearchTrigger(!searchTrigger);
    setSuggestionsTrigger(false); // Assuming you have a state variable called setSuggestionsTrigger

    // Filter suggestions based on input value
    const filteredSuggestions = searchHistory.filter((historyItem) =>
      historyItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchTerm(value);
    setSuggestionsTrigger(false);
  };

  const loadMorePokemon = () => {
    if (nextPage) {
      setLoading(true);
      fetch(nextPage)
        .then((response) => response.json())
        .then((data) => {
          Promise.all(
            data.results.map((pokemon: Pokemon) => fetchPokemonDetails(pokemon))
          ).then((pokemonWithDetails) => {
            let filteredPokemon = pokemonWithDetails;
            if (searchTerm) {
              // If there is an active search term
              filteredPokemon = pokemonWithDetails.filter((pokemon) =>
                matchesSearchCriteria(pokemon)
              );
              setSearchResult((prevResults) => [
                ...prevResults,
                ...filteredPokemon,
              ]);
            }
            // Add the filtered Pokemon to the search result list
            setPokemonList((pokemonList) => [
              ...pokemonList,
              ...pokemonWithDetails,
            ]);
            setNextPage(data.next);
            setSearchTrigger(!searchTrigger); // Toggle the searchTrigger state to force a re-render
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error("Error fetching more Pokemon:", error);
          setLoading(false);
        });
    }
  };

  const matchesSearchCriteria = (pokemon: Pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.type.some((type) =>
        type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleDeleteSuggestion = (index: number) => {
    const updatedSuggestions = [...suggestions];
    updatedSuggestions.splice(index, 1);
    setSuggestions(updatedSuggestions); // Update the state
    setSuggestionsTrigger(false);
  };

  const handleDeleteSuggestions = () => {
    setSuggestions([]); // Update the state
  };

  const handleInputClick = () => {
    setSuggestionsTrigger(true);
  };

  return (
    <div className="pokemon-list-container">
      <div className="search-bar">
        <div id="search-suggestions-container">
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={handleInputChange}
            onClick={handleInputClick}
            list="search-suggestions"
          />
          {suggestionsTrigger && suggestions.length > 0 && (
            <ul id="search-suggestions">
              <li className="search-suggestions-header">
                <div className="recent_searches">RECENT SEARCHES</div>
                <div className="clear" onClick={handleDeleteSuggestions}>
                  CLEAR
                </div>
              </li>
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <div
                    className="search-suggestions-word"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                  <div
                    className="suggestion-delete-button"
                    onClick={() => handleDeleteSuggestion(index)}
                  >
                    X
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="pokemon-list">
        {(searchResult.length === 0 ? pokemonList : searchResult).map(
          (pokemon, index) => (
            <Link key={index} to={`/pokemon/${pokemon.name}`}>
              <PokemonCard
                key={index}
                number={pokemon.number}
                img={pokemon.image}
                name={pokemon.name}
              />
            </Link>
          )
        )}
      </div>
      {nextPage && (
        <button
          className="load-more-button"
          onClick={loadMorePokemon}
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Loading..." : "Load more..."}
        </button>
      )}
    </div>
  );
}

export default PokemonList;
