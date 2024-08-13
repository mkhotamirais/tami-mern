import { create } from "zustand";
import axios from "axios";
import { url } from "./constants";

export interface V1TextInputs {
  name: string;
  description: string;
}

export interface V1TextData extends V1TextInputs {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface V1TextState {
  data: V1TextData[];
  loadPage: boolean;
  errPage: string | null;
  setData: () => void;
  singleData: V1TextInputs;
  loadSingleData: boolean;
  errSingleData: string | null;
  setDataById: (id: string) => void;
}

export const useV1Text = create<V1TextState>((set) => ({
  data: [],
  loadPage: false,
  errPage: "",
  setData: async () => {
    await axios
      .get(`${url}/v1-text`)
      .then((res) => {
        set({ loadPage: true, data: res.data });
      })
      .catch((err) => {
        set({ loadPage: true, errPage: err.response.data.error });
      })
      .finally(() => set({ loadPage: false }));
  },
  singleData: { name: "", description: "" } as V1TextData,
  loadSingleData: false,
  errSingleData: null,
  setDataById: async (id) => {
    await axios
      .get(`${url}/v1-text/${id}`)
      .then((res) => {
        const { name, description } = res.data;
        set({ loadSingleData: true, singleData: { name, description } });
      })
      .catch((err) => {
        set({ loadSingleData: true, errSingleData: err.response.data.error });
      })
      .finally(() => set({ loadSingleData: false }));
  },
}));
