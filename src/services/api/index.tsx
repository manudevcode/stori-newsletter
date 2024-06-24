import axios from "axios";
import { TOKEN } from "../../constants/local-storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(TOKEN);
        const response = await axios.post("/refreshToken", {
          refreshToken,
        });
        const { token } = response.data;

        localStorage.setItem(TOKEN, token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // TODO: Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
