import { url } from "@/lib/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("v11Product/getData", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/v1/product`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response ? rejectWithValue(error?.response?.data?.error) : rejectWithValue(error?.message);
    } else console.log("something went wrong");
  }
});

export const getSingleData = createAsyncThunk("v11Product/getSingleData", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/v1/product/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response ? rejectWithValue(error?.response?.data?.error) : rejectWithValue(error?.message);
    } else console.log("something went wrong");
  }
});

export interface InitialData {
  _id: string;
  name: string;
  price: number;
  cratedAt: string;
  updatedAt: string;
}

const v11ProductSlice = createSlice({
  name: "v11Product",
  initialState: {
    data: [],
    status: "idle",
    error: null as string | null | unknown,
    singleData: null,
    singleStatus: "idle",
    singleError: null as string | null | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getSingleData.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(getSingleData.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.singleData = action.payload;
      })
      .addCase(getSingleData.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload;
      });
  },
});

export default v11ProductSlice.reducer;
