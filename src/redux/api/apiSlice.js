import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseUrl, apibaseUrl } from "../../config";
import { generateAccessToken } from "../../helper/utility";

const baseQuery = fetchBaseQuery({
  baseUrl: apibaseUrl,
  mode: "cors",
  credentials: "same-origin",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const { data, error } = result;

  if(error && error.data.error === "The access token expired"){
    generateAccessToken()
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
