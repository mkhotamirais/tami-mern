import { useContext, useEffect } from "react";
import Todo2Add from "./Todo2Add";
import Todo2List from "./Todo2List";
import { Todo2Context } from "./Todo2Provider";
import Todo2DelAllDialog from "./Todo2DelAllDialog";

export default function Todo2Home() {
  const context = useContext(Todo2Context);
  if (!context) throw Error("Data must be used");
  const { todo, checkedAll, setCheckedAll, dispatch } = context;

  const checkedLength = todo.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todo.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, setCheckedAll, todo]);

  const onCheckAll = () => {
    setCheckedAll((prev) => !prev);
    dispatch({ type: "CHECK_ALL", payload: checkedAll });
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold my-2">Todo2</h2>
      <p>
        The second todo list app uses the useState, useEffect, useContext, and useReducer hooks for data management and
        state management, and the notifications are implemented using the Notistack library.
      </p>
      <Todo2Add />
      {todo.length > 0 ? (
        <>
          <div className="flex justify-between items-center border px-2 rounded-lg py-1 my-2">
            <div>
              <input
                title="checkAll"
                type="checkbox"
                id="checkAllData"
                checked={checkedAll}
                className="mr-2"
                onChange={onCheckAll}
              />
              <label htmlFor="checkAllData font-semibold">Check All</label>
            </div>
            {checkedLength > 0 && <Todo2DelAllDialog checkedLength={checkedLength} />}
          </div>
          <div className="flex flex-col gap-1 my-2">
            {todo
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((item) => (
                <Todo2List key={item.id} item={item} />
              ))}
          </div>
        </>
      ) : (
        <div className="text-center italic mt-4">Todo empty</div>
      )}
    </div>
  );
}
