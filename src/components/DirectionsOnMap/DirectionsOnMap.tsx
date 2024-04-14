import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./DirectionsOnMap.scss";
import pokeballIcon from "../../assets/4.svg";
import locationPointerIcon from "../../assets/location-pointer-blue.svg";

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

          const map = new google.maps.Map(
            mapRef.current as HTMLDivElement,
            mapOptions
          );

          const addMarkersAndRoute = () => {
            const originMarker = new google.maps.Marker({
              position: new google.maps.LatLng(32.064584, 34.771829),
              map,
              icon: {
                url: locationPointerIcon,
                scaledSize: new google.maps.Size(32, 32),
              },
            });

            const destinationMarker = new google.maps.Marker({
              position: new google.maps.LatLng(latitude, longitude),
              map,
              icon: {
                url: pokeballIcon,
                scaledSize: new google.maps.Size(32, 32),
              },
            });

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              map,
              markerOptions: {
                icon: { url: "" },
              },
            });

            const request: google.maps.DirectionsRequest = {
              origin: originMarker.getPosition() as google.maps.LatLng,
              destination:
                destinationMarker.getPosition() as google.maps.LatLng,
              travelMode: google.maps.TravelMode.WALKING,
            };

            directionsService.route(request, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
              } else {
                console.error("Error fetching directions:", status);
              }
            });
          };

          if (showDirections) {
            addMarkersAndRoute();
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
