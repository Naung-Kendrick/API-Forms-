import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TDeleteUserRes,
  TGetUsersRes,
  TLoadUserRes,
  TLoginReq,
  TLoginRes,
  TRegisterReq,
  TRegisterRes,
  TUpdateUserInfoReq,
  TUpdateUserPwdReq,
  TUpdateUserRoleReq,
} from "../types";
import { userLoggedIn } from "./authSlice";
import Cookies from "js-cookie";

// HTTP methods => GET, POST, PATCH, DELETE

const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://user-server-iur7.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<TRegisterRes, TRegisterReq>({
      query: ({ name, email, password }) => ({
        url: "/users/register",
        method: "POST",
        body: { name, email, password },
      }),
    }),

    login: builder.mutation<TLoginRes, TLoginReq>({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log("login error >>>", error);
        }
      },
    }),

    loadUser: builder.query<TLoadUserRes, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: "",
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log("load user error >>>", error);
        }
      },
    }),

    updateUserInfo: builder.mutation<TLoadUserRes, TUpdateUserInfoReq>({
      query: ({ name, email }) => ({
        url: "/users/update-user-info",
        method: "PATCH",
        body: { name, email },
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: "",
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log("update user error >>>", error);
        }
      },
    }),

    updateUserPassword: builder.mutation<TLoadUserRes, TUpdateUserPwdReq>({
      query: ({ oldPassword, newPassword }) => ({
        url: "/users/update-user-password",
        method: "PATCH",
        body: { oldPassword, newPassword },
      }),
    }),

    updateUserRole: builder.mutation<TLoadUserRes, TUpdateUserRoleReq>({
      query: ({ id, role }) => ({
        url: "/users/update-user-role",
        method: "PATCH",
        body: { id, role },
      }),
    }),

    deleteUser: builder.mutation<TDeleteUserRes, string>({
      query: (id) => ({
        url: `/users/delete-one-user/${id}`,
        method: "DELETE",
      }),
    }),

    getAllUsers: builder.query<TGetUsersRes, void>({
      query: () => ({
        url: "/users/get-all-users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoadUserQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} = appApi;
export default appApi;