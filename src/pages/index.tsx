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
  const [cityClicked, setCityClicked] = useState<string>("");
  const [weatherDataNow, setWeatherDataNow] = useState(null);
  const [userLocationAllowed, setUserLocationAllowed] =
    useState<boolean>(false);

  const handleUserLocationAllowed = async (position) => {
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

  const handleUserLocationDenied = (error: {
    code: number;
    message: string;
  }) => {
    setPosition(null);
    throw error;
  };

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition(
      handleUserLocationAllowed,
      handleUserLocationDenied
    );
  }, []);

  useEffect(() => {
    if (weatherDataNow) {
      setPosition([weatherDataNow?.coord?.lat, weatherDataNow?.coord?.lon]);
    }
  }, [weatherDataNow]);

  useEffect(() => {
    if (cityClicked) {
      getCityWeatherNow(cityClicked)
        .then((response: AxiosResponse<WeatherProps>) => {
          if ("coord" in response) setWeatherDataNow(response);
        })
        .catch((error: AxiosError) => {
          console.error(error);
          toast.error(<div>City not found!</div>);
          setWeatherDataNow(null);
        });
    }
  }, [cityClicked]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Desweather | Your climate friend</title>
        <meta property="og:image" content="/favicon.ico" key="ogimage" />
        <meta property="og:site_name" content="Desweather" key="ogsitename" />
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
        setCityClicked={setCityClicked}
      />

      <DailyForecast position={position} />

      <Footer />
    </div>
  );
}
