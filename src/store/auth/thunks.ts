import { singInWithGoogle } from "../../firebase/providers";
import { Auth, AuthAction } from "../../interfaces";
import { AppThunk } from "../store"
import { login, logout, setCheckingCredentials } from "./"


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

        if (!result.ok) {
            let authAction: AuthAction = {
                auth: null!,
                errorMessage: result.errorMessage,
                status: 'not-authenticated',
                ok: result.ok
            }
            return dispatch(logout(authAction));
        }


        let auth: Auth = {
            displayName: result.displayName!,
            email: result.email!,
            photoURL: result.photoURL!,
            uid: result.uid!
        }
        let authAction: AuthAction = {
            auth: auth,
            errorMessage: '',
            status: 'authenticated',
            ok: result.ok
        }
        dispatch(login(authAction));

    }
}