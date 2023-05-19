import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import styles from "../styles/home.module.scss";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const successCallback = (position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    };

    const errorCallback = (error: { code: number; message: string }) => {
      console.log(error);
    };

    navigator?.geolocation?.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Desweather | Your climate friend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Map position={position} />

      <Footer />
    </div>
  );
}
