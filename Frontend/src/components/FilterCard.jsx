import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchFilters } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"],
  },
  {
    filterType: "Industry",
    key: "industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "FullStack Developer",
      "Nextjs Developer",
    ],
  },
  {
    filterType: "Salary",
    key: "salary",
    array: ["0 - 40k", "42k to 1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const dispatch = useDispatch();

  const handleChange = (filterKey, value) => {
    setSelectedFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  useEffect(() => {
    dispatch(setSearchFilters(selectedFilters));
  }, [selectedFilters]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
      </div>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="my-4">
          <h1 className="font-medium text-lg">{data.filterType}</h1>
          <RadioGroup
            value={selectedFilters[data.key]}
            onValueChange={(value) => handleChange(data.key, value)}
          >
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
