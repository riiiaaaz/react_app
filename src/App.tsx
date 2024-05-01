import "./App.css";
import NavBar from "./components/NavBar";
import UniCard from "./components/uniCard"; 
import WeatherCard from "./components/WeatherCard";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto justify-center items-center h-full w-full">
        <div className="max-w-4xl w-full flex justify-between">
          <div className="w-1/2 p-4">
            <UniCard /> 
          </div>
          <div className="w-1/2 p-4">
            <WeatherCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;



