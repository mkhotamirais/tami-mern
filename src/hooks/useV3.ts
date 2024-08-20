import { create } from "zustand";
import axios from "axios";
import { url } from "@/lib/constants";

const axiosCred = axios.create({ withCredentials: true });

export interface V3Products {
  _id: string;
  name: string;
  price: number | string;
  tag: { _id: string; name: string }[];
  category: { _id: string; name: string };
  description: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface V3Categories {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface V3Tags {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type Reference = { _id?: string; refName: string; refLink: string };
export interface V3Kamuss {
  _id: string;
  name: string;
  description: string;
  reference?: Reference[];
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
  query: { [key: string]: string };
  setQuery: (newQuery: { [ke: string]: string }) => void;
  data: V3Products[];
  loadData: boolean;
  errData: string | null;
  getData: (params?: string) => void;
  singleData: V3Products | null;
  loadSingleData: boolean;
  errSingleData: string | null;
  getDataById: (id: string) => void;
  cat: V3Categories[];
  loadCat: boolean;
  errCat: string | null;
  getCat: () => void;
  singleCat: V3Categories | null;
  loadSingleCat: boolean;
  errSingleCat: string | null;
  getCatById: (id: string) => void;
  tag: V3Tags[];
  loadTag: boolean;
  errTag: string | null;
  getTag: () => void;
  singleTag: V3Tags | null;
  loadSingleTag: boolean;
  errSingleTag: string | null;
  getTagById: (id: string) => void;
  kamus: V3Kamuss[];
  loadKamus: boolean;
  errKamus: string | null;
  getKamus: () => void;
  singleKamus: V3Kamuss | null;
  loadSingleKamus: boolean;
  errSingleKamus: string | null;
  getKamusById: (id: string) => void;
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
  query: {},
  setQuery: (newQuery) => set((state) => ({ query: { ...state.query, ...newQuery } })),
  data: [],
  loadData: false,
  errData: null,
  getData: async (params = "") => {
    set({ loadData: true });
    await axiosCred
      .get(`${url}/v3/product?${params}`)
      .then((res) => {
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
  cat: [],
  loadCat: false,
  errCat: null,
  getCat: async () => {
    set({ loadCat: true });
    await axiosCred
      .get(`${url}/v3/category`)
      .then((res) => {
        set({ cat: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ errCat: err.response.data.error || err.message });
      })
      .finally(() => set({ loadCat: false }));
  },
  singleCat: null,
  loadSingleCat: false,
  errSingleCat: null,
  getCatById: async (id) => {
    set({ loadSingleCat: true });
    await axiosCred
      .get(`${url}/v3/category/${id}`)
      .then((res) => {
        set({ singleCat: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ errSingleCat: err.response.data.error || err.message });
      })
      .finally(() => set({ loadSingleCat: false }));
  },
  tag: [],
  loadTag: false,
  errTag: null,
  getTag: async () => {
    set({ loadTag: true });
    await axiosCred
      .get(`${url}/v3/tag`)
      .then((res) => {
        set({ tag: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ errTag: err.response.data.error || err.message });
      })
      .finally(() => set({ loadTag: false }));
  },
  singleTag: null,
  loadSingleTag: false,
  errSingleTag: null,
  getTagById: async (id) => {
    set({ loadSingleTag: true });
    await axiosCred
      .get(`${url}/v3/tag/${id}`)
      .then((res) => {
        set({ singleTag: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ errSingleTag: err.response.data.error || err.message });
      })
      .finally(() => set({ loadSingleTag: false }));
  },
  kamus: [],
  loadKamus: false,
  errKamus: null,
  getKamus: async () => {
    set({ loadKamus: true });
    await axiosCred
      .get(`${url}/v3/kamus`)
      .then((res) => {
        set({ kamus: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ errKamus: err.response.data.error || err.message });
      })
      .finally(() => set({ loadKamus: false }));
  },
  singleKamus: null,
  loadSingleKamus: false,
  errSingleKamus: null,
  getKamusById: async (id) => {
    set({ loadSingleKamus: true });
    await axiosCred
      .get(`${url}/v3/kamus/${id}`)
      .then((res) => {
        set({ singleKamus: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ errSingleKamus: err.response.data.error || err.message });
      })
      .finally(() => set({ loadSingleTag: false }));
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
