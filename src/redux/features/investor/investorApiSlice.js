import { apiSlice } from "../../api/apiSlice";

export const investorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDealInvestor: builder.mutation({
      query: (data) => ({
        url: `/deals/${data.id}/investors`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data.body).toString(),
      }),
    }),
  }),
});

export const { useCreateDealInvestorMutation } =
investorApiSlice;
