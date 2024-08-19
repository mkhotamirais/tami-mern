import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { url } from "@/lib/constants";
import axios from "axios";
import { toast } from "sonner";

export default function V3MeDelDialog() {
  const onDelete = () => {
    axios
      .create({ withCredentials: true })
      .delete(`${url}/v3/me`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/v3/login";
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"} type="button">
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle>Delete your account, Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <div className="space-x-1">
            <DialogClose asChild>
              <Button onClick={onDelete} variant={"destructive"} size={"sm"}>
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant={"outline"} size={"sm"}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
