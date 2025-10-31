import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = new AxiosHeaders({
        ...config.headers,
        Authorization: `Bearer ${token}`,
      });
    }

    const lang = localStorage.getItem("lang") || "en";
    config.headers = new AxiosHeaders({
      ...config.headers,
      "Accept-Language": lang,
      "Content-Type": "application/json",
    });

    config.headers["App-Version"] = "1.0.0";

    return config;
  },(error) => Promise.reject(error)
);

export default apiClient;