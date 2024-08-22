import { create } from "zustand";
import axios from "axios";
import { url } from "@/lib/constants";

export interface V4Products {
  _id: string;
  name: string;
  price: string | number;
  imageName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface V4State {
  data: V4Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  singleData: V4Products | null;
  loadSingleData: boolean;
  errSingleData: string | null;
  getDataById: (id: string) => void;
}

export const useV4 = create<V4State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: async () => {
    set({ loadData: true });
    await axios
      .get(`${url}/v4/product`)
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
    await axios
      .get(`${url}/v4/product/${id}`)
      .then((res) => {
        set({ singleData: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errData: err.response.data.error });
        } else set({ errData: err.message });
      })
      .finally(() => set({ loadSingleData: false }));
  },
}));
