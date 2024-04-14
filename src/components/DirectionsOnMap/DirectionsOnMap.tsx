import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./DirectionsOnMap.scss";
import pokeballIcon from "../../assets/4.svg";
import locationPointerIcon from "../../assets/location-pointer-blue.svg";
import { addMarkersAndRoute } from "../../Utilities/Utillities";

const apiKey = import.meta.env.VITE_API_KEY;

type PokemonLocations = {
  latitude: number;
  longitude: number;
};

const DirectionsOnMap: React.FC<PokemonLocations> = ({
  latitude,
  longitude,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
        });

        const google = await loader.load();

        const initializeMap = () => {
          const mapOptions: google.maps.MapOptions = {
            center: { lat: 32.06476, lng: 34.7716346 },
            zoom: 17,
            mapId: "myApp",
          };

          const map: google.maps.Map = new google.maps.Map(
            mapRef.current as HTMLDivElement,
            mapOptions
          );

          if (showDirections) {
            addMarkersAndRoute(
              map,
              locationPointerIcon,
              pokeballIcon,
            );
          }
        };

        initializeMap();
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
      }
    };

    fetchDirections();
  }, [latitude, longitude, showDirections]);

  const handleShowDirections = () => {
    setShowDirections(true);
  };

  return (
    <div className="DirectionsOnMap-container">
      <button onClick={handleShowDirections}>Show Directions</button>
      <div className="my-map" ref={mapRef}></div>
    </div>
  );
};

export default DirectionsOnMap;
