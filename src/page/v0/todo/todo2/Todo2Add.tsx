import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext } from "react";
import { Todo2Context } from "./Todo2Provider";
import { v4 as uuidv4 } from "uuid";
import { enqueueSnackbar } from "notistack";

export default function Todo2Add() {
  const context = useContext(Todo2Context);
  if (!context) throw Error("Data must be used");
  const { dispatch, text, setText, setIsEdit } = context;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    if (text) {
      dispatch({ type: "ADD_TODO", payload: { id: uuidv4(), text, checked: false, createdAt, updatedAt } });
      enqueueSnackbar(`Add ${text} success`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      setText("");
    } else
      enqueueSnackbar(`Input required`, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
  };

  const onFocus = () => {
    setIsEdit(null);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-1">
      <Input onFocus={onFocus} placeholder="add todo" value={text} onChange={(e) => setText(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
