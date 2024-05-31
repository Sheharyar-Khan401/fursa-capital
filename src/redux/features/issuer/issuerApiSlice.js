
import { apiSlice } from "../../api/apiSlice";


export const issuerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIssuerById: builder.query({
      query: (id) => `/companies/${id}`,
    }),

    createNewCompany: builder.mutation({
      query: (data) => ({
        url: `/companies`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data.body).toString(),
      }),
    }),
  }),
});

export const { useLazyGetIssuerByIdQuery, useCreateNewCompanyMutation } =
  issuerApiSlice;
