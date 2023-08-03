import { LottieImage, WeatherImage } from "../interfaces";
import RainSun from "../assets/weatherImages/icons/rainSun.json";
import Sun from "../assets/weatherImages/icons/sun.json";
import Cloudy from "../assets/weatherImages/icons/cloudy.json";
import CloudyMoon from "../assets/weatherImages/icons/cloudyMoon.json";
import CloudySun from "../assets/weatherImages/icons/cloudySun.json";
import Moon from "../assets/weatherImages/icons/moon.json";
import Snow from "../assets/weatherImages/icons/snow.json";
import Storm from "../assets/weatherImages/icons/storm.json";
import Mist from "../assets/weatherImages/icons/mist.json";

export const icons: WeatherImage = {
  Cloudy: require("../assets/weatherImages/icons/cloud.png"),
  CloudyMoon: require("../assets/weatherImages/icons/cloudy-moon.png"),
  CloudySun: require("../assets/weatherImages/icons/cloudy-sun.png"),
  Moon: require("../assets/weatherImages/icons/moon.png"),
  RainSun: require("../assets/weatherImages/icons/rain-sun.png"),
  Rain: require("../assets/weatherImages/icons/rain.png"),
  Snow: require("../assets/weatherImages/icons/snow.png"),
  Sun: require("../assets/weatherImages/icons/sun.png"),
  Storm: require("../assets/weatherImages/icons/thunderstorm.png"),
  Mist: require("../assets/weatherImages/icons/mist.png"),
};

export const lottieIcons: LottieImage = {
  RainSun: RainSun,
  Sun: Sun,
  Cloudy: Cloudy,
  CloudyMoon: CloudyMoon,
  CloudySun: CloudySun,
  Moon: Moon,
  Rain: RainSun,
  Snow: Snow,
  Storm: Storm,
  Mist: Mist,
};
