export const extractPokemonNumberURL = (url: string): string => {
  const segments = url.split("/");
  const number = segments[segments.length - 2].padStart(3, "0");
  return `#${number}`;
};

export const extractPokemonNumber = (num: string): string => {
  const number = num.padStart(3, "0");
  return `#${number}`;
};

export const getPokemonType = (backgroundColor: string) => {
  switch (backgroundColor) {
    case "normal":
      return "#A8A77A";

    case "fire":
      return "#EE8130";

    case "water":
      return "#6390F0";

    case "electric":
      return "#F7D02C";

    case "grass":
      return "#7AC74C";

    case "ice":
      return " '#96D9D6'";

    case "fighting":
      return "#C22E28";

    case "poison":
      return "#A33EA1";

    case "ground":
      return "'#E2BF65'";

    case "flying":
      return "#A98FF3";

    case "psychic":
      return "#F95587";

    case "bug":
      return "#A6B91A";

    case "rock":
      return "#B6A136";

    case "ghost":
      return "#735797";

    case "dragon":
      return "#6F35FC";

    case "dark":
      return "#705746";

    case "steel":
      return "#B7B7CE";

    case "fairy":
      return "#D685AD";

    default:
      return "#000000";
  }
};

export const MoveoLocation = {latitude: 32.06534075404604,longitude: 34.77193923811189};

const TelAvivBounds = {
  north: 32.0853,
  south: 32.056,
  east: 34.7818,
  west: 34.764889
};

const generateRandomCoordinate = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const generateRandomPokemonLocation = () => {
  const latitude = generateRandomCoordinate(TelAvivBounds.south, TelAvivBounds.north);
  const longitude = generateRandomCoordinate(TelAvivBounds.west, TelAvivBounds.east);

  return { latitude: latitude, longitude: longitude };
};
