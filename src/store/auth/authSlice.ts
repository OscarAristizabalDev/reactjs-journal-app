import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthAction } from '../../interfaces';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //'cheking', 'not-authenticated', 'authenticated'
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        errorMessage: ''
    },
    reducers: {
        login: (state, action: PayloadAction<AuthAction>) => {
            let { uid, displayName, email, photoURL } = action.payload.auth;
            let { status } = action.payload;

            state.status = status;
            state.uid = uid;
            state.email = email;
            state.displayName = displayName;
            state.photoURL = photoURL;
            state.errorMessage = ''
        },
        logout: (state, action: PayloadAction<AuthAction>) => {

            let { errorMessage, status } = action.payload;

            state.status = status;
            state.uid = '';
            state.email = '';
            state.displayName = '';
            state.photoURL = '';
            state.errorMessage = errorMessage
        },
        setCheckingCredentials: (state) => {
            state.status = 'cheking';

        },
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, setCheckingCredentials } = authSlice.actions;