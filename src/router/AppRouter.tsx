import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"

import { CheckingAuth } from "../ui"
import { RootState, useAppDispatch } from "../store"
import { login, logout } from "../store/auth"
import { Auth, AuthAction } from "../interfaces"


export const AppRouter = () => {

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
        })

    }, [])


    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<JournalRoutes />} /> // Journal App 
                    : <Route path="/auth/*" element={<AuthRoutes />} /> // Login y registro, Cuando la URL tenga auth
            }

            <Route path="/*" element={<Navigate to={'auth/login'} />} />

        </Routes>
    )
}
