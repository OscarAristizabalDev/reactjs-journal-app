import { Grid, Typography } from "@mui/material"

interface AuthLayoutProps {
    // Los componentes hijos son de tipo JSX.Element
    children: JSX.Element | JSX.Element[],
    title: string
}

// El AuthLayout va a tener componentes hijos y el titulo
export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        // Grid container se puede ver como un div
        <Grid 
            className="animate__animated animate__fadeIn animate__faster"
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            // sx permite personalizar estilos adicionales y acceder a los estilos del tema que tengan definido, ejemplo purpleTheme
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid item
                className="box-shadow"
                xs={3}
                sx={{
                    width: { sm: 450 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
                {children}
            </Grid>
        </Grid>
    )
}
