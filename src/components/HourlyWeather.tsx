type HourlyProps = {
  dayName: string;
  hour: string;
  temp: number;
  flTemp: number;
  windspeed: number;
  precip: number;
  weatherIcon: string;
};

function HourlyWeather({
  dayName,
  hour,
  temp,
  flTemp,
  windspeed,
  precip,
  weatherIcon,
}: HourlyProps) {
  return (
    <div className="hour-row flex flex-row row-span-6 gap-3 w-full justify-between items-center text-sm">
      <div className=" text-center justify-items-center">
        <div className="info-group">
          <span className="label capitalize">{dayName}</span>
          <span className="capitalize">{hour}</span>
        </div>
      </div>
      <div className=" text-center justify-items-center">
        <img src={weatherIcon} className="weather-icon" />
      </div>
      <div className=" text-center justify-items-center">
        <div className="info-group">
          <span className="label">Temp</span>
          <span>
            <span>{temp}</span>
            <span>&deg;</span>
          </span>
        </div>
      </div>
      <div className=" text-center justify-items-center">
        <div className="info-group">
          <span className="label">FL Temp</span>
          <span>
            <span>{flTemp}</span>
            <span>&deg;</span>
          </span>
        </div>
      </div>
      <div className=" text-center justify-items-center">
        <div className="info-group">
          <span className="label">Wind</span>
          <span className="text-sm">
            <span>{windspeed}</span>
            <span className="value-sub-info">mph</span>
          </span>
        </div>
      </div>
      <div className=" text-center justify-items-center">
        <div className="info-group">
          <span className="label">Precip</span>
          <span className="text-sm">
            <span>{precip}</span>
            <span className="value-sub-info">in</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default HourlyWeather;
