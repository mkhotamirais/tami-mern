import { create } from "zustand";
import axios from "axios";
import { url } from "@/lib/constants";

const axiosCred = axios.create({ withCredentials: true });

export interface V3Products {
  _id: string;
  name: string;
  price: number | string;
  createdAt: string;
  updatedAt: string;
}

export interface V3Users {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  accessToken: string[];
  createdAt: string;
  updatedAt: string;
}

interface V3State {
  data: V3Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  singleData: V3Products | null;
  loadSingleData: boolean;
  errSingleData: string | null;
  getDataById: (id: string) => void;
  users: V3Users[];
  loadUsers: boolean;
  errUsers: string | null;
  getUsers: () => void;
  user: V3Users | null;
  loadUser: boolean;
  errUser: string | null;
  getUser: (id: string) => void;
  me: V3Users | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: () => void;
}

export const useV3 = create<V3State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: async () => {
    set({ loadData: true });
    await axiosCred
      .get(`${url}/v3/product`)
      .then((res) => {
        console.log(res.data);
        set({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ errData: err.response.data.error || err.message });
      })
      .finally(() => set({ loadData: false }));
  },
  singleData: null,
  loadSingleData: false,
  errSingleData: null,
  getDataById: async (id) => {
    set({ loadSingleData: true });
    await axiosCred
      .get(`${url}/v3/product/${id}`)
      .then((res) => {
        set({ singleData: res.data });
      })
      .catch((err) => {
        set({ errSingleData: err.response.data.error || err.message });
      })
      .finally(() => set({ loadSingleData: false }));
  },
  users: [],
  loadUsers: false,
  errUsers: null,
  getUsers: async () => {
    set({ loadUsers: true });
    await axiosCred
      .get(`${url}/v3/user`)
      .then((res) => {
        set({ users: res.data });
      })
      .catch((err) => {
        set({ errUsers: err.response.data.error || err.message });
      })
      .finally(() => set({ loadUsers: false }));
  },
  user: null,
  loadUser: false,
  errUser: null,
  getUser: async (id) => {
    set({ loadUser: true });
    await axiosCred
      .get(`${url}/v3/user/${id}`)
      .then((res) => {
        set({ user: res.data });
      })
      .catch((err) => {
        set({ errUser: err.response.data.error || err.message });
      })
      .finally(() => set({ loadUser: false }));
  },
  me: null,
  loadMe: false,
  errMe: null,
  getMe: async () => {
    set({ loadMe: true });
    await axiosCred
      .get(`${url}/v3/me`)
      .then((res) => {
        set({ me: res.data });
      })
      .catch((err) => {
        set({ errMe: err.response.data.error || err.message });
      })
      .finally(() => set({ loadMe: false }));
  },
}));
