import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Favorites from "../pages/Favorites/Favorites";
import App from "../App";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";

//todo check best way for route to the pokemon grid
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "favorites", element: <Favorites favorites={[]} /> }, // Pass an empty array as favorites
      { path: "pokemon/:Name", element: <PokemonGrid /> }, // Pass the function reference instead
    ],
  },
]);
