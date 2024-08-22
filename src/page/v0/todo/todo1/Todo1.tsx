import React, { useEffect, useState } from "react";
import Todo1Add from "./Todo1Add";
import Todo1List, { EditParam } from "./Todo1List";
import { v4 as uuidv4 } from "uuid";
import Todo1DelAllDialog from "./Todo1DelAllDialog";

export interface InitialTodo {
  id: string;
  text: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

// const initialTodo = [
//   {
//     id: "1",
//     text: "todo1",
//     checked: false,
//     createdAt: new Date("2023-12-12").toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: "2",
//     text: "todo2",
//     checked: true,
//     createdAt: new Date("2024-02-12").toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: "3",
//     text: "todo3",
//     checked: false,
//     createdAt: new Date("2024-01-12").toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];

export default function Todo1() {
  const [todo, setTodo] = useState<InitialTodo[] | []>([]);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [checkedAll, setCheckedAll] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("todo1");
    if (storage) {
      setTodo(JSON.parse(storage));
    } else setTodo([]);
  }, []);

  const setResult = (result: InitialTodo[]) => {
    setTodo(result);
    localStorage.setItem("todo1", JSON.stringify(result));
  };

  const checkedLength = todo.filter((t) => t.checked).length;
  useEffect(() => {
    if (checkedLength !== todo.length) {
      setCheckedAll(false);
    } else setCheckedAll(true);
  }, [checkedLength, todo.length]);

  //   Add Todo
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    if (text) {
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();
      const result = [...todo, { id: uuidv4(), text, checked: false, createdAt, updatedAt }];
      setResult(result);
      setText("");
      setMsg(`Add ${text} success`);
    } else setErr(`Input todo diperlukan`);
  };

  //   Delete Todo
  const delTodo = (e: React.FormEvent<HTMLFormElement>, todoData: InitialTodo) => {
    e.preventDefault();
    setMsg("");
    const result = todo.filter((t) => t.id !== todoData.id);
    setResult(result);
    setMsg(`Delete ${todoData.text} success`);
  };

  //   Check Todo
  const checkTodo = (id: string) => {
    setMsg("");
    const result = todo.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t));
    setResult(result);
    setTodo(result);
  };

  //   Edit Todo
  const editTodo = ({ e, item, newText }: EditParam) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    const others = todo.filter((t) => t.id !== item.id);
    const match = todo.find((t) => t.id === item.id);
    if (match && newText) {
      match.text = newText;
      match.updatedAt = new Date().toISOString();
      const result = [...others, match];
      setResult(result);
      setIsEdit(null);
      setMsg(`Edit ${item.text} success`);
    } else setErr(`Input text reqired`);
  };

  //   Check All
  const onCheckAll = () => {
    setMsg("");
    setCheckedAll((prev) => !prev);
    const result = todo.map((t) => (checkedAll ? { ...t, checked: false } : { ...t, checked: true }));
    setResult(result);
  };

  // Delete Checked
  const deleteChecked = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = todo.filter((t) => !t.checked);
    if (result.length === 0) setMsg(`Delete all data success, total deleted ${todo.length} data`);
    else setMsg(`Delete ${todo.length - result.length} data success`);
    setResult(result);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold my-2">Todo1</h2>
      <p>
        The first todo list app only uses the useState and useEffect hooks and relies solely on props for data
        transmission between parent and child components, and the notifications are implemented manually.
      </p>
      <Todo1Add text={text} setText={setText} addTodo={addTodo} setMsg={setMsg} setIsEdit={setIsEdit} />
      {msg && <div className="italic text-cyan-500 py-2">{msg}</div>}
      {err && <div className="italic text-red-500 py-2">{err}</div>}
      <div>
        {todo.length > 0 ? (
          <>
            <div className="flex justify-between items-center border px-2 rounded-lg py-1">
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
              {checkedLength > 0 && (
                <Todo1DelAllDialog deleteChecked={deleteChecked} checkedLength={checkedLength} todo={todo} />
              )}
            </div>
            <div className="flex flex-col gap-1 mt-2">
              {todo
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((item) => (
                  <Todo1List
                    key={item.id}
                    item={item}
                    delTodo={delTodo}
                    checkTodo={checkTodo}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    editTodo={editTodo}
                  />
                ))}
            </div>
          </>
        ) : (
          <div className="text-center italic mt-4">Todo empty</div>
        )}
      </div>
    </div>
  );
}
