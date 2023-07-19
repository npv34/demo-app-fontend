import {createSlice} from "@reduxjs/toolkit";

export const authSlice =createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        userLogin: {}
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = !state.isAuth;
        }
    }
})

export const {setAuth} = authSlice.actions;

export default authSlice.reducer
