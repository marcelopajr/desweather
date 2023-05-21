import { Popup } from "react-leaflet";
import { WeatherProps } from "../../services/api";

import styles from "./styles.module.scss";

type CustomPopupProps = {
  weatherData: WeatherProps;
};

export function CustomPopup({ weatherData }: CustomPopupProps) {
  return (
    <Popup>
      {weatherData !== null ? (
        <div className={`${styles.popupContainer} animeUp`}>
          <h2>Live Weather Condition</h2>

          <div className={styles.weatherMainInfo}>
            <div>
              <h1>
                {weatherData?.main?.temp?.toFixed()}
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

          <div className={styles.weatherExtraInfo}>
            <p>
              Feels Like: {weatherData?.main?.feels_like?.toFixed()}
              &deg;C
            </p>
            <p>|</p>
            <p>Humidity: {weatherData?.main?.humidity}%</p>
          </div>
        </div>
      ) : (
        <h2>
          We were unable to display the weather for this city. Try again in a
          few minutes.
        </h2>
      )}
    </Popup>
  );
}
