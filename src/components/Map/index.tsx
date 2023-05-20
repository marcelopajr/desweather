import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { WeatherProps } from "../../services/api";

import styles from "./styles.module.scss";

type MapProps = {
  position: [number, number];
  weatherData: WeatherProps;
};

export default function Map({ position, weatherData }: MapProps) {
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
              {weatherData !== null ? (
                <div className={styles.popupContainer}>
                  <h2>Live Weather Condition</h2>

                  <div className={styles.weatherMainInfo}>
                    <div>
                      <h1>
                        {weatherData?.main?.temp?.toFixed(0)}
                        &deg;C
                      </h1>

                      <h3>
                        {weatherData?.name} | {weatherData?.sys?.country}
                      </h3>
                    </div>

                    <div>
                      <div className={styles.weatherIcon}>
                        <img
                          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                          alt="Weather Icon"
                        />
                      </div>
                      <h3>{weatherData?.weather[0]?.main}</h3>
                    </div>
                  </div>

                  <div>
                    <p>
                      Min: {weatherData?.main?.temp_min?.toFixed(0)}
                      &deg;C | Max: {weatherData?.main?.temp_max?.toFixed(0)}
                      &deg;C | Humidity: {weatherData?.main?.humidity}%
                    </p>
                  </div>
                </div>
              ) : (
                <h2>
                  We were unable to display the weather for this city. Try again
                  in a few minutes.
                </h2>
              )}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
