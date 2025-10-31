import { useEffect, useState } from "react";
import { useJobsStore } from "../store/jobs"
import { Job } from "../types/jobs";

type Props = {
  onFilter: (filteredJobs: Job[]) => void
}

const Filter = (props: Props) => {
  const {jobs} = useJobsStore();
  const [cats, setCats] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState<string>('')
  const [selectedCat, setSelectedCat] = useState<string>('')

  useEffect(() => {
    setCats(jobs?.map(job => job.category) ?? [])
  },[jobs])

  const filterByName = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget
    setJobTitle(value);
    filterJobs(value, selectedCat)
  }

  const filterByCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.currentTarget
    setSelectedCat(value);
    filterJobs(jobTitle, value)
  }

  const filterJobs = (title: string, cat:string) => {
    props.onFilter(jobs?.filter(job => job.title.toLowerCase().includes(title.toLowerCase()) && job.category.includes(cat)) ?? [])
  }

  return <div className="grid grid-cols-3 gap-3 my-5">
    <div className="md:col-span-2 col-span-3">
      <input 
        type="text" 
        value={jobTitle} 
        placeholder="Search By Job Title..." 
        className="w-full p-4 border border-zinc-200 shadow-sm rounded-lg"
        onChange={(e) =>  filterByName(e)}
      />
    </div>
    <div className="md:col-span-1 col-span-3">
      <select className="w-full p-4 border border-zinc-200 shadow-sm rounded-lg" onChange={(e) => filterByCat(e)}>
        <option value=''>All</option>
        {
          cats.map((cat, index) => <option key={index} value={cat}>{cat}</option>)
        }
      </select>
    </div>
  </div>
}

export default Filter