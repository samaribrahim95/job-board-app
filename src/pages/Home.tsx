import { useEffect } from "react";
import { fetchJobs } from "../api/jobsApi";
import { Job } from "../types/jobs";
import { useJobsStore } from "../store/jobs";

const Home = () => {
  const {jobs, setJobs} = useJobsStore();
   useEffect(() => {
    fetchJobs({
      successCallback : (data: Job[]) => setJobs(data)
    });
  }, [])
  return (
    <div className="container mx-auto">
      {
        jobs?.map((job, index) => 
          <div key={index} className="border border-zinc-100 shadow-lg rounded-lg my-10 p-5 bg-zinc-50">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-zinc-500 font-medium mb-3">{job.company}</p>
            <p className="mb-1">{job.description}</p>
            <p className="text-sm text-zinc-500">{job.location}</p>
          </div>
        )
      }
    </div>
  )
}

export default Home