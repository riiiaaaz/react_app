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
import universityLogo1 from "/workspaces/react_app/src/assets/cambridge.png";
import universityLogo2 from "/workspaces/react_app/src/assets/harvard.png";
import universityLogo3 from "/workspaces/react_app/src/assets/mit.png";
import universityLogo4 from "/workspaces/react_app/src/assets/osford.png";
import universityLogo5 from "/workspaces/react_app/src/assets/stanford.png";
import universityLogo6 from "/workspaces/react_app/src/assets/uel.png";
import { getUniversityData } from "../api/actions";

const UniCard: React.FC = () => {
  const [data, setData] = useState<UniversityData[]>([]);
  const [loadingState, setLoadingState] = useState(false);
  const [uniNames, setUniNames] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    setLoadingState(true);
    const names = uniNames.split(",").map((name) => name.trim());
    Promise.all(
      names.map((name) =>
        getUniversityData(name)
          .then((res) => res)
          .catch((err) => {
            console.error(err);
            return null;
          })
      )
    )
      .then((res) => {
        setData(res.filter((uni) => uni !== null) as UniversityData[]);
        setLoadingState(false);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setError("An error occurred while fetching university data.");
      });
  };

  const getLogo = (index: number) => {
    switch (index) {
      case 0:
        return universityLogo1;
      case 1:
        return universityLogo2;
      case 2:
        return universityLogo3;
      case 3:
        return universityLogo4;
      case 4:
        return universityLogo5;
      case 5:
        return universityLogo6;
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
              id="uninames"
              type="text"
              label="University Names (Separated by commas)"
              value={uniNames}
              onChange={(e) => {
                setUniNames(e.target.value);
              }}
            />
            <Button
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
      {data.map((uni, index) => (
        <div key={index}>
          <CardBody>
            <div className="flex flex-col items-center">
              <img
                src={getLogo(index)}
                alt={`${uni.name} logo`}
                className="w-40 h-40 mb-4"
              />
              <h1 className="text-3xl font-bold">{uni.name}</h1>
              <p className="text-lg">Ranking: {uni.ranking}</p>
              <p className="text-lg">Total Students: {uni.totalStudents}</p>
              <p className="text-lg">Courses Taught: {uni.coursesTaught}</p>
              <p className="text-lg">Total Lecturers: {uni.totalLecturers}</p>
              <p className="text-lg">Location: {uni.location}</p>
              <p className="text-lg">Foundation Year: {uni.foundationYear}</p>
              <p className="text-lg">Website: {uni.website}</p>
              <p className="text-lg">Contact Email: {uni.contactEmail}</p>
            </div>
          </CardBody>
          <Divider />
        </div>
      ))}
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data.length > 0 && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {data.length === 0 && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default UniCard;

