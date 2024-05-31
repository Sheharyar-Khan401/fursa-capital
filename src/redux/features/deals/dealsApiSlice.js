
import { apiSlice } from "../../api/apiSlice";
import { store } from "../../store";


export const dealsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeals: builder.query({
      query: () => "/deals",
    }),

    getDealsById: builder.query({
      query: (id) => `/deals/${id}`,
    }),
  }),
});

export const {useLazyGetDealsQuery, useLazyGetDealsByIdQuery } =
dealsApiSlice;
