import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"

import { CheckingAuth } from "../ui"
import { useCheckAuth } from "../hooks"


export const AppRouter = () => {

    // useCheckAuth is a custom hook, to check of authenticaction status
    const { status } = useCheckAuth();

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
