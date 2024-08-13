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
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { url } from "./constants";
import { toast } from "sonner";
import { useV1Text } from "./useV1Text";

export default function V1TextDelDialog({ id }: { id: string }) {
  const { setData } = useV1Text();

  const onDelete = async () => {
    await axios
      .delete(`${url}/v1-text/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setData();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaTrashCan />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>this action cannot be undone!</DialogDescription>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button onClick={onDelete} variant={"destructive"}>
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
