import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TLoginReq, TLoginRes, TRegisterReq, TRegisterRes } from "../types";

// HTTP methods => GET, POST, PATCH, DELETE

const appApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://user-server-iur7.onrender.com/api",
    }),
    endpoints: (builder) => ({
        register: builder.mutation<TRegisterRes, TRegisterReq>({
            query: ({ name, email, password }) => ({
                url: "/users/register",
                method: "POST",
                body: { name, email, password }
            })
        }),

        login: builder.mutation<TLoginRes, TLoginReq>({
            query: ({ email, password }) => ({
                url: "/users/login",
                method: "POST",
                body: { email, password }
            })
        }),
    })
});

export const { useRegisterMutation, useLoginMutation } = appApi;
export default appApi;