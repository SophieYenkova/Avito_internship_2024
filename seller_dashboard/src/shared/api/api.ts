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
      query: ({ id, data }) => ({
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
    getOrdersTotal: builder.query({
      query: ({ status }) => `/orders?status=${status > -1 ? status : ""}`,
    }),

    getOrders: builder.query({
      query: ({ page = 1, pageSize = 10, sort, status }) => {
        const queryParams = new URLSearchParams({
          _start: `${(page - 1) * pageSize}`,
          _limit: `${pageSize}`,
          _sort: `${sort}`,
          status: `${status > -1 ? status : ""}`,
        });
        return `/orders?${queryParams.toString()}`;
      },
    }),
    getOrdersById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { status: status },
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
  useGetOrdersTotalQuery,
  useGetOrdersQuery,
  useGetOrdersByIdQuery,
  useUpdateOrderMutation
} = api;
