import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../types";

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
            state.token = token;
            state.user = user;
        },

        userLoggedOut: (state) => {
            state.token = "";
            state.user = null;
        }
    }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;