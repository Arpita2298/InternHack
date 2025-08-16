import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/company")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setCompanies(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllCompanies;
