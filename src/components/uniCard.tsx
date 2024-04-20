import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import uelL from "/workspaces/react_app/src/assets/uel.png";
import cambridgeL from "/workspaces/react_app/src/assets/cambridge.png"; 
import stanfordL from "/workspaces/react_app/src/assets/stanford.png";
import mitL from "/workspaces/react_app/src/assets/mit.png";
import oxfordL from "/workspaces/react_app/src/assets/osford.png";
import harvardL from "/workspaces/react_app/src/assets/harvard.png";
import { getUniversityData} from "../api/actions";

const uniCard: React.FC = () => {
  const [data, setData] = useState<UniversityData>();
  const [loadingState, setLoadingState] = useState(false);
  const [uni, setUni] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Car Data...");
    console.log(uni);
    setLoadingState(true);
    getUniversityData(uni)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  const getLogo = (uni: string) => {
    switch (uni) {
      case "uel":
        return uelL;
      case "oxford":
        return oxfordL;
      case "stanford":
        return stanfordL;
      case "mit":
        return mitL;
      case "cambridge":
        return cambridgeL;
        case "harvard":
          return harvardL;
      default:
        return ""; // Default case if no logo is found
    }
  };

  return (
    <Card className="max-w-[400px] items-center">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="uniname"
              type="text"
              label="uni"
              value={uni}
              onChange={(e) => {
                setUni(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
          <img
              src={getLogo(data.name)} // Get logo based on manufacturer
              alt={`${data.name} logo`}
              className="w-40 h-40 mb-4"
            />
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-3xl font-bold">{data.ranking}</p>
            <p className="text-lg">Year: {data.totalStudents}</p>
            <p className="text-lg">Color: {data.coursesTaught} </p>
            <p className="text-lg">Fuel Type: {data.totalLecturers}</p>
            <p className="text-lg">Mileage: {data.location} km/h</p>
            <p className="text-lg">Price: £{data.foundationYear}</p>
            <p className="text-lg">Date Added: {data.website}</p>
            <p className="text-lg">Date Added: {data.contactEmail}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a car company</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default uniCard;
