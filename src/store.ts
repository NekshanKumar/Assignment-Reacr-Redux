import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import usersSlice from "./features/User/userSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice
    },
});


export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>