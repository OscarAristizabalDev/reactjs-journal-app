import { singInWithGoogle } from "../../firebase/providers";
import { AppThunk } from "../store"
import { setCheckingCredentials, setauthenticatedCredentials } from "./"


// Los thunks es un listado de funciones asyncronas
export const checkAutentication = (email: string, password: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setCheckingCredentials());
    }
}

export const startGoogleSingIn = (): AppThunk => {
    return async (dispatch) => {
        dispatch(setCheckingCredentials());
        const result = await singInWithGoogle();
        if (result.ok) dispatch(setauthenticatedCredentials());
    }
}