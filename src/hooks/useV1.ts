import { create } from "zustand";
import axios from "axios";
import { url } from "@/lib/constants";

export interface V1Products {
  _id: string;
  name: string;
  price: string | number;
  createdAt: string;
  updatedAt: string;
}

interface V1State {
  data: V1Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  singleData: V1Products | null;
  loadSingleData: boolean;
  errSingleData: string | null;
  getDataById: (id: string) => void;
}

export const useV1 = create<V1State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: async () => {
    set({ loadData: true });
    await axios
      .get(`${url}/v1/product`)
      .then((res) => {
        set({ data: res.data });
      })
      .catch((err) => {
        set({ errData: err.response.data.error || err.message });
      })
      .finally(() => set({ loadData: false }));
  },
  singleData: null,
  loadSingleData: false,
  errSingleData: null,
  getDataById: async (id) => {
    set({ loadSingleData: true });
    await axios
      .get(`${url}/v1/product/${id}`)
      .then((res) => {
        set({ singleData: res.data });
      })
      .catch((err) => {
        set({ errSingleData: err.response.data.error || err.message });
      })
      .finally(() => set({ loadSingleData: false }));
  },
}));
