import { MapContainer, TileLayer, Marker } from "react-leaflet";

import styles from "./styles.module.scss";

export default function Map() {
  return (
    <MapContainer
      center={[-3.71, -38.54]}
      zoom={5}
      className={styles.container}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-3.71, -38.54]} />
    </MapContainer>
  );
}
