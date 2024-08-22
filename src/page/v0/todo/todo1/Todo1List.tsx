import { Button } from "@/components/ui/button";
import { InitialTodo } from "./Todo1";
import { Todo1DelDialog } from "./Todo1DelDialog";
import { Check, Edit } from "lucide-react";
import { useState } from "react";

export interface EditParam {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>;
  item: InitialTodo;
  newText: string;
}

interface Todo1ListProps {
  item: InitialTodo;
  delTodo: (e: React.FormEvent<HTMLFormElement>, todoData: InitialTodo) => void;
  checkTodo: (id: string) => void;
  isEdit: string | null;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  editTodo: ({ e, item, newText }: EditParam) => void;
}

export default function Todo1List({ item, delTodo, checkTodo, isEdit, setIsEdit, editTodo }: Todo1ListProps) {
  const [newText, setNewText] = useState(item.text);

  return (
    <div className="flex rounded-lg justify-between border items-center px-2">
      <div className="flex flex-grow gap-2 w-full">
        <input
          disabled={isEdit === item.id}
          title="input todo1"
          type="checkbox"
          checked={item.checked}
          onChange={() => checkTodo(item.id)}
        />
        {isEdit === item.id ? (
          <form onSubmit={(e) => editTodo({ e, item, newText })} className="w-full">
            <input
              onFocus={() => setIsEdit(item.id)}
              autoFocus
              className="focus:outline-none w-full"
              title="input todo1 value"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </form>
        ) : (
          <div
            className={`w-full hover:cursor-text ${item.checked ? "line-through" : ""}`}
            onClick={() => {
              if (!item.checked) {
                setIsEdit(item.id);
              }
            }}
          >
            {newText}
          </div>
        )}
      </div>
      <div className="flex">
        {isEdit === item.id ? (
          <Button variant="link" size="icon" onClick={(e) => editTodo({ e, item, newText })}>
            <Check className="size-4 text-green-500" />
          </Button>
        ) : (
          <Button disabled={item.checked} variant="link" size="icon" onClick={() => setIsEdit(item.id)}>
            <Edit className="size-4 text-green-500" />
          </Button>
        )}
        <Todo1DelDialog
          delTodo={delTodo}
          item={item}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          text={item.text}
          setNewText={setNewText}
        />
      </div>
    </div>
  );
}
