import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_CONSTS } from "../consts/appConsts";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: APP_CONSTS.BACKEND_URL }),
  endpoints: (builder) => ({
    getAdvertisements: builder.query({
      query: ({ page = 1, pageSize = 10, search = "", sort }) => {
        const queryParams = new URLSearchParams({
          _start: `${(page - 1) * pageSize}`,
          _limit: `${pageSize}`,
          _sort: `${sort}`,
          name: `${search}`,
        });
        return `/advertisements?${queryParams.toString()}`;
      },
    }),

    getAdvertisementsById: builder.query({
      query: (id) => `/advertisements/${id}`,
    }),

    getAdvertisementsTotal: builder.query({
      query: ({ search }) => `/advertisements/?name=${search}`,
    }),

    addAdvertisement: builder.mutation({
      query: (data) => ({
        url: `/advertisements/`,
        method: "POST",
        body: {
          ...data,
          createdAt: new Date().toISOString(),
          views: 0,
          likes: 0,
        },
      }),
    }),
    updateAdvertisement: builder.mutation({
      query:  ({ id, data }) => ({
        url: `/advertisements/${id}`,
        method: "PATCH",
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
  useGetAdvertisementsTotalQuery,
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
  useDeleteAdvertisementMutation,
  useGetOrdersQuery,
  useGetOrdersByIdQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
} = api;
