import { Button } from "@/components/ui/button";
import { Check, Edit } from "lucide-react";
import React, { useState } from "react";
import Todo3DelDialog from "./Todo3DelDialog";
import { InitialTodo, setIsEdit, toggleCheck, updateTodo } from "@/redux/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

export default function Todo3List({ item }: { item: InitialTodo }) {
  const [newText, setNewText] = useState(item.text);
  const { isEdit } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newText) {
      dispatch(updateTodo({ id: item.id, text: newText }));
      toast.success(`Update ${item.text} to ${newText} success`);
      dispatch(setIsEdit({ id: null }));
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
          onChange={() => dispatch(toggleCheck({ id: item.id }))}
        />
        {isEdit === item.id ? (
          <form onSubmit={onSubmit} className="w-full">
            <input
              onFocus={() => dispatch(setIsEdit({ id: item.id }))}
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
                dispatch(setIsEdit({ id: item.id }));
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
          <Button
            disabled={item.checked}
            variant="link"
            size="icon"
            onClick={() => dispatch(setIsEdit({ id: item.id }))}
          >
            <Edit className="size-4 text-green-500" />
          </Button>
        )}
        <Todo3DelDialog item={item} setNewText={setNewText} />
      </div>
    </div>
  );
}
