import { useEffect, useState } from "react";

import "./App.css";
import { DayWeatherHead, DailyWeather, HourlyWeather } from "./components";
import { useGetWeather } from "./hooks";
import { WeatherData } from "./types";
import { DAY_Formatter, getIconUrl, HOUR_Formatter } from "./utils";

type GeolocationProps = {
  coords: { latitude: number; longitude: number };
};

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [selectedDay, setSelectedDay] = useState<string>();

  const positionSuccess = ({ coords }: GeolocationProps) => {
    useGetWeather(
      coords.latitude,
      coords.longitude,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )
      .then((weatherData: WeatherData) => {
        setWeatherData(weatherData);
        setSelectedDay(DAY_Formatter.format(weatherData.current.timestamp));
      })
      .catch((e) => {
        console.error(e);
        alert("Error getting weather info.");
      });
  };

  const positionFail = () => {
    alert("Error getting your location. Allow us to use your location.");
  };

  useEffect(() => {
    return () => {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionFail);
    };
  }, []);

  const { current, daily, hourly } = weatherData || {};

  return (
    <div
      className={`App flex flex-col relative h-full ${
        !weatherData && "blurred"
      }`}
    >
      <DayWeatherHead
        currentTemp={current?.currentTemp}
        maxTemp={current?.highTemp}
        minTemp={current?.lowTemp}
        flMaxTemp={current?.highFlTemp}
        flMinTemp={current?.lowFlTemp}
        precip={current?.precip}
        windspeed={current?.windSpeed}
        weatherIcon={getIconUrl(current?.iconCode)}
      />
      <div className="grid grid-flow-col gap-3 mt-5 m-6 justify-around">
        {daily?.map(({ iconCode, maxTemp, timestamp }) => {
          const dayName = DAY_Formatter.format(timestamp);
          return (
            <DailyWeather
              key={timestamp}
              isSelectedDay={dayName === selectedDay}
              dayName={dayName}
              temp={maxTemp}
              weatherIcon={getIconUrl(iconCode)}
              updateSelectedDay={(dayname) => setSelectedDay(dayname)}
            />
          );
        })}
      </div>
      <div className="grid grid-flow-row gap-3 mt-5 p-4 relative overflow-auto h-full">
        {hourly?.map(
          ({ iconCode, temp, timestamp, feelsLike, precip, windSpeed }) =>
            DAY_Formatter.format(timestamp) === selectedDay && (
              <HourlyWeather
                key={timestamp}
                temp={temp}
                flTemp={feelsLike}
                precip={precip}
                windspeed={windSpeed}
                dayName={DAY_Formatter.format(timestamp)}
                hour={HOUR_Formatter.format(timestamp)}
                weatherIcon={getIconUrl(iconCode)}
              />
            )
        )}
      </div>
    </div>
  );
}

export default App;
