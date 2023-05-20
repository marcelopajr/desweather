import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { WeatherProps, getCityName, getCityWeatherNow } from "../services/api";
import { Header } from "../components/Header";
import { DailyForecast } from "../components/DailyForecast";
import { Footer } from "../components/Footer";

import styles from "../styles/home.module.scss";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [position, setPosition] = useState<[number, number]>(null);
  const [weatherDataNow, setWeatherDataNow] = useState(null);
  const [city, setCity] = useState<string>("");

  const successCallback = async (position) => {
    setPosition([position?.coords?.latitude, position?.coords?.longitude]);

    let userCity: string;

    await getCityName(position?.coords?.latitude, position?.coords?.longitude)
      .then((response: AxiosResponse) => {
        userCity = response?.[0]?.name;
      })
      .catch((error: AxiosError) => {
        console.error(error);
        userCity = "";
      });

    if (userCity) {
      await getCityWeatherNow(userCity)
        .then((response: AxiosResponse<WeatherProps>) => {
          if ("coord" in response) setWeatherDataNow(response);
        })
        .catch((error: AxiosError) => {
          console.error(error);
          setWeatherDataNow(null);
        });
    }
  };

  const errorCallback = (error: { code: number; message: string }) => {
    setPosition(null);
    throw error;
  };

  useEffect(() => {
    if (weatherDataNow) {
      setPosition([weatherDataNow?.coord?.lat, weatherDataNow?.coord?.lon]);
    } else {
      navigator?.geolocation?.getCurrentPosition(
        successCallback,
        errorCallback
      );
    }
  }, [weatherDataNow]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Desweather | Your climate friend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        city={city}
        setCity={setCity}
        setWeatherData={setWeatherDataNow}
      />

      <Map position={position} weatherData={weatherDataNow} />

      <DailyForecast position={position} />

      <Footer />
    </div>
  );
}
