import { Button } from "@/components/ui/button";
import { Container } from "@/components/Wrapper";
import { useState } from "react";
import Todo1 from "./todo1/Todo1";
import Todo2 from "./todo2/Todo2";
import Todo3 from "./todo3/Todo3";
import Todo4 from "./todo4/Todo4";

const todoMenu = [
  { title: "Todo1", content: <Todo1 /> },
  { title: "Todo2", content: <Todo2 /> },
  { title: "Todo3", content: <Todo3 /> },
  { title: "Todo4", content: <Todo4 /> },
];

export default function Todo() {
  const [activeTodo, setActiveTodo] = useState("Todo4");
  return (
    <div className="bg-gray-50">
      <Container>
        <header className="sticky top-0 px-3 h-16 flex gap-1 items-center justify-center bg-gray-200">
          {todoMenu.map((item, i) => (
            <Button
              variant={activeTodo === item.title ? "default" : "outline"}
              onClick={() => setActiveTodo(item.title)}
              key={i}
              className="rounded-full"
              size="sm"
            >
              {item.title}
            </Button>
          ))}
        </header>
        {todoMenu.map((item, i) => {
          if (item.title === activeTodo) {
            return (
              <div key={i} className="px-3">
                {item.content}
              </div>
            );
          } else return null;
        })}
      </Container>
    </div>
  );
}
