import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface Todo1AddProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Todo1Add({ text, setText, addTodo, setMsg, setIsEdit }: Todo1AddProps) {
  const onFocus = () => {
    setMsg("");
    setIsEdit(null);
  };
  return (
    <form onSubmit={addTodo} className="flex gap-1">
      <Input onFocus={onFocus} placeholder="add todo" value={text} onChange={(e) => setText(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
