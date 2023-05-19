import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://br.linkedin.com/in/marcelopajr"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made with 💜 by&nbsp;<b>Marcelo Pereira</b>
      </a>
    </footer>
  );
}
