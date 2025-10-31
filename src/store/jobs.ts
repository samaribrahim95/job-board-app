import { create } from "zustand";
import { Job } from "../types/jobs";

interface JobsState {
  jobs: null | Job[];
  setJobs: (jobs: Job[]) => void;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: null,
  setJobs: (jobs: Job[]) => set({ jobs }),
}));