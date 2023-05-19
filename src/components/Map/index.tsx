import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import styles from "./styles.module.scss";

type MapProps = {
  position: [number, number];
};

export default function Map({ position }: MapProps) {
  return (
    <div className={styles.container}>
      <MapContainer
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
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
