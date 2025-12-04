import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../types";
import Cookies from "js-cookie";

type TInitialState = {
    token: string;
    user: TUser | null;
}

const initialState: TInitialState = {
    token: "",
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<{token: string, user: TUser}>) => {
            const { token, user } = action.payload;
            if(token) {
                Cookies.set("token", token)
            }
            state.token = token;
            state.user = user;
        },

        userLoggedOut: (state) => {
            Cookies.remove("token")
            state.token = "";
            state.user = null;
        }
    }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;