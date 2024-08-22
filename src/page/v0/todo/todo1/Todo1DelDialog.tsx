import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash, X } from "lucide-react";
import { InitialTodo } from "./Todo1";

interface Todo1DelDialogProps {
  delTodo: (e: React.FormEvent<HTMLFormElement>, todoData: InitialTodo) => void;
  item: InitialTodo;
  isEdit: string | null;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  text: string;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
}

export function Todo1DelDialog({ delTodo, item, isEdit, setIsEdit, text, setNewText }: Todo1DelDialogProps) {
  return (
    <Dialog>
      {isEdit === item.id ? (
        <Button
          variant="link"
          size="icon"
          onClick={() => {
            setIsEdit(null);
            setNewText(text);
          }}
        >
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
          <DialogTitle>Delete {item.text} are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => delTodo(e, item)} className="flex gap-1 justify-center sm:justify-start">
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
