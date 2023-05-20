import axios from "axios";

export type WeatherProps = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type ApiResponse = {
  data: WeatherProps;
};

type ApiError = {
  message: string;
  status: number;
};

const baseUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_APIKEY;

export const getCityWeatherNow = async (
  city: string
): Promise<ApiResponse | ApiError> => {
  const { data } = await axios.get<ApiResponse>(
    baseUrl + `/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  return data;
};

export const getCityName = async (
  lat: string,
  lon: string
): Promise<ApiResponse | ApiError> => {
  const { data } = await axios.get<ApiResponse>(
    baseUrl + `/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  return data;
};

export const getCityWeatherDaily = async (lat: number, lon: number) => {
  const { data } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  return data;
};
