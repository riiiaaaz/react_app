import axios, { AxiosError } from "axios";

const API_URL = "https://fictional-guacamole-5jxwp5r4qwvhv6xp-3000.app.github.dev/api";

export const getWeatherData = async (city: string): Promise<{currentWeather: WeatherData; dailyWeather: forecast}> => {
  return new Promise<{currentWeather: WeatherData, dailyWeather: forecast }>((resolve, reject) => {
    axios
      .get(`${API_URL}/weather/${city}`)
      .then((currentRes) => {
        axios.get(`${API_URL}/weather/${city}/forecast`)
        .then((dailyRes) => {
          resolve({
            currentWeather: {
              city: currentRes.data.city,
              temperature: currentRes.data.temperature,
              humidity: currentRes.data.humidity,
              wind: currentRes.data.wind,
              rain: currentRes.data.rain,
            },
            dailyWeather: {
              dayOne: dailyRes.data.dayOne,
              dayTwo: dailyRes.data.dayTwo,
              dayThree: dailyRes.data.dayThree,
            }
          });
        })

        .catch((error) => handleAxiosError(error, reject));
      })
      .catch((error) => handleAxiosError(error, reject));
  });
};

function handleAxiosError(error: any, reject: (reason?: any) => void) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      reject("City not found");
    } else {
      reject(new Error(axiosError.message));
    }
  } else {
    reject(new Error("An unknown error occurred"));
  }
}


const API_URL1 = "https://fictional-guacamole-5jxwp5r4qwvhv6xp-3000.app.github.dev/api";

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
