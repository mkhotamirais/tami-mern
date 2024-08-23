import { apiSlice } from "./apiSlice";

export interface InitialData {
  _id: string;
  name: string;
  price: number;
  cratedAt: string;
  updatedAt: string;
}

export const v12ProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/v1/product",
      providesTags: (result) =>
        result
          ? [
              ...result.map((product: InitialData) => ({ type: "Product", id: product._id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (id) => `/v1/product/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({ url: "/v1/product", method: "POST", body: newProduct }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, values }) => ({ url: `/v1/product/${id}`, method: "PATCH", body: values }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Product", id: arg.id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/v1/product/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Product", id: arg.id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = v12ProductApiSlice;
