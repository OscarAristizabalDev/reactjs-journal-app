import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthAction } from './interfaces';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'cheking', // 'not-authenticated', 'authenticated'
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
        checkCredentials: (state) => {

        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkCredentials } = authSlice.actions;