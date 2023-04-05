import { Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"

export const AppRouter = () => {
    return (
        <Routes>
            {/* Login y registro */}
            {/* Cuando la URL tenga auth */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* Journal App */}
            <Route path="/*" element={<JournalRoutes />}/>

        </Routes>
    )
}
