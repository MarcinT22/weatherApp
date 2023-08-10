import { AnimationObject } from "lottie-react-native";
import { ImageSourcePropType } from "react-native";

export interface WeatherData {
  description: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  pressure?: number;
  humidity?: number;
  wind?: number;
  date?: number;
  id: number;
  name: string;
  coord?: {
    lat: number;
    lon: number;
  };
}

export interface ForecastApiData {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      id: number;
      description: string;
      main: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
}

export interface DayWeatherProps {
  item: WeatherData;
}

export interface WeatherImage {
  [key: string]: ImageSourcePropType;
}
export interface LottieImage {
  [key: string]: string | AnimationObject;
}

export interface Colors {
  primary: string;
  secondary: string;
}
export interface LoaderProps {
  color?: string;
}

export interface WeatherContextInterface {
  location: Coordinates | null | undefined;
  setLocation: React.Dispatch<
    React.SetStateAction<Coordinates | undefined | null>
  >;
  appColors: Colors;
  isUpdating: boolean;
  savedLocations: StorageData | null;
  setAppColors: React.Dispatch<React.SetStateAction<Colors>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedLocations: React.Dispatch<React.SetStateAction<StorageData | null>>;
  updateWeather: () => Promise<void>;
  fetchData: () => Promise<void>;
}

export interface WeatherProviderProps {
  children: React.ReactNode;
}

export interface StorageData {
  value: string | object | WeatherData[] | WeatherData;
}

export interface Coordinates {
  lat: number;
  lon: number;
}
