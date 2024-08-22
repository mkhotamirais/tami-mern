import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/hooks/useTodo";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Todo4Add() {
  const [text, setText] = useState("");
  const { addTodo, isEdit, setIsEdit } = useTodo();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      addTodo(text);
      toast.success(`Add ${text} success`);
      setText("");
    } else toast.error(`Input text required`);
  };

  const onFocus = () => {
    setIsEdit(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-1">
        <Input
          disabled={isEdit !== null}
          onFocus={onFocus}
          placeholder="add todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button disabled={isEdit !== null} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
