import { useState } from "react";

const Homescreen = () => {
  const [weather, setWeather] = useState({
    humidity: 88,
    winds: 78,
    url: "01d",
    city: "tokyo",
    temp: "23",
    info: "dusky",
  });
  return (
    <div className="Main-container">
      <div className="mid-container">
        <div className="serch-container">
          <input type="text" />
          <i className="fa fa-search"></i>
        </div>
        <div className="weather-info">
          <h2>{`Weather in ${weather.city}`}</h2>
          <h1>{`${weather.temp}°C`}</h1>
          <div className="weather-desc">
            <img
              src={`https://openweathermap.org/img/wn/${weather.url}@2x.png`}
            />
            <span>{weather.info}</span>
          </div>
          <p>{`Humidity: ${weather.humidity}`}</p>
          <p>{`Wind speed: ${weather.winds}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
