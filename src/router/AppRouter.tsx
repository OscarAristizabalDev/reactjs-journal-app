import { Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { useSelector } from "react-redux"
import { CheckingAuth } from "../ui"
import { RootState } from "../store"

export const AppRouter = () => {

    // el hook useSelector de react-redux permite leer datos del store
    const { status } = useSelector((state: RootState) => state.auth);

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {/* Login y registro */}
            {/* Cuando la URL tenga auth */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* Journal App */}
            <Route path="/*" element={<JournalRoutes />} />

        </Routes>
    )
}
