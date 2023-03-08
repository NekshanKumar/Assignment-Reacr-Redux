import { createSlice } from "@reduxjs/toolkit";
import { addUsers, deleteUsers, getUsers, updateUsers } from "./userApi";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        list: {
            isLoading: false,
            status: "",
            values: []
        },
        save: {
            isSaving: false,
            isDeleting: false
        }
    },
    reducers: {
        clearSuccessMessage: (state, payload) => {
        
        }
    },
    extraReducers: {
        [getUsers.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getUsers.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getUsers.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [addUsers.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [addUsers.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [addUsers.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateUsers.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [updateUsers.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateUsers.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [deleteUsers.pending.type]: (state, action) => {
            state.save.isDeleting = true
        },
        [deleteUsers.fulfilled.type]: (state, action) => {
            state.save.isDeleting = false
        },
        [deleteUsers.rejected.type]: (state, action) => {
            state.save.isDeleting = false
        }
    }
})

export default usersSlice.reducer
