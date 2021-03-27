import axios from "axios"
var API_URL = process.env.REACT_APP_API_URL
var API_KEY = process.env.REACT_APP_API_KEY
export const LOGIN_URL = `/auth/login`
export const REGISTER_URL = `/auth/register`
export const REQUEST_PASSWORD_URL = `/auth/forgot-password`

export const ME_URL = `/auth/Me`
var authToken = JSON.parse(localStorage.getItem("persist:auth"))
if (authToken?.authToken != null) {
  authToken = authToken.authToken.slice(1, -1)
}
const apiClient = axios.create({
  baseURL: API_URL,
})
apiClient.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ApiKey: API_KEY,
        Authorization: `Bearer ${authToken}`,
      },
    }
  },
  (error) => Promise.reject(error)
)
export function login(userName, password) {
  return apiClient.post(LOGIN_URL, { userName, password })
}

export function register(email, fullname, username, password) {
  return apiClient.post(REGISTER_URL, { email, fullname, username, password })
}

export function requestPassword(email) {
  return apiClient.post(REQUEST_PASSWORD_URL, { email })
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return apiClient.get(ME_URL)
}
