import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FaTrashCan } from "react-icons/fa6";
import { InitialData, useDeleteProductMutation } from "@/redux/api/v12ProductApiSlice";
import { toast } from "sonner";

export default function V12ProductDelDialog({ item }: { item: InitialData }) {
  const [deleteProduct, { isLoading: pending }] = useDeleteProductMutation();

  const onDel = async () => {
    deleteProduct(item._id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
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
