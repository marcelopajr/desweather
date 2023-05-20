import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WeatherProps } from "../services/api";

import styles from "../styles/home.module.scss";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [position, setPosition] = useState<[number, number]>(null);
  const [weatherData, setWeatherData] = useState<WeatherProps>(null);
  const [city, setCity] = useState<string>("");

  const successCallback = (position) => {
    setPosition([position?.coords?.latitude, position?.coords?.longitude]);
  };

  const errorCallback = (error: { code: number; message: string }) => {
    setPosition(null);
    throw error;
  };

  useEffect(() => {
    if (weatherData) {
      setPosition([weatherData?.coord?.lat, weatherData?.coord?.lon]);
    } else {
      navigator?.geolocation?.getCurrentPosition(
        successCallback,
        errorCallback
      );
    }
  }, [weatherData]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Desweather | Your climate friend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header city={city} setCity={setCity} setWeatherData={setWeatherData} />

      <Map position={position} weatherData={weatherData} />

      <Footer />
    </div>
  );
}
