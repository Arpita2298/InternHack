import { useState } from "react";
import PropTypes from "prop-types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApplyJobDialog } from "./ApplyJobDialog";
import { Avatar, AvatarImage } from "./ui/avatar";

const Job = ({ job }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "-";
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAt; // in ms
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // ✅ correct day calculation
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button size="icon" className="rounded-full" variant="secondary">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 my-2">
        <Button size="icon" variant="outline" className="p-6">
          <Avatar>
            {job?.company?.logo && <AvatarImage src={job.company.logo} />}
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">
            {typeof job?.company === "object"
              ? job.company?.name
              : "Unknown Company"}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h1 className="font-bold text-lg my-2">
          {job?.title || "Untitled Job"}
        </h1>
        <p className="text-sm text-gray-600">
          {job?.description || "No description provided."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        {job?.position && (
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job.position} positions
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job.salary}LPA
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        {job?._id && (
          <Button
            onClick={() => navigate(`/description/${job._id}`)}
            variant="outline"
            className="rounded-lg"
          >
            Details
          </Button>
        )}
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#7209b7] rounded-lg"
        >
          Apply Now
        </Button>
        <Button className="bg-gray-500 rounded-lg">Save For Later</Button>
      </div>

      {/* Apply Dialog */}
      <ApplyJobDialog open={open} setOpen={setOpen} />
    </div>
  );
};

// ✅ PropTypes fixed to allow optional values safely
Job.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    jobType: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    company: PropTypes.oneOfType([
      PropTypes.string, // agar sirf ObjectId aaye
      PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    ]),
  }),
};

export default Job;
