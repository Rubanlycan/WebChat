import axios from 'axios'

const api = axios.create({
    baseUrl:"http://localhost:5000/webchat"
})

//request interceptorss
api.interceptors.request.use(
    (config) => {

      config.url = config.baseUrl+config.url
      return config;
    },
    (error:any) => {
      // Handle request errors here
  
      return Promise.reject(error);
    }
  );
  // End of Request interceptor
  
  
  
  // Response interceptor

  // End of Response interceptor
  
  export default api;