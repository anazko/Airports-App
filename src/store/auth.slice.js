import { createSlice } from "@reduxjs/toolkit";
import { ax } from "../axios/axios";

const initialState = {
    isAuth: Boolean(localStorage.getItem('access') || false),
    username:localStorage.getItem('username'),
    access: localStorage.getItem('access')
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSucess: (state, action) => {
            console.log(action.payload)
            state.isAuth = true
            state.username = action.payload.username
            state.access = action.payload.access
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('access', action.payload.access)
        },
        logout: (state) => {
            state.isAuth = false
            localStorage.removeItem('userName')
            localStorage.removeItem('access')
        }
    }
})

export const register = (user) => {
    return async function (dispatch) {
        try {
            const response = await ax.post('auth/register', user)
            dispatch(loginSucess({
                username: user.username,
                access: response.data.access
            }))
        } 
        catch(e) {
            console.log("Register failed. ERROR: ", e.message)
        }
    }
}

export const login = (user) => {
    return async function (dispatch) {
        try {
            const response = await ax.post('auth/login', user)
            dispatch(loginSucess({
                username: user.username,
                access: response.data.access
            }))
        } 
        catch(e) {
            console.log("Login failed. ERROR: ", e.message)
        }
    }
}

export const { loginSucess, logout } = auth.actions
export default auth.reducer
