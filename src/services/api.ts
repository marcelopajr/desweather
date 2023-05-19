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

export const getOpenWeatherApi = async (
  city: string
): Promise<ApiResponse | ApiError> => {
  const { data } = await axios.get<ApiResponse>(
    baseUrl + `q=${city}&appid=${apiKey}`
  );
  return data;
};
