import { AppThunk } from "../store"
import { Auth, AuthAction, RegistarPage } from "../../interfaces";
import { login, logout, setCheckingCredentials } from "./"
import { registerUser, singInWithGoogle } from "../../firebase/providers";


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

export const startRegisterUserWithEmailPassword = (email: string, password: string, displayName: string): AppThunk => {
    return async (dispatch) => {

        dispatch(setCheckingCredentials());

        let registerUserData: RegistarPage = {
            email,
            password,
            displayName
        }

        const result = await registerUser(registerUserData);
    }
}