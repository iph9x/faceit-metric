import * as axios from "axios";

const API_URL= "https://api.faceit.com/";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {  
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : 408;
    
    if (status >= 500) {
      window.console.error(error.toString());
    }
    
    return Promise.reject(error);
  }
);

export default instance;
