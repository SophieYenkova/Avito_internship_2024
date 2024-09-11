import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_CONSTS } from "../consts/appConsts";

export const api = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({ baseUrl: APP_CONSTS.BACKEND_URL }),
  endpoints: (builder) => ({
    getAdvertisements: builder.query({
      query: ({ page = 1, pageSize = 10, search = "", filter = {} }) => {
        const queryParams = new URLSearchParams({
          _start: `${(page - 1) * pageSize}`,
          _limit: `${pageSize}`,
          ...filter,
        });

        if (search) {
          queryParams.append("q", search);
        }

        return `/advertisements?${queryParams.toString()}`;
      },
    }),

    getAdvertisementsById: builder.query({
      query: (id) => `/advertisements/${id}`,
    }),

    addAdvertisement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/advertisements/${id}`,
        method: "POST",
        body: data,
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
