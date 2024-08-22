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
import { deleteTodo, InitialTodo, setIsEdit } from "@/redux/features/todoSlice";
import { RootState } from "@/redux/store";
import { Trash, X } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface Todo2DelDialogProps {
  item: InitialTodo;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
}

export default function Todo3DelDialog({ item, setNewText }: Todo2DelDialogProps) {
  const { isEdit } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteTodo({ id: item.id }));
    toast.success(`Delete ${item.text} success`);
  };

  const onCancel = () => {
    dispatch(setIsEdit({ id: null }));
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
