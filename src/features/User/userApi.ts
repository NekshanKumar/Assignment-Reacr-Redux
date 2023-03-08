import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import { IUser } from "../../models/user";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    try {
        const config = {
            headers:{
                'Authorization':'PMAT-01GJHM4C73YVP47S18YA6SG275',
                'X-Amz-Date':'20230308T082758Z',        
           'Accept':'*/*',
        }
        };
        console.log('request')
        const response = await API.get("users",config)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const addUsers = createAsyncThunk("user/addUser", async (user: IUser) => {
    try {
        const response = await API.post("/user/create", user)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateUsers = createAsyncThunk("user/updateUsers",
    async (user: IUser) => {
        try {
            const response = await API.put(`/user/${user.id}`, user);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteUsers = createAsyncThunk("user/deleteUsers", async (userId: string) => {
    try {
        const response = await API.delete(`users/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})