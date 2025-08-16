import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

export function ApplyJobDialog({ open, setOpen }) {
  const uploadResumeRef = useRef();

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Apply Job</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Patel Mern Stack"
              className="col-span-3"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="patelmernstack@gmail.com"
              className="col-span-3"
            />
          </div>

          {/* Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              placeholder="+918080808080"
              className="col-span-3"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address" placeholder="Address" className="col-span-3" />
          </div>

          {/* Resume Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Resume</Label>
            <input ref={uploadResumeRef} type="file" accept="image/*" hidden />
            <p
              onClick={() => uploadResumeRef.current.click()}
              className="border text-center py-1 cursor-pointer rounded-md border-gray-200 w-full"
            >
              Upload
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Send Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ✅ Declare PropTypes to fix ESLint warning
ApplyJobDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
