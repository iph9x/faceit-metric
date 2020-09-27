import * as axios from "axios";

const API_URL = "https://open.faceit.com/data/v4/";
const token = "bed7e688-9b35-4378-a761-a8acd33d160f";

const instanceAuth = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  baseURL: API_URL,
});

instanceAuth.interceptors.request.use((config) => {  
  return config;
});

instanceAuth.interceptors.response.use(
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

export default instanceAuth;
