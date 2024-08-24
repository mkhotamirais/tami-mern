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
import { useState } from "react";

export default function V3KamusDelDialog({ item }: { item: V3Kamuss }) {
  const { getKamus } = useV3();
  const [pending, setPending] = useState(false);
  const onDelete = async () => {
    setPending(true);
    await axios
      .create({ withCredentials: true })
      .delete(`${url}/v3/kamus/${item._id}`)
      .then((res) => {
        toast.success(res.data.message);
        getKamus();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      })
      .finally(() => setPending(false));
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
            <Button disabled={pending} onClick={onDelete} size="sm" variant={"destructive"}>
              {pending ? "Loading.." : "Delete"}
            </Button>
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
