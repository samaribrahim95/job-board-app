import { ApiOptions } from "../types/api";
import { Job } from "../types/jobs";
import { GET } from "./apiService";
import { API_ENDPOINTS } from "./endpoints";

export const fetchJobs = async(p: ApiOptions<Job[]>) => {
  try {
    const data:Job[] = await GET(API_ENDPOINTS.JOBS)
    p.successCallback?.(data);
  } catch {
    p.errCallback?.()
  }
};

