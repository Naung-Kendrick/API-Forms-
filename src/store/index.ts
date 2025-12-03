import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import appApi from "./appApi";

const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer,
        "auth": authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;