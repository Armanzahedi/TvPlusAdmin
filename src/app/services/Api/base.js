import axios from "axios";
var API_URL = process.env.API_URL;
var API_KEY = process.env.API_KEY;
const apiClient = axios.create({
  baseURL: API_URL,
});
apiClient.interceptors.request.use((config) => {
  return ({
    ...config,
    headers: {
        "Authorization" : `Bearer ${tokenStr}`,
        "ApiKey" : API_KEY
    }
  })
},
  error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
  response,
  async (error) => {
    return Promise.reject(error.response.data);
  },
);

const { get, post, put, delete:destroy } = apiClient;
export { get, post, put, destroy };