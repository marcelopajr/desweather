import Head from "next/head";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import styles from "../styles/home.module.scss";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Desweather | Your climate friend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Map />

      <Footer />
    </div>
  );
}
