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
import { deleteChecked } from "@/redux/features/todoSlice";
import { RootState } from "@/redux/store";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Todo3DelAllDialog({ checkedLength }: { checkedLength: number }) {
  const { todo } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteChecked());
    if (checkedLength === todo.length) {
      toast.success(`Delete all data success, total deleted ${todo.length} data`);
    } else toast.success(`Delete ${checkedLength} data success`);
  };

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
        <form onSubmit={onSubmit} className="flex gap-1 justify-center sm:justify-start">
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
