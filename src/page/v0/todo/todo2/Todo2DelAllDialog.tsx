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
import React, { useContext } from "react";
import { Todo2Context } from "./Todo2Provider";
import { enqueueSnackbar } from "notistack";

export default function Todo2DelAllDialog({ checkedLength }: { checkedLength: number }) {
  const context = useContext(Todo2Context);
  if (!context) throw Error("error context");
  const { todo, dispatch } = context;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "DELETE_CHECKED" });
    if (checkedLength === todo.length) {
      enqueueSnackbar(`Delete all data success, total deleted ${todo.length} data`, { variant: "success" });
    } else enqueueSnackbar(`Delete ${checkedLength} data success`, { variant: "success" });
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
