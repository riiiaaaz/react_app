import axios, { AxiosError } from "axios";

// const API_URL = "https://studious-palm-tree-rqpjvw6r4qvhp664-3000.app.github.dev/api";

// export const getWeatherData = async (city: string): Promise<WeatherData> => {
//   return new Promise<WeatherData>((resolve, reject) => {
//     axios
//       .get(`${API_URL}/weather/${city}`)
//       .then((res) => {
//         resolve({
//           city: city,
//           temperature: res.data.temperature,
//           humidity: res.data.humidity,
//           wind: res.data.wind,
//           rain: res.data.rain,
//         });
//       })
//       .catch((error) => {
//         if (axios.isAxiosError(error)) {
//           const axiosError = error as AxiosError;
//           if (axiosError.response?.status === 404) {
//             reject("City not found");
//           } else {
//             // It's a good practice to reject with an Error object
//             reject(axiosError.message);
//           }
//         } else {
//           // Handle non-Axios errors
//           reject("An unknown error occurred");
//         }
//       });
//   });
// };


const API_URL1 = "https://studious-palm-tree-rqpjvw6r4qvhp664-3000.app.github.dev/api";

export const getUniversityData = async (uni: string): Promise<UniversityData> => {
  return new Promise<UniversityData>((resolve, reject) => {
    axios
      .get(`${API_URL1}/university/${uni}`)
      .then((res) => {
        resolve({
          name:res.data.name,
          ranking: res.data.ranking,
          totalStudents: res.data.totalStudents,
          coursesTaught: res.data.coursesTaught,
          totalLecturers: res.data.totalLecturers,
          location:res.data.location, 
          foundationYear: res.data.foundationYear,
          website:res.data.website,
          contactEmail:res.data.contactEmail
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("uni not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
