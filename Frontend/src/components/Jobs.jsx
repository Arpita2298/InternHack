import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Jobnotfound from "./Jobnotfound";

const Jobs = () => {
  const { authUser } = useSelector((store) => store.auth);
  const {
    allJobs = [],
    searchText,
    status,
  } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ fetch jobs on mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // ✅ filter jobs based on search
  useEffect(() => {
    if (Array.isArray(allJobs)) {
      console.log("All jobs:", allJobs);

      if (!searchText && searchText.trim() !== "") {
        const keywords = searchText.toLowerCase().split(" ");
        const filteredJobs = allJobs.filter((job) =>
          keywords.some(
            (kw) =>
              job.title.toLowerCase().includes(kw) ||
              job.description.toLowerCase().includes(kw) ||
              job.location.toLowerCase().includes(kw) ||
              job.company?.name?.toLowerCase().includes(kw) // ✅ company is populated object
          )
        );
        console.log("Filtered jobs:", filteredJobs);
        setFilterJobs(filteredJobs);
      } else {
        setFilterJobs(allJobs);
      }
    }
  }, [allJobs, searchText]);

  // ✅ recruiter redirect
  useEffect(() => {
    if (authUser?.role === "recruiter") {
      navigate("/admin/jobs");
    }
  }, [authUser, navigate]);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {status === "loading" ? (
            <p>Loading jobs...</p>
          ) : filterJobs?.length > 0 ? (
            <div className="flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <Jobnotfound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
