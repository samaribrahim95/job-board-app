import { useParams } from "react-router";
import { useJobsStore } from "../store/jobs";
import { useEffect } from "react";
import { fetchJobs } from "../api/jobsApi";
import { Job } from "../types/jobs";
import { useFavoriteStore } from "../store/favorites";
import heartThinIcon from '../assets/imgs/heart-thin-icon.svg';
import heartIcon from '../assets/imgs/heart-icon.svg';

const SingleJob = () => {
  const { id } = useParams();
  const { jobs, setJobs} = useJobsStore();
  const {addFavorite, removeFavorite, isFavorite} = useFavoriteStore();
  const currentJob = jobs?.find(job => job.id == id)

  useEffect(() => {
    if(!jobs) {
      fetchJobs({
        successCallback : (data: Job[]) => {
          setJobs(data)
        }
      });
    }
  })

  return (
    <div className="container mx-auto my-10">
      {
        currentJob && 
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{currentJob.title}</h3>
              <button className="cursor-pointer" onClick={() => isFavorite(currentJob.id)? removeFavorite(currentJob.id) : addFavorite(currentJob)}>
                <img src={isFavorite(currentJob.id) ? heartIcon : heartThinIcon} className="w-8" />
              </button>
            </div>
            <p className="text-zinc-500 font-medium mb-3">{currentJob.company}</p>
            <p className="mb-1">{currentJob.description}</p>
            <p className="text-sm text-zinc-500 mb-3">{currentJob.location}</p>
          </>
      }
    </div>
  )
}

export default SingleJob