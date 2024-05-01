import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { getWeatherData } from "../api/actions";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { format, addDays } from 'date-fns';

const WeatherCard: React.FC = () => {
  const [currentData, setCurrentData] = useState<WeatherData>();
  const [dailyData, setDailyData] = useState<forecast>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const today = new Date();
  const nextDay2 = format(addDays(today, 2), 'EEEE');
  const nextDay3 = format(addDays(today, 3), 'EEEE');

  const handleSearch = () => {
    setLoadingState(true);
    getWeatherData(city)
      .then((res) => {
        setError("");
        if (res) {
          setCurrentData(res.currentWeather);
          setDailyData(res.dailyWeather);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  return (
    <Card className="max-w-[400px] border-2 border-gray-200 rounded-lg shadow-lg">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col w-full p-2 space-y-4 items-center"
        >
          <Input
            id="cityname"
            type="text"
            label="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            color="primary"
            isLoading={loadingState}
            type="submit"
          >
            {loadingState ? "Loading..." : "Search"}
          </Button>
        </form>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-80 overflow-y-auto">
        {currentData ? (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{currentData.city}</h1>
            {currentData.temperature > 20 ? (
              <TiWeatherSunny className="w-36 h-36" />
            ) : (
              <TiWeatherDownpour className="w-36 h-36" />
            )}
            <p className="text-3xl font-bold">{currentData.temperature}°C</p>
            <p className="text-lg">Humidity: {currentData.humidity}%</p>
            <p className="text-lg">Wind: {currentData.wind} km/h</p>
            <p className="text-lg">Rain: {currentData.rain} %</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a city</p>
          </div>
        )}
        {dailyData && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Daily Forecast</h2>
            <p className="text-lg">Tomorrow: {dailyData.dayOne}°C</p>
            <p className="text-lg">{nextDay2}: {dailyData.dayTwo}°C</p>
            <p className="text-lg">{nextDay3}: {dailyData.dayThree}°C</p>
          </div>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {(currentData || dailyData) && <p className="text-xs text-gray-600 ">Last update successful.</p>}
          {!(currentData || dailyData) && <p className="text-xs text-gray-600 ">Waiting for input...</p>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;

