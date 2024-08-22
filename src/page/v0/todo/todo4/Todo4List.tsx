import { Button } from "@/components/ui/button";
import { Check, Edit } from "lucide-react";
import React, { useState } from "react";
import { InitialTodo, useTodo } from "@/hooks/useTodo";
import Todo4DelDialog from "./Todo4DelDialog";
import { toast } from "sonner";

export default function Todo3List({ item }: { item: InitialTodo }) {
  const [newText, setNewText] = useState(item.text);
  const { isEdit, setIsEdit, toggleCheck, editTodo } = useTodo();

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newText) {
      editTodo(item.id, newText);
      toast.success(`Update ${item.text} to ${newText} success`);
      setIsEdit(null);
    } else toast.error(`Input text required`);
  };

  return (
    <div className="flex rounded-lg justify-between border items-center px-2">
      <div className="flex flex-grow gap-2 w-full">
        <input
          disabled={isEdit === item.id}
          title="input todo1"
          type="checkbox"
          checked={item.checked}
          onChange={() => toggleCheck(item.id)}
        />
        {isEdit === item.id ? (
          <form onSubmit={onSubmit} className="w-full">
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
          <Button disabled={item.checked} variant="link" size="icon" onClick={onSubmit}>
            <Check className="size-4 text-green-500" />
          </Button>
        ) : (
          <Button disabled={item.checked} variant="link" size="icon" onClick={() => setIsEdit(item.id)}>
            <Edit className="size-4 text-green-500" />
          </Button>
        )}
        <Todo4DelDialog item={item} setNewText={setNewText} />
      </div>
    </div>
  );
}
