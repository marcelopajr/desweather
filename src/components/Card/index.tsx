import styles from "./styles.module.scss";

type CardProps = {
  date: string;
  maxTemp: number;
  minTemp: number;
};

export function Card({ date, maxTemp, minTemp }: CardProps) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  })?.format(new Date(date?.replace("-", "/")));

  return (
    <div className={styles.card}>
      <h5>{weekday}</h5>
      <span>
        Max: <p>{maxTemp}°C</p>
      </span>
      <span>
        Min: <p>{minTemp}°C</p>
      </span>
    </div>
  );
}
