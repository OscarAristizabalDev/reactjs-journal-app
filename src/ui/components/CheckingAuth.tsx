import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuth = () => {
    return (
        // Grid container se puede ver como un div
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            // sx permite personalizar estilos adicionales y acceder a los estilos del tema que tengan definido, ejemplo purpleTheme
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid container
                direction='row'
                justifyContent='center'
            >
                <CircularProgress color="warning" />
            </Grid>
        </Grid>
    )
}
