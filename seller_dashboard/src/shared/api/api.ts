import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_CONSTS } from "../consts/appConsts";

export const api = createApi({
  reducerPath: "api", // путь в state Redux, где будут храниться данные
  baseQuery: fetchBaseQuery({ baseUrl: APP_CONSTS.BACKEND_URL }),
  endpoints: (builder) => ({
    getAdvertisements: builder.query({
      query: () => "/advertisements",
    }),
    getAdvertisementsById: builder.query({
      query: (id) => `/advertisements/${id}`,
    }),

    addAdvertisement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/advertisements/${id}`, // URL запроса
        method: "POST", // HTTP метод
        body: data, // Тело запроса
      }),
    }),
    deleteAdvertisement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/advertisements/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),

    getOrders: builder.query({
      query: () => "/orders",
    }),
    getOrdersById: builder.query({
      query: (id) => `/orders/${id}`,
    }),

    addOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAdvertisementsQuery,
  useGetAdvertisementsByIdQuery,
  useAddAdvertisementMutation,
  useDeleteAdvertisementMutation,
  useGetOrdersQuery,
  useGetOrdersByIdQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
} = api;
