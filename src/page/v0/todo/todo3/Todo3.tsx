import { useDispatch, useSelector } from "react-redux";
import Todo3Add from "./Todo3Add";
import { RootState } from "@/redux/store";
import Todo3List from "./Todo3List";
import { Toaster } from "react-hot-toast";
import { setCheckedAll, updateCheckedAll } from "@/redux/features/todoSlice";
import { useEffect } from "react";
import Todo3DelAllDialog from "./Todo3DellAllDialog";

export default function Todo3() {
  const { todo, checkedAll } = useSelector((state: RootState) => state.todo);
  const sortedTodo = [...todo].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  // .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  // .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const checkedLength = todo.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todo.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, todo]);

  const dispatch = useDispatch();

  const onCheckAll = () => {
    dispatch(setCheckedAll(!checkedAll));
    dispatch(updateCheckedAll({ checkedAll }));
  };

  return (
    <div className="space-y-2">
      <Toaster />
      <h2 className="text-xl font-bold my-2">Todo3</h2>
      <p>
        The third to-do list project uses the Redux library for state management, allowing for centralized data and
        easier access to each state, and the notifications are implemented using the react-hot-toast library
      </p>
      <Todo3Add />
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
            {checkedLength > 0 && <Todo3DelAllDialog checkedLength={checkedLength} />}
          </div>
          <div className="flex flex-col gap-1 my-2">
            {sortedTodo.map((item) => (
              <Todo3List key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center italic mt-4">Todo empty</div>
      )}
    </div>
  );
}
