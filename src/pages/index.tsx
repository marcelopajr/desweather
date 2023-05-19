import Head from "next/head";
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

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to {title}</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://br.linkedin.com/in/marcelopajr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with 💜 by&nbsp;<b>Marcelo Pereira</b>
        </a>
      </footer>
    </div>
  );
}
