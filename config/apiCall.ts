import axios, { AxiosInstance } from "axios";
import { WEATHER_API_URL, FORECAST_API_URL } from "@env";

export const callWeatherApi: AxiosInstance = axios.create({
  baseURL: WEATHER_API_URL,
});

export const callForecastApi: AxiosInstance = axios.create({
  baseURL: FORECAST_API_URL,
});
