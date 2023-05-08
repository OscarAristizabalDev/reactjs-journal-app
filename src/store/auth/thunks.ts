import { AppThunk } from "../store"
import { Auth, AuthAction, LoginPage, RegistarPage } from "../../interfaces";
import { login, logout, setCheckingCredentials } from "./"
import { loginUser, logoutUser, registerUser, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";


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

        const { ok, uid, photoURL, errorMessage } = await registerUser(registerUserData);
        // en caso de haber un error en el registro
        if (!ok) {

            let authAction: AuthAction = {
                auth: null!,
                errorMessage: errorMessage,
                status: 'not-authenticated',
                ok: ok
            }
            return dispatch(logout(authAction));
        }

        let auth: Auth = {
            displayName: displayName!,
            email: email!,
            photoURL: photoURL!,
            uid: uid!
        }
        let authAction: AuthAction = {
            auth: auth,
            errorMessage: '',
            status: 'authenticated',
            ok: ok
        }
        dispatch(login(authAction));
    }
}

export const startLoginWithEmailPassword = (email: string, password: string): AppThunk => {

    return async (dispatch) => {
        dispatch(setCheckingCredentials());

        let userLogin: LoginPage = {
            email,
            password
        }

        const { ok, displayName, errorMessage, photoURL, uid } = await loginUser(userLogin);

        if (!ok) {
            let authAction: AuthAction = {
                auth: null!,
                errorMessage: errorMessage,
                status: 'not-authenticated',
                ok: ok
            }
            return dispatch(logout(authAction));
        }

        let auth: Auth = {
            displayName: displayName!,
            email: email!,
            photoURL: photoURL!,
            uid: uid!
        }
        let authAction: AuthAction = {
            auth: auth,
            errorMessage: '',
            status: 'authenticated',
            ok: ok
        }
        dispatch(login(authAction));
    }

}

export const startLogout = (): AppThunk => {
    return async (dispatch) => {

        const { ok } = await logoutUser();
        
        if (ok) {
            let authAction: AuthAction = {
                auth: null!,
                errorMessage: '',
                status: 'not-authenticated',
                ok: false
            }
            dispatch(clearNotesLogout())
            return dispatch(logout(authAction));
        }

    }
}