import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Get API base URL from env or fallback to localhost
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/job/all?keyword=${encodeURIComponent(
            searchText || ""
          )}`
        );

        // Handle both cases: array or object with success flag
        if (Array.isArray(res.data)) {
          dispatch(setAllJobs(res.data));
        } else if (res.data.success && Array.isArray(res.data.jobs)) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.warn("API did not return valid jobs data:", res.data);
          dispatch(setAllJobs([]));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        dispatch(setAllJobs([]));
      }
    };

    fetchJobs();
  }, [searchText, dispatch]);
};

export default useGetAllJobs;
