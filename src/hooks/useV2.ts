import { create } from "zustand";
import axios from "axios";
import { url } from "@/lib/constants";

const axiosCred = axios.create({ withCredentials: true });

export interface V2Products {
  _id: string;
  name: string;
  price: number | string;
  createdAt: string;
  updatedAt: string;
}

export interface V2Users {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  accessToken: string[];
  createdAt: string;
  updatedAt: string;
}

interface V2State {
  data: V2Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  singleData: V2Products | null;
  loadSingleData: boolean;
  errSingleData: string | null;
  getDataById: (id: string) => void;
  users: V2Users[];
  loadUsers: boolean;
  errUsers: string | null;
  getUsers: () => void;
  user: V2Users | null;
  loadUser: boolean;
  errUser: string | null;
  getUser: (id: string) => void;
  me: V2Users | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: () => void;
}

export const useV2 = create<V2State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: async () => {
    set({ loadData: true });
    await axiosCred
      .get(`${url}/v2/product`)
      .then((res) => {
        set({ data: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errData: err.response.data.error });
        } else set({ errData: err.message });
      })
      .finally(() => set({ loadData: false }));
  },
  singleData: null,
  loadSingleData: false,
  errSingleData: null,
  getDataById: async (id) => {
    set({ loadSingleData: true });
    await axiosCred
      .get(`${url}/v2/product/${id}`)
      .then((res) => {
        set({ singleData: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errSingleData: err.response.data.error });
        } else set({ errSingleData: err.message });
      })
      .finally(() => set({ loadSingleData: false }));
  },
  users: [],
  loadUsers: false,
  errUsers: null,
  getUsers: async () => {
    set({ loadUsers: true });
    await axiosCred
      .get(`${url}/v2/user`)
      .then((res) => {
        set({ users: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errUsers: err.response.data.error });
        } else set({ errUsers: err.message });
      })
      .finally(() => set({ loadUsers: false }));
  },
  user: null,
  loadUser: false,
  errUser: null,
  getUser: async (id) => {
    set({ loadUser: true });
    await axiosCred
      .get(`${url}/v2/user/${id}`)
      .then((res) => {
        set({ user: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errUser: err.response.data.error });
        } else set({ errUser: err.message });
      })
      .finally(() => set({ loadUser: false }));
  },
  me: null,
  loadMe: false,
  errMe: null,
  getMe: async () => {
    set({ loadMe: true });
    await axiosCred
      .get(`${url}/v2/me`)
      .then((res) => {
        set({ me: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errMe: err.response.data.error });
        } else set({ errMe: err.message });
      })
      .finally(() => set({ loadMe: false }));
  },
}));
