import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "./ui/avatar"; // fallback bhi import kar
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProfilePopover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.removeItem("authUser");
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <Popover>
      {/* ✅ Trigger with Avatar + Fallback */}
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={authUser?.profile?.profilePhoto}
            alt={authUser?.fullname || "profile"}
          />
          <AvatarFallback>
            {authUser?.fullname
              ? authUser.fullname.charAt(0).toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="flex gap-2">
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={authUser?.profile?.profilePhoto}
                alt={authUser?.fullname || "profile"}
              />
              <AvatarFallback>
                {authUser?.fullname
                  ? authUser.fullname.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium leading-none">
                {authUser?.fullname || "Unknown User"}
              </h4>
              {authUser && authUser?.role === "student" && (
                <p className="text-sm text-muted-foreground">
                  {authUser?.profile?.bio || "No bio available"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-gray-600">
            {authUser && authUser?.role === "student" && (
              <Link
                to="/profile"
                className="flex w-fit items-center gap-2 cursor-pointer"
              >
                <User2 />
                <p>View Profile</p>
              </Link>
            )}

            <div
              onClick={logoutHandler}
              className="flex w-fit items-center gap-2 cursor-pointer"
            >
              <LogOut />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
