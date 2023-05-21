import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { WeatherProps, getCityName } from "../../services/api";
import { CustomPopup } from "../CustomPopup";

import styles from "./styles.module.scss";

type MapProps = {
  userLocationAllowed: boolean;
  position: [number, number];
  weatherData: WeatherProps;
  setCityClicked: React.Dispatch<React.SetStateAction<string>>;
};

export default function Map({
  userLocationAllowed,
  position,
  weatherData,
  setCityClicked,
}: MapProps) {
  const markerRef = useRef(null);

  function RecenterAutomatically({ position }) {
    const map = useMap();

    useEffect(() => {
      map?.setView(position, map.getZoom());
    }, [position, map]);

    return null;
  }

  function LocationFinder() {
    useMapEvents({
      click(e) {
        getCityName(e?.latlng?.lat, e?.latlng?.lng)
          .then((response: AxiosResponse) => {
            if ("name" in response[0]) setCityClicked(response?.[0]?.name);
            else toast.error(<div>City not found!</div>);
          })
          .catch((error: AxiosError) => {
            console.error(error);
            toast.error(<div>City not found!</div>);
            setCityClicked("");
          });
      },
    });

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
          <LocationFinder />
        </MapContainer>
      </div>
    );
  }
}
