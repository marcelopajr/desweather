import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { getCityWeatherDaily } from "../../services/api";
import { Card } from "../Card";

import styles from "./styles.module.scss";

type DailyForecastProps = {
  position: [number, number];
};

type WeatherDataDaily = {
  date: string;
  maxTemp: number;
  minTemp: number;
};

export function DailyForecast({ position }: DailyForecastProps) {
  const [weatherDataDaily, setWeatherDataDaily] =
    useState<WeatherDataDaily[]>(null);

  useEffect(() => {
    if (position) {
      getCityWeatherDaily(position[0], position[1])
        .then((response: AxiosResponse) => {
          if ("daily" in response) {
            const data = parseDailyWeather(response.daily);

            setWeatherDataDaily(data);
          }
        })
        .catch((error: AxiosError) => {
          console.error(error);
          setWeatherDataDaily(null);
        });
    }
  }, [position]);

  function parseDailyWeather(daily) {
    return daily.time.map((time, index) => {
      return {
        date: daily.time[index],
        maxTemp: Math.round(daily.temperature_2m_max[index]),
        minTemp: Math.round(daily.temperature_2m_min[index]),
      };
    });
  }

  if (weatherDataDaily) {
    return (
      <div className={`${styles.container} animeUp`}>
        {weatherDataDaily?.map(
          (
            dailyData: {
              date: string;
              maxTemp: number;
              minTemp: number;
            },
            index: number
          ) => (
            <Card
              key={index}
              date={dailyData.date}
              maxTemp={dailyData.maxTemp}
              minTemp={dailyData.minTemp}
            />
          )
        )}
      </div>
    );
  }
  return <></>;
}
