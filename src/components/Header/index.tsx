import { ChangeEvent } from "react";
import { WeatherProps, getOpenWeatherApi } from "../../services/api";
import { AxiosError, AxiosResponse } from "axios";

import styles from "./styles.module.scss";

type HeaderProps = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setWeatherData: React.Dispatch<React.SetStateAction<object>>;
};

export function Header({ city, setCity, setWeatherData }: HeaderProps) {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await getOpenWeatherApi(city)
      .then((response: AxiosResponse<WeatherProps>) => {
        if ("coord" in response) setWeatherData(response);
      })
      .catch((error: AxiosError) => {
        console.error(error);
        setWeatherData(null);
      });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src="/logo.svg" alt="Desweather" />

        <p>Your climate friend</p>

        <form onSubmit={handleFormSubmit} className={styles.search}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Enter a city"
            type="search"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCity(e.target.value)
            }
          />
        </form>
      </div>
    </header>
  );
}
