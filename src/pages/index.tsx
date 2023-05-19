import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import styles from "../styles/home.module.scss";

type HomeProps = {
  title: string;
};

export default function Home({ title = "Desweather" }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title} | Your climate friend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to {title}</h1>
      </main>

      <Footer />
    </div>
  );
}
