import { useEffect } from "react";
import { fetchJobs } from "../api/jobsApi";
import { Job } from "../types/jobs";

const Home = () => {
   useEffect(() => {
    fetchJobs({
      successCallback : (data: Job[]) => console.log(data)
    });
  }, [])
  return <>Home</>
}

export default Home