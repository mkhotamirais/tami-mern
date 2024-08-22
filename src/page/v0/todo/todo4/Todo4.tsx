import { Toaster } from "sonner";
import Todo4Add from "./Todo4Add";
import Todo4List from "./Todo4List";
import { useTodo } from "@/hooks/useTodo";
import { useEffect, useState } from "react";
import Todo4DelAllDialog from "./Todo4DelAllDialog";

export default function Todo4() {
  const { todo, checkAllTodo, isEdit } = useTodo();
  const [checkedAll, setCheckedAll] = useState(false);

  const checkedLength = todo.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todo.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, todo]);

  const onCheckAll = () => {
    setCheckedAll((prev) => !prev);
    checkAllTodo(checkedAll);
  };

  return (
    <div className="space-y-2">
      <Toaster richColors position="top-center" />
      <h2 className="text-xl font-bold my-2">Todo4</h2>
      <p>
        Todo 4 is implemented using the Zustand library for state management, ensuring efficient and scalable state
        handling, while the Sonner library is utilized for delivering notifications, enhancing user interaction and
        feedback within the application.
      </p>
      <Todo4Add />
      {todo.length > 0 ? (
        <>
          <div className="flex justify-between items-center border px-2 rounded-lg py-1 my-2">
            <div>
              <input
                disabled={isEdit !== null}
                title="checkAll"
                type="checkbox"
                id="checkAllData"
                checked={checkedAll}
                className="mr-2"
                onChange={onCheckAll}
              />
              <label htmlFor="checkAllData font-semibold">Check All</label>
            </div>
            {checkedLength > 0 && <Todo4DelAllDialog checkedLength={checkedLength} />}
          </div>
          <div className="flex flex-col gap-1 my-2">
            {todo.map((item) => (
              <Todo4List key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center italic mt-4">Todo empty</div>
      )}
    </div>
  );
}
