import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";
import { useV3, V3Kamuss } from "@/hooks/useV3";
import { url } from "@/lib/constants";

export default function V3KamusDelDialog({ item }: { item: V3Kamuss }) {
  const { getKamus } = useV3();
  const onDelete = async () => {
    await axios
      .delete(`${url}/v3/kamus/${item._id}`)
      .then((res) => {
        toast.success(res.data.message);
        getKamus();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size={"sm"} variant={"destructive"}>
          <FaTrashCan />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {item.name}, are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="space-x-2">
            <DialogClose asChild>
              <Button onClick={onDelete} size="sm" variant={"destructive"}>
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size="sm" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
