import * as axios from "axios";

const API_URL= "https://api.faceit.com/";
// https://api.faceit.com/core/v1/nicknames/IPhoenix9
// stats/api/v1/stats/time/users/
const instanceElo = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: API_URL,
});

instanceElo.interceptors.request.use((config) => {  
  return config;
});

instanceElo.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : 408;
    if (status >= 500) {
      window.console.error(error.toString());
    }
    if (status === 401) {
      window.console.log("logout");
    }
    return Promise.reject(error);
  }
);

export default instanceElo;
