import { Coordinates, ForecastApiData, WeatherData } from "../interfaces";
import { callWeatherApi } from "../config/apiCall";
import { API_KEY } from "@env";
import { isEvening } from "./dateFormat";

const defaultParams = {
  appid: API_KEY,
  units: "metric",
  lang: "pl",
};

export const getWeatherData = async (
  location: Coordinates | string
): Promise<WeatherData | undefined> => {
  try {
    const params: { q?: string; lat?: number; lon?: number } = {};

    if (typeof location === "string") {
      params.q = location;
    } else {
      params.lat = location?.lat;
      params.lon = location?.lon;
    }

    const response = await callWeatherApi.get("/weather", {
      params: {
        ...defaultParams,
        ...params,
      },
    });

    if (response === undefined) {
      return;
    }

    const { weather, main, wind, name, coord } = response.data;

    return {
      description: weather[0].description,
      temp: main.temp,
      minTemp: main.temp_min,
      maxTemp: main.temp_max,
      pressure: main.pressure,
      humidity: main.humidity,
      wind: wind.speed,
      id: weather[0].id,
      name: name,
      coord: coord,
    };
  } catch (error) {
    console.log("Błąd poczas pobierania danych pogodowych:", error);
  }
};

export const getForecastData = async (
  location: Coordinates
): Promise<WeatherData[] | undefined> => {
  try {
    const response = await callWeatherApi.get("/forecast", {
      params: {
        ...defaultParams,
        lat: location.lat,
        lon: location.lon,
      },
    });
    if (response === undefined) {
      return;
    }
    const list = response.data.list;

    return list.map((item: ForecastApiData["list"][0]) => {
      const weatherInfo = item.weather[0];

      return {
        description: weatherInfo.description,
        temp: item.main.temp,
        humidity: item.main.humidity,
        date: item.dt,
        id: weatherInfo.id,
      };
    });
  } catch (error) {
    console.log("Błąd poczas pobierania danych pogodowych:", error);
    return undefined;
  }
};

export const getWeatherImage = (value: number | undefined): string => {
  if (!value) {
    return "Unknown";
  }
  switch (true) {
    case value >= 802:
      return "Cloudy";

    case value === 801:
      return isEvening() ? "CloudyMoon" : "CloudySun";

    case value === 800:
      return isEvening() ? "Moon" : "Sun";

    case value >= 700:
      return "Mist";

    case value >= 600:
      return "Snow";

    case value >= 511:
      return "Rain";

    case value >= 500:
      return "RainSun";

    case value >= 300:
      return "Rain";

    case value >= 200:
      return "Storm";
    default:
      return "Unknown";
  }
};

export const formatWindSpeed = (value: number | undefined): string | null => {
  if (!value) {
    return null;
  }
  const wind = value * 3.6;
  return wind.toFixed(0);
};
