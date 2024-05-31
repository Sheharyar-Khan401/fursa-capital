import { setToken } from "../../Slice/authSlice";
import { apiSlice } from "../../api/apiSlice";
import { store } from "../../store";
import { baseUrl } from "../../../config";

const clientId = `${process.env.REACT_APP_PUBLIC_CLIENT_ID}`;
const secretId = `${process.env.REACT_APP_SECRET_CLIETN_ID}`;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateAccessToken: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/oauth/token`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: secretId,
          scope: data.scope,
        }).toString(),
      }),
      transformResponse: (response) => {
        store.dispatch(setToken(response.access_token));
        return response;
      },
    }),
  }),
});

export const { useGenerateAccessTokenMutation } =
  authApiSlice;
