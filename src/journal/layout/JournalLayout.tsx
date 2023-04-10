import { Box } from "@mui/material"

interface JournalLayoutProps {
    // Los componentes hijos son de tipo JSX.Element
    children: JSX.Element | JSX.Element[]
}

const drawerWidth = 240;

export const JournalLayout = ({ children }: JournalLayoutProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Navbar drawerWidth */}
            {/* Sidebar drawerWidth */}

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }} // Permite adicionar estilos
            >
                {/* Toolbar */}
                {children}
            </Box>
        </Box>
    )
}
