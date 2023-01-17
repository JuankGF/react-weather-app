import React from "react";

type DailyWeatherProps = {
  weatherIcon: string;
  dayName: string;
  temp: number;
  isSelectedDay: boolean;
  updateSelectedDay: (dayName: string) => void;
};

function DailyWeather({
  weatherIcon,
  dayName,
  temp,
  isSelectedDay,
  updateSelectedDay,
}: DailyWeatherProps) {
  return (
    <div
      className={`border border-slate-900 rounded-md flex flex-col items-center justify-items-center w-28 p-2 cursor-pointer ${
        isSelectedDay ? "text-slate-600 shadow-lg" : "text-slate-800 shadow-sm"
      } focus:shadow-lg hover:shadow-lg hover:text-slate-600`}
      onClick={() => updateSelectedDay(dayName)}
    >
      <img src={weatherIcon} className="weather-icon" />
      <div className="day-card-day capitalize">{dayName}</div>
      <div>
        <span className="font-bold ">{temp}</span>
        <span>&deg;</span>
      </div>
    </div>
  );
}

export default DailyWeather;
