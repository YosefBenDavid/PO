import React, { useState, useEffect } from "react";
import "./PokemonGrid.scss";
import { Link } from "react-router-dom";
import PokemonCard from "../PokemonCard/PokemonCard";
import {
  extractPokemonNumber,
  getPokemonType,
} from "../../Utilities/Utillities";
import heart from '../../assets/like.svg'
import arrow from '../../assets/RightArrow.svg'


type Pokemon = {
  name: string;
  number: string;
  image: string;
  type: string[];
  description: string;
  stats: {
    HP: number;
    Attack: number;
    Defense: number;
    "Special Attack": number;
    "Special Defense": number;
    Speed: number;
  };
};

function getPokemonNameFromUrl() {
  const url = window.location.href;
  const segments = url.split("/");
  return segments.pop();
}

const PokemonGrid: React.FC = () => {
  const pokemonName = getPokemonNameFromUrl();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  interface FlavorTextEntry {
    language: {
      name: string;
    };
    flavor_text: string;
  }
  
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
  
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();
  
        const description: FlavorTextEntry | undefined = speciesData.flavor_text_entries.find(
          (entry: FlavorTextEntry) => entry.language.name === "en"
        );
  
        const fetchedPokemon = {
          name: pokemonData.name,
          number: pokemonData.id.toString(),
          image: pokemonData.sprites.front_default,
          type: pokemonData.types.map((type: { type: { name: string } }) => type.type.name),
          description: description ? description.flavor_text : "No data collected",
          stats: {
            HP: pokemonData.stats[0].base_stat,
            Attack: pokemonData.stats[1].base_stat,
            Defense: pokemonData.stats[2].base_stat,
            "Special Attack": pokemonData.stats[3].base_stat,
            "Special Defense": pokemonData.stats[4].base_stat,
            Speed: pokemonData.stats[5].base_stat,
          },
        };
  
        setPokemon(fetchedPokemon);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setIsLoading(false);
      }
    };
  
    fetchPokemon();
  }, [pokemonName]); // Added dependency array to useEffect
  
  return (
    <div className="pokemon-grid">
      {isLoading ? (
        <div>Loading...</div>
      ) : pokemon ? (
        <div className="pokemon-details-overlay">
          <Link className="back-btn" to="/">
          <img src={arrow} alt="arrow" className="arrow-logo" />
            Back
          </Link>
          <div className="pokemon-details">
          <img src={heart} alt="like" className="like-logo" />
            <div className="left-div">
              <PokemonCard
                number={extractPokemonNumber(pokemon.number)}
                img={pokemon.image}
                name={pokemon.name}
              />
              <div className="pokemon-types">
                {pokemon.type.map((type: string, index) => (
                  <p
                    className={type}
                    key={index}
                    style={{ backgroundColor: getPokemonType(type) }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </p>
                ))}
              </div>
            </div>
            <div className="line"></div>
            <div className="right-div">
              <div className="pokemon-description">
                <h3>Description:</h3>
                <p>{pokemon.description}</p>
              </div>
              <div className="pokemon-stats">
                <h3>Stats:</h3>
                <div className="stats-container">
                  <div>
                    <p>HP: {pokemon.stats.HP}</p>
                    <p>Attack: {pokemon.stats.Attack}</p>
                    <p>Defense: {pokemon.stats.Defense}</p>
                  </div>
                  <div>
                    <p>Special Atk: {pokemon.stats["Special Attack"]}</p>
                    <p>Special Def: {pokemon.stats["Special Defense"]}</p>
                    <p>Speed: {pokemon.stats.Speed}</p>
                  </div>
                  <div className="total">
                    <p>
                      Total:{" "}
                      {Object.values(pokemon.stats).reduce(
                        (acc, curr) => acc + curr,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default PokemonGrid;
