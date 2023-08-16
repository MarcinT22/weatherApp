import axios, { AxiosInstance } from "axios";
import { WEATHER_API_URL } from "@env";

export const callWeatherApi: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_WEATHER_API_URL,
});
