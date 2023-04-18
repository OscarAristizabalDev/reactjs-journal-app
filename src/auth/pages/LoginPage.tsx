import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { FormEvent } from "react"
import { Google } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useAppDispatch } from "../../store"
import { checkAutentication, startGoogleSingIn } from "../../store/auth"

export const LoginPage = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch()

    const { email, password, onCambiarInput }: any = useForm({
        email: 'oscar@gmail.com',
        password: '123445'
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previe el recarge de la pantalla
        dispatch(checkAutentication(email, password));
    }

    const onGoogleSingIn = () => {
        dispatch(startGoogleSingIn());
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={onSubmit}>
                <Grid container>
                    {/* xs indica el tamano a tomar en relación con el div o grid */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={(event) => onCambiarInput(event)}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contrasena"
                            type="password"
                            placeholder="contrasena"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={(event) => onCambiarInput(event)}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSingIn}>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        {/* El primer Link es el material ui, el cual permite trabajar con estilos y demás */}
                        {/* El RouterLink es un alias de Link de react-router-dom el cual si permite redireccionar a otras páginas */}
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}
