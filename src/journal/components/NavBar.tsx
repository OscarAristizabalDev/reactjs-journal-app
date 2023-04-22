import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { useAppDispatch } from "../../store"
import { startLogout } from "../../store/auth"

interface NavBarProps {
    drawerWidth: number
}

export const NavBar = ({ drawerWidth }: NavBarProps) => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` }, // sm significa tamanio de las pantallas, sm pantallas medianas
                ml: { sm: `${drawerWidth}px` }
            }} // sx permite la personalización de estilos
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container
                    direction='row'
                    justifyContent='space-between'
                >
                    <Typography variant="h6" noWrap component='div'>Journal App</Typography>
                    <IconButton
                        color="error"
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
