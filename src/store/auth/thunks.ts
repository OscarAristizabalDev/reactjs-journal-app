import { AppThunk } from "../store"
import { setCheckingCredentials } from "./"


// Los thunks es un listado de funciones asyncronas
export const checkAutentication = (email: string, password: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setCheckingCredentials());
    }
}

export const startGoogleSingIn = (): AppThunk => {
    return async (dispatch) => {
        dispatch(setCheckingCredentials());
    }
}