import axios from "axios";
import {
  CurrentWeatherData,
  DailyWeatherData,
  HourlyWeatherData,
  WeatherData,
} from "../types";

type CurrentWeather = {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: number;
};

type DailyWeather = {
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  weathercode: number[];
  time: number[];
};

type HourlyWeather = {
  time: number[];
  weathercode: number[];
  temperature_2m: number[];
  apparent_temperature: number[];
  windspeed_10m: number[];
  precipitation: number[];
};

export type WeatherProps = {
  current_weather: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
};

const useGetWeather = (lat: number, lon: number, timezone: string) => {
  return axios
    .get(
      "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
      {
        params: {
          latitude: lat,
          longitude: lon,
          timezone,
        },
      }
    )
    .then(({ data }) => {
      return {
        current: getCurrentWeather(data),
        daily: getDailyWeather(data),
        hourly: getHourlyWeather(data),
      } as WeatherData;
    });
};

function getCurrentWeather({ current_weather, daily }: WeatherProps) {
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
    time: timestamp,
  } = current_weather;
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFlTemp],
    apparent_temperature_min: [minFlTemp],
    precipitation_sum: [precip],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    highFlTemp: Math.round(maxFlTemp),
    lowFlTemp: Math.round(minFlTemp),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    iconCode,
    timestamp,
  } as CurrentWeatherData;
}

function getDailyWeather({ daily }: WeatherProps) {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    } as DailyWeatherData;
  });
}

function getHourlyWeather({ hourly, current_weather }: WeatherProps) {
  return hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
      } as HourlyWeatherData;
    })
    .filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
}

export { useGetWeather };
