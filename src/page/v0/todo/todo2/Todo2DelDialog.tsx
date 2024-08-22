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
import { Trash, X } from "lucide-react";
import { InitialTodo, Todo2Context } from "./Todo2Provider";
import React, { useContext } from "react";
import { enqueueSnackbar } from "notistack";

interface Todo2DelDialogProps {
  item: InitialTodo;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
}
export default function Todo2DelDialog({ item, setNewText }: Todo2DelDialogProps) {
  const context = useContext(Todo2Context);
  if (!context) throw Error("error context");
  const { dispatch, isEdit, setIsEdit } = context;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "DELETE_TODO", payload: item.id });
    enqueueSnackbar(`Delete ${item.text} success`, { variant: "success" });
  };

  const onCancel = () => {
    setIsEdit(null);
    setNewText(item.text);
  };

  return (
    <Dialog>
      {isEdit === item.id ? (
        <Button variant="link" size="icon" onClick={onCancel}>
          <X className="size-4 text-red-500" />
        </Button>
      ) : (
        <DialogTrigger className="flex" asChild>
          <Button variant="link" size="icon">
            <Trash className="size-4 text-red-500" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {item.text}, Are you sure?</DialogTitle>
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
