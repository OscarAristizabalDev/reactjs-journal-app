import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthAction } from './interfaces';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', //'cheking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action: PayloadAction<AuthAction>) => {

        },
        logout: (state) => {

        },
        setCheckingCredentials: (state) => {
            state.status = 'cheking'
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, setCheckingCredentials } = authSlice.actions;