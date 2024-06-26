import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { getUniversityData } from "../api/actions";
import uelL from "/workspaces/react_app/src/assets/uel.png";
import cambridgeL from "/workspaces/react_app/src/assets/cambridge.png";
import stanfordL from "/workspaces/react_app/src/assets/stanford.png";
import mitL from "/workspaces/react_app/src/assets/mit.png";
import oxfordL from "/workspaces/react_app/src/assets/oxford.png";
import harvardL from "/workspaces/react_app/src/assets/harvard.png";

const UniCard: React.FC = () => {
  const [data, setData] = useState<UniversityData>();
  const [loadingState, setLoadingState] = useState(false);
  const [uni, setUni] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    setLoadingState(true);
    getUniversityData(uni)
      .then((res) => {
        setError("");
        if (res) {
          setData(res);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  const getLogo = (uni: string) => {
    switch (uni.toLowerCase()) {
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
        return ""; //  if no logo is found
    }
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
            id="uniname"
            type="text"
            label="University"
            value={uni}
            onChange={(e) => {
              setUni(e.target.value);
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
        {data ? (
          <>
            <img
              src={getLogo(uni)} // logo based on university
              alt={`${data.name} logo`}
              className="w-50 h-30 mx-auto mt-2"
            />
            <div className="mb-auto">
              <h1 className="text-4xl font-bold">{data.name}</h1>
              <p className="text-2xl font-bold">Ranking: {data.ranking}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Total Students: {data.totalStudents}</p>
              <p className="text-lg">Courses Taught: {data.coursesTaught}</p>
              <p className="text-lg">Total Lecturers: {data.totalLecturers}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Location: {data.location}</p>
              <p className="text-lg">Foundation Year: {data.foundationYear}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg">
                Website:{" "}
                <a href={data.website} className="text-blue-500 hover:text-blue-700">
                  {data.website}
                </a>
              </p>
              <p className="text-lg">
                Contact Email:{" "}
                <a href={`mailto:${data.contactEmail}`} className="text-blue-500 hover:text-blue-700">
                  {data.contactEmail}
                </a>
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a university name</p>
          </div>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && <p className="text-xs text-gray-600 ">Last update successful.</p>}
          {!data && <p className="text-xs text-gray-800 ">Waiting for input...</p>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default UniCard;




