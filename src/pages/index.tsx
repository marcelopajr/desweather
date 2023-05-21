import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WeatherProps, getCityName, getCityWeatherNow } from "../services/api";
import { Header } from "../components/Header";
import { DailyForecast } from "../components/DailyForecast";
import { Footer } from "../components/Footer";

import styles from "../styles/home.module.scss";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [position, setPosition] = useState<[number, number]>(null);
  const [city, setCity] = useState<string>("");
  const [weatherDataNow, setWeatherDataNow] = useState(null);
  const [userLocationAllowed, setUserLocationAllowed] =
    useState<boolean>(false);

  const successCallback = async (position) => {
    setUserLocationAllowed(true);
    let userCity: string;

    await getCityName(position?.coords?.latitude, position?.coords?.longitude)
      .then((response: AxiosResponse) => {
        userCity = response?.[0]?.name;
      })
      .catch((error: AxiosError) => {
        console.error(error);
        toast.error(<div>City not found!</div>);
        userCity = "";
      });

    if (userCity) {
      await getCityWeatherNow(userCity)
        .then((response: AxiosResponse<WeatherProps>) => {
          if ("coord" in response) setWeatherDataNow(response);
        })
        .catch((error: AxiosError) => {
          console.error(error);
          toast.error(<div>City not found!</div>);
          setWeatherDataNow(null);
        });
    }
  };

  const errorCallback = (error: { code: number; message: string }) => {
    setPosition(null);
    throw error;
  };

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    if (weatherDataNow) {
      setPosition([weatherDataNow?.coord?.lat, weatherDataNow?.coord?.lon]);
    }
  }, [weatherDataNow]);

  useEffect(() => {
    if (city) {
      getCityWeatherNow(city)
        .then((response: AxiosResponse<WeatherProps>) => {
          if ("coord" in response) setWeatherDataNow(response);
        })
        .catch((error: AxiosError) => {
          console.error(error);
          toast.error(<div>City not found!</div>);
          setWeatherDataNow(null);
        });
    }
  }, [city]);

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

      <ToastContainer className={styles.notification} />

      <Map
        userLocationAllowed={userLocationAllowed}
        position={position}
        weatherData={weatherDataNow}
        setCity={setCity}
      />

      <DailyForecast position={position} />

      <Footer />
    </div>
  );
}
