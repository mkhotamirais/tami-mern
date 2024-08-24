import { create } from "zustand";
import axios from "axios";
import { urlSequelize } from "@/lib/constants";

export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface V2SequelizeState {
  data: Product[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  singleData: Product | null;
  loadSingleData: boolean;
  errSingleData: string | null;
  getDataById: (id: string) => void;
}

export const useV2Sequelize = create<V2SequelizeState>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: async () => {
    set({ loadData: true });
    await axios
      .get(`${urlSequelize}/v2/product`)
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
      .get(`${urlSequelize}/v2/product/${id}`)
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
