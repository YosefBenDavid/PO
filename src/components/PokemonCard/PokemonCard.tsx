import React from "react";
import './PokemonCard.css'

type PokemonCardProps = {
  number: string;
  img: string;
  name: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ number, img, name }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-number">{number}</div>
      <img src={img} alt={name} className="pokemon-image" />
      <div className="pokemon-name">{name}</div>
    </div>
  );
};

export default PokemonCard;