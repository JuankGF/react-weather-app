type DayWeatherHeaderProps = {
  currentTemp?: number;
  weatherIcon?: string;
  maxTemp?: number;
  minTemp?: number;
  flMaxTemp?: number;
  flMinTemp?: number;
  windspeed?: number;
  precip?: number;
};

function DayWeatherHeader({
  weatherIcon = "/src/icons/cloud-sun.svg",
  minTemp = 66,
  maxTemp = 70,
  flMaxTemp = 68,
  flMinTemp = 65,
  windspeed = 6,
  precip = 0,
  currentTemp = 68,
}: DayWeatherHeaderProps) {
  return (
    <header className="flex items-center">
      <div className="header-left flex items-center justify-left w-1/2 my-1 p-1 border-r-2 border-black">
        <img
          src={weatherIcon}
          className="weather-current-icon weather-icon lg"
        />
        <div className="header-current-temp">
          <span>{currentTemp}</span>&deg;
        </div>
      </div>
      <div className="header-right grid grid-flow-col w-1/2 justify-around gap-2 col-span-3 row-span-2 ml-1">
        <div className="info-group">
          <div className="label">High</div>
          <div>
            <span>{maxTemp}</span>&deg;
          </div>
        </div>
        <div className="info-group">
          <div className="label">FL High</div>
          <div>
            <span>{flMaxTemp}</span>&deg;
          </div>
        </div>
        <div className="info-group">
          <div className="label">Wind</div>
          <div>
            <span>{windspeed}</span>
            <span className="value-sub-info">mph</span>
          </div>
        </div>
        <div className="info-group">
          <div className="label">Low</div>
          <div>
            <span>{minTemp}</span>&deg;
          </div>
        </div>
        <div className="info-group">
          <div className="label">FL Low</div>
          <div>
            <span>{flMinTemp}</span>&deg;
          </div>
        </div>
        <div className="info-group">
          <div className="label">Precip</div>
          <div>
            <span>{precip}</span>
            <span className="value-sub-info">in</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DayWeatherHeader;
