import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setCompanies } from "@/redux/companySlice";
import useGetAllCompanies from "../hooks/useGetAllCompanies";

const BrowseCompanies = () => {
  const dispatch = useDispatch();
  useGetAllCompanies();
  const { allCompanies } = useSelector((store) => store.company);

  //✅Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/company");
        const data = await res.json();
        if (data.success) {
          dispatch(setCompanies(data.data));
        } else {
          console.error("Error fetching companies:", data.message);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };

    fetchCompanies();

    return () => {
      // Clear companies when unmounting
      dispatch(setCompanies([]));
    };
  }, [dispatch]);

  const companyList = Array.isArray(allCompanies) ? allCompanies : [];

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Companies ({companyList.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {companyList.length > 0 ? (
            companyList.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border p-4 rounded shadow">
                  <h2 className="font-semibold text-lg">{company.name}</h2>
                  <p>{company.location}</p>
                  <p className="text-sm text-gray-600">{company.industry}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <span>No Companies Found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCompanies;
