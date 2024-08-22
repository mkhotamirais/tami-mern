import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodo, setIsEdit } from "@/redux/features/todoSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Todo3Add() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      dispatch(addTodo({ text }));
      toast.success(`Add ${text} success`);
      setText("");
    } else toast.error(`Add ${text} failed`);
  };

  const onFocus = () => {
    dispatch(setIsEdit({ id: null }));
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-1">
      <Input onFocus={onFocus} placeholder="add todo" value={text} onChange={(e) => setText(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
