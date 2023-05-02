import { useEffect } from "react";
import { useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

import { RootState, useAppDispatch } from "../store";
import { login, logout } from "../store/auth";
import { Auth, AuthAction } from "../interfaces";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {

    // el hook useSelector de react-redux permite leer datos del store
    const { status } = useSelector((state: RootState) => state.auth);

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();

    // cada que vez que se recarge la aplicación
    useEffect(() => {
        // Adds an observer for changes to the user's sign-in state.
        // Obtiene el usuario actual
        onAuthStateChanged(FirebaseAuth, async (user) => {

            console.log(user)
            if (!user) {
                let authAction: AuthAction = {
                    auth: null!,
                    errorMessage: '',
                    status: 'not-authenticated',
                    ok: false
                }
                return dispatch(logout(authAction));
            }

            const { displayName, email, photoURL, uid } = user;
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
                ok: true
            }
            dispatch(login(authAction));
            dispatch(startLoadingNotes());
        })

    }, [])

    return {
        status
    }
}
