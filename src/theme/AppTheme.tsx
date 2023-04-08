import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material";

import { purpleTheme } from "./";

interface AppThemeProps {
    // Los componentes hijos son de tipo JSX.Element
    children: JSX.Element | JSX.Element[];
}

// Permite crear un proveeder del tema para la aplicación a los componentes hijos
export const AppTheme = ({ children }: AppThemeProps) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
