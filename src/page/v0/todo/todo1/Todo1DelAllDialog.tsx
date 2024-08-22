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
import { InitialTodo } from "./Todo1";

interface Todo1DelAllDialogProps {
  deleteChecked: (e: React.FormEvent<HTMLFormElement>) => void;
  checkedLength: number;
  todo: InitialTodo[];
}

export default function Todo1DelAllDialog({ deleteChecked, checkedLength, todo }: Todo1DelAllDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete Checked
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {checkedLength < todo.length ? (
            <DialogTitle>Delete {checkedLength} checked data, Are you sure?</DialogTitle>
          ) : (
            <DialogTitle>Delete all data, Are you sure?</DialogTitle>
          )}
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <form onSubmit={deleteChecked} className="flex gap-1 justify-center sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" size="sm" variant="destructive">
              Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" size="sm" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
