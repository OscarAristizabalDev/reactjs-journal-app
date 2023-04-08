import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const JournalApp = () => {
    return (
        // mediante el AppTheme se proveen los temas a los componentes que se llaman dentro del AppRouter
        <AppTheme>
            <AppRouter />
        </AppTheme>
    )
}
