import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface InitialTodo {
  id: string;
  text: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

const setLocal = (state: { todo: InitialTodo[] }) => {
  localStorage.setItem("todo3", JSON.stringify(state.todo));
};

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

let todo: InitialTodo[];
const storage = localStorage.getItem("todo3");
if (storage) {
  todo = JSON.parse(storage);
} else todo = [];

const todoSlice = createSlice({
  name: "todo3",
  initialState: {
    todo,
    // todo: JSON.parse(localStorage.getItem("todo3") || "[]") as InitialTodo[],
    isEdit: null,
    checkedAll: false,
  },
  reducers: {
    setIsEdit(state, action) {
      state.isEdit = action.payload.id;
    },
    setCheckedAll(state, action) {
      state.checkedAll = action.payload;
    },
    addTodo(state, action) {
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();
      const result = { id: uuidv4(), text: action.payload.text, checked: false, createdAt, updatedAt };
      state.todo.push(result);
      setLocal(state);
    },
    deleteTodo(state, action) {
      const others = state.todo.filter((item) => item.id !== action.payload.id);
      state.todo = others;
      setLocal(state);
    },
    toggleCheck(state, action) {
      state.todo = state.todo.map((t) => (t.id === action.payload.id ? { ...t, checked: !t.checked } : t));
      setLocal(state);
    },
    updateTodo(state, action) {
      const updatedAt = new Date().toISOString();
      state.todo = state.todo.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text, updatedAt } : t
      );
      setLocal(state);
    },
    updateCheckedAll(state, action) {
      state.todo = state.todo.map((t) =>
        action.payload.checkedAll ? { ...t, checked: false } : { ...t, checked: true }
      );
      setLocal(state);
    },
    deleteChecked(state) {
      state.todo = state.todo.filter((t) => !t.checked);
      setLocal(state);
    },
  },
});

export const {
  setIsEdit,
  setCheckedAll,
  addTodo,
  deleteTodo,
  toggleCheck,
  updateTodo,
  updateCheckedAll,
  deleteChecked,
} = todoSlice.actions;

export default todoSlice.reducer;
