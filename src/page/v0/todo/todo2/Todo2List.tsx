import { Button } from "@/components/ui/button";
import { Check, Edit } from "lucide-react";
import Todo2DelDialog from "./Todo2DelDialog";
import { InitialTodo, Todo2Context } from "./Todo2Provider";
import React, { useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";

export default function Todo2List({ item }: { item: InitialTodo }) {
  const context = useContext(Todo2Context);
  if (!context) throw Error("error context");
  const { dispatch, isEdit, setIsEdit } = context;

  const [newText, setNewText] = useState(item.text);

  const onChangeCheck = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newText) {
      dispatch({ type: "UPDATE_TODO", payload: { id: item.id, text: newText, updatedAt: new Date().toISOString() } });
      setIsEdit(null);
      enqueueSnackbar(`Update ${item.text} to ${newText} success`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else
      enqueueSnackbar(`Input text required`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
  };

  return (
    <div className="flex rounded-lg justify-between border items-center px-2">
      <div className="flex flex-grow gap-2 w-full">
        <input
          disabled={isEdit === item.id}
          title="input todo1"
          type="checkbox"
          checked={item.checked}
          onChange={() => onChangeCheck(item.id)}
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
        <Todo2DelDialog item={item} setNewText={setNewText} />
      </div>
    </div>
  );
}
