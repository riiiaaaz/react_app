import "./App.css";
import NavBar from "./components/NavBar";
import UniCard from "./components/uniCard"; // Corrected the component name to start with an uppercase letter

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-col items-center align-middle justify-center  h-full w-full">
        <UniCard/> 
      </div>
    </div>
  );
};

export default App;

