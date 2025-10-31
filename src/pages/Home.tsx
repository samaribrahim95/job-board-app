import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobsApi";
import { Job } from "../types/jobs";
import { useJobsStore } from "../store/jobs";
import { Link } from "react-router";
import Filter from "../components/Filter";
import heartThinIcon from '../assets/imgs/heart-thin-icon.svg';
import heartIcon from '../assets/imgs/heart-icon.svg';
import { useFavoriteStore } from "../store/favorites";

const Home = () => {
  const {setJobs} = useJobsStore();
  const {addFavorite, removeFavorite, isFavorite} = useFavoriteStore();
  const [filteredJobs, setfilteredJobs] = useState<Job[]>([])

   useEffect(() => {
    fetchJobs({
      successCallback : (data: Job[]) => {
        setJobs(data)
        setfilteredJobs(data)
      }
    });
  }, [])

  return (
    <div className="container mx-auto">
      <Filter onFilter={(jobs) => setfilteredJobs(jobs)} />
      {
        filteredJobs?.map((job, index) => 
          <div key={index} className="border border-zinc-100 shadow-lg rounded-lg my-10 p-5 bg-zinc-50">
            <div className="flex justify-between items-center">
              <Link to={`/job/${job.id}`}><h3 className="text-xl font-bold">{job.title}</h3></Link>
              <button className="cursor-pointer" onClick={() => isFavorite(job.id)? removeFavorite(job.id) : addFavorite(job)}>
                <img src={isFavorite(job.id) ? heartIcon : heartThinIcon} className="w-8" />
              </button>
            </div>
            <p className="text-zinc-500 font-medium mb-3">{job.company}</p>
            <p className="mb-1">{job.description}</p>
            <p className="text-sm text-zinc-500 mb-3">{job.location}</p>
            <Link to={`/job/${job.id}`} className="font-medium">Read More</Link>
          </div>
        )
      }
    </div>
  )
}

export default Home