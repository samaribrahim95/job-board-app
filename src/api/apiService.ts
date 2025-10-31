import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

export const GET = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};
