import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { WeatherProps } from "../../services/api";
import { CustomPopup } from "../CustomPopup";

import styles from "./styles.module.scss";

type MapProps = {
  position: [number, number];
  weatherData: WeatherProps;
};

export default function Map({ position, weatherData }: MapProps) {
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound() {
        map.flyTo(position, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <CustomPopup weatherData={weatherData} />
      </Marker>
    );
  }

  useEffect(() => {
    if (position) {
      const map = document.getElementById("map");
      map?.click();
    }
  }, [position]);

  return (
    <div className={styles.container}>
      <MapContainer
        id="map"
        center={position === null ? [0, 0] : position}
        zoom={position === null ? 3 : 5}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={position}>
            <LocationMarker />
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
