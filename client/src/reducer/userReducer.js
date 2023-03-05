import { createReducer } from "@reduxjs/toolkit";
const initialState = {}
export const userReducer = createReducer(initialState,{
    registerUserRequest:(state)=>{
        state.loading = true
        
    },
    registerUserSuccess:(state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    },
    registerUserFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    loginUserRequest:(state)=>{
        state.loading = true
    },
    loginUserSuccess:(state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    },
    loginUserFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    logoutUserSuccess:(state)=>{
        state.loading = false
        state.user = null
        state.isAuthenticated = false
    },
    logoutUserFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    loadUserRequest:(state)=>{
        state.loading = true
    },
    loadUserSuccess:(state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    },
    loadUserFailure:(state,action)=>{
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
    },
    clearErrors:(state)=>{
        state.error = null
    }
})