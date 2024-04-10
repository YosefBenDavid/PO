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
  console.log(pokemonName);

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        // Fetch additional details for each Pokemon
        const fetchedPokemon: Pokemon = {
          name: data.name,
          number: data.id.toString(),
          image: data.sprites.front_default,
          type: data.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
          description: "", // Initially set to empty string
          stats: {
            HP: data.stats[0].base_stat,
            Attack: data.stats[1].base_stat,
            Defense: data.stats[2].base_stat,
            "Special Attack": data.stats[3].base_stat,
            "Special Defense": data.stats[4].base_stat,
            Speed: data.stats[5].base_stat,
          },
        };
        setPokemon(fetchedPokemon);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Pokemon:", error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        const description = data.flavor_text_entries.find(
          (entry: { language: { name: string }; flavor_text: string }) =>
            entry.language.name === "en" // Assuming you want English text
        );
        if (description) {
          setPokemon((prevPokemon) => ({
            ...prevPokemon!,
            description: description.flavor_text,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching Pokemon description:", error);
      });
  }, [pokemonName]);

  return (
    <div className="pokemon-grid">
      {isLoading ? ( // Display loading indicator while data is being fetched
        <div>Loading...</div>
      ) : pokemon ? ( // Display the component once data is fetched
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
