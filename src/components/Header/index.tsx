import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src="/logo.svg" alt="Desweather" />

        <p>Your climate friend</p>

        <span>Input</span>
      </div>
    </header>
  );
}
