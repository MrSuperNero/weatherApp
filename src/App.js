import React, { useState } from 'react';
import './css/app.css';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudRain, faCloudShowersHeavy, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const weatherAPI = {
    key: "ae1a13c2989addd4beba02438e8e456d",
    baseURL: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = event => {
        if (event.key === "Enter") {
            fetch(`${weatherAPI.baseURL}weather?q=${query}&units=imperial&APPID=${weatherAPI.key}`)
                .then(result => result.json())
                .then(data => {
                    setWeather(data);
                    setQuery("");
                    console.log(data)
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],  
            day = days[d.getDay()],
            date = d.getDate(),
            month = months[d.getMonth()],
            year = d.getFullYear();

        return `${day} ${month} ${date}, ${year}`;
    }

    const weatherIcon = () => {
        if (weather.weather[0].main === "Clear") {
            return faSun;
        } else if (weather.weather[0].main === "Clouds") {
            return faCloudSun;
        } else if (weather.weather[0].main === "Rain" || weather.weather[0].main === "Drizzle") {
            return faCloudRain;
        } else if (weather.weather[0].main === "Thunderstorm") {
            return faCloudShowersHeavy;
        } else if (weather.weather[0].main === "Snow") {
            return faSnowflake;
        } else {
            return faCloud;
        }
    }

    return (
        <div className={
            (typeof weather.main != "undefined") 
            ? ((weather.main.temp > 50) 
                ? (weather.weather[0].main === "Clear")
                    ? 'app sunny'
                    : 'app cloudy' 
                : 'app snow') 
            : 'app'}>
            <main>
                <div className="search-box">
                    <FontAwesome id="icon" name="search" />
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for city"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>

                {(typeof weather.main != "undefined") ? (
                <div className="data">
                    <div className="weather-box">
                        <FontAwesomeIcon 
                            icon={weatherIcon()} 
                            size="4x"
                            />
                        <div className="stats">
                            <div className="temp">{Math.ceil(weather.main.temp)}˚F</div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>

                    <div className="location-box">
                        <div className="date">{dateBuilder(new Date())}</div>
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                    </div>
                </div>
                ) : ("")}
            </main>
        </div>
    );
}

export default App;