import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useV4, V4Products } from "@/hooks/useV4";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";
import { url } from "@/lib/constants";
import { useTransition } from "react";

export default function V4ProductDelDialog({ item }: { item: V4Products }) {
  const [pending, startTransition] = useTransition();
  const { getData } = useV4();
  const onDel = async () => {
    startTransition(() => {
      axios
        .delete(`${url}/v4/product/${item._id}`)
        .then((res) => {
          toast.success(res.data.message);
          getData();
        })
        .catch((err) => {
          toast.error(err.response.data.error || err.message);
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <FaTrashCan className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Delete {item?.name}, are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="space-x-1">
            <DialogClose asChild>
              <Button disabled={pending} onClick={onDel} size="sm" variant="destructive">
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={pending} size="sm" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
