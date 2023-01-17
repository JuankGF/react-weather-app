export type DailyWeatherData = {
  timestamp: number;
  iconCode: number;
  maxTemp: number;
};

export type HourlyWeatherData = {
  timestamp: number;
  iconCode: number;
  windSpeed: number;
  temp: number;
  feelsLike: number;
  precip: number;
};

export type WeatherData = {
  current: CurrentWeatherData;
  daily: DailyWeatherData[];
  hourly: HourlyWeatherData[];
};

export type CurrentWeatherData = {
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
  highFlTemp: number;
  lowFlTemp: number;
  windSpeed: number;
  precip: number;
  iconCode: number;
  timestamp: number;
};
