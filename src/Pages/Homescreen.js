import { useEffect, useRef, useState } from "react";

const Homescreen = () => {
  const [dropData, setDropdata] = useState(null);
  const [weather, setWeather] = useState({});
  // city
  const [city, setCity] = useState("");

  // Latitude and longitude
  const [coords, setCoords] = useState({
    lat: null,
    long: null,
  });

  // URL
  const getWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coords.lat}&lon=${coords.long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    fetch(url, {
      method: "Get",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const temp = {};
        temp.city = weather.city ? weather.city : data.city.name;
        temp.temp = data.list[0].temp.day;
        temp.url = data.list[0].weather[0].icon;
        temp.info = data.list[0].weather[0].description;
        temp.winds = data.list[0].speed;
        temp.humidity = data.list[0].humidity;
        console.log(temp);
        setWeather(temp);
      });
  };
  console.log(city.length);
  // if no city entered
  city.length == 0 &&
    !coords.lat &&
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("here");
      setCoords({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });

  // Onchange of input

  const handleChange = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
    if (e.target.value.length > 2) {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&apiKey=9c56f29c54234633b30fb40676acb672`;
      fetch(url, { method: "Get" })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setDropdata(data);
        });
    }
  };

  useEffect(() => {
    coords.lat ? getWeather() : console.log("no coords");
    console.log("HERE IN EFFECT");
  }, [coords]);

  return (
    <div className="Main-container">
      <div className="mid-container">
        <div className="serch-container">
          <input
            type="text"
            name="city"
            value={city}
            id="city"
            placeholder="Enter city name !"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <i
            className={city.length > 1 ? "fa fa-remove" : "fa fa-search"}
            onClick={() => {
              setCity("");
              setDropdata(null);
            }}
          ></i>
        </div>
        {dropData && (
          <div className="drop-container">
            {dropData &&
              dropData.features.map((data) => {
                return (
                  <div
                    className="drop-Down"
                    onClick={() => {
                      const temp = {};
                      temp.lat = data.geometry.coordinates[1];
                      temp.long = data.geometry.coordinates[0];
                      console.log(temp);
                      setCoords(temp);
                      setWeather({
                        ...weather,
                        ["city"]: data.properties.address_line1,
                      });
                      setCity(data.properties.address_line1);
                      setDropdata(null);
                    }}
                  >
                    {`${data.properties.address_line1} , ${data.properties.state} , ${data.properties.country}`}
                  </div>
                );
              })}
          </div>
        )}
        <div className="weather-info">
          <h2>{`Weather in ${weather.city ? weather.city:"Tokyo"}`}</h2>
          <h1>{`${weather.temp ? weather.temp : "23"}°C`}</h1>
          <div className="weather-desc">
            <img
              src={`https://openweathermap.org/img/wn/${weather.url ? weather.url :"01d"}@2x.png`}
              alt="weather"
            />
            <span>{weather.info ? weather.info :" Thundering"}</span>
          </div>
          <p>{`Humidity: ${weather.humidity ? weather.humidity : 40}%`}</p>
          <p>{`Wind speed: ${weather.winds ? weather.winds : 78}km/h`}</p>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
