import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { WeatherProps } from "../../services/api";
import { CustomPopup } from "../CustomPopup";

import styles from "./styles.module.scss";

type MapProps = {
  userLocationAllowed: boolean;
  position: [number, number];
  weatherData: WeatherProps;
};

export default function Map({
  userLocationAllowed,
  position,
  weatherData,
}: MapProps) {
  const markerRef = useRef(null);

  function RecenterAutomatically({ position }) {
    const map = useMap();

    useEffect(() => {
      map?.flyTo(position, map.getZoom());
    }, [position, map]);

    return null;
  }

  if (!userLocationAllowed && !position) {
    return (
      <div className={`${styles.errorUserPosition} animeUp`}>
        <img src="/position.svg" alt="Position Icon" />

        <h1>Share your location</h1>
        <p>
          (Please allow access to your location from settings and refresh
          screen)
        </p>
        <span>or</span>
        <h1>Search for a city</h1>
      </div>
    );
  }

  if (position) {
    return (
      <div className={styles.container}>
        <MapContainer
          id="map"
          center={position === null ? [0, 0] : position}
          zoom={position === null ? 3 : 8}
          doubleClickZoom={false}
          whenReady={() => {
            setTimeout(() => {
              markerRef.current.openPopup();
            }, 300);
          }}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position && (
            <Marker ref={markerRef} position={position}>
              <CustomPopup weatherData={weatherData} />
            </Marker>
          )}
          <RecenterAutomatically position={position} />
        </MapContainer>
      </div>
    );
  }
}
