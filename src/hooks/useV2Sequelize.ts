import { create } from "zustand";
import axios from "axios";
import { urlSequelize } from "@/lib/constants";

const axiosCred = axios.create({ withCredentials: true });

// ..ngga kepake..
// const axiosCred = axios.create({ withCredentials: true }).interceptors.request.use(
//   async (config) => {
//     const currentDate = new Date();
//     if (expire * 1000 < currentDate.getTime()) {
//       const response = await axios.get(`${urlSequelize}/v2/refresh`);
//       config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//       setToken(response.data.accessToken);
//       const decoded = jwt_decode(response.data.accessToken);
//       setName(decoded.name);
//       setExpire(decoded.exp);
//       return config;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface V2UserSequelize {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  accessToken: string;
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
  users: V2UserSequelize[];
  loadUsers: boolean;
  errUsers: string | null;
  getUsers: () => void;
  user: V2UserSequelize | null;
  loadUser: boolean;
  errUser: string | null;
  getUser: (id: string) => void;
  expire: string | null;
  accessToken: string | null;
  refresh: () => void;
  me: V2UserSequelize | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: (accessToken: string) => void;
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
  users: [],
  loadUsers: false,
  errUsers: null,
  getUsers: async () => {
    set({ loadUsers: true });
    await axios
      .get(`${urlSequelize}/v2/user`)
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
    await axios
      .get(`${urlSequelize}/v2/user/${id}`)
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
  expire: null,
  accessToken: null,
  refresh: async () => {
    await axiosCred
      .get(`${urlSequelize}/v2/refresh`)
      .then((res) => {
        const { accessToken } = res.data;
        if (accessToken) {
          console.log(res);
          set({ accessToken });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  me: null,
  loadMe: false,
  errMe: null,
  getMe: async (accessToken) => {
    set({ loadMe: true });
    await axiosCred
      .get(`${urlSequelize}/v2/me`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log(res);
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

// const response = await axios.get(`${mys}/v4/user`, { headers: { Authorization: `Bearer ${token}` } });
// .addCase(refresh.fulfilled, (state, action) => {
//   state.status = "succeeded";
//   state.decoded = jwtDecode(action.payload.data);
//   state.token = action.payload.data;
// })
