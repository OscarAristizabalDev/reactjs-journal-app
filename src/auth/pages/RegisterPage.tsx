import { FormEvent, useMemo, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { RegistarPage } from "../../interfaces"
import { RootState, useAppDispatch } from "../../store"
import { startRegisterUserWithEmailPassword } from "../../store/auth"
import { useSelector } from "react-redux"

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value: string) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value: string) => value.length >= 6, 'El password debe tener más de 6 letras'],
    displayName: [(value: string) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    // el hook useSelector de react-redux permite leer datos del store
    const { status, errorMessage } = useSelector((state: RootState) => state.auth);

    // useMemo es un hook que permite memorizar valores, 
    // En este caso vamos a memorizar el resultado del status, si el status cambia se va a obtener un nuevo valor
    // En este ejemplo se devuelve un boolean, si es cheking true, de lo contrario false
    const isChekingAuthentication = useMemo(() => status === 'checking', [status])

    const {
        formState, displayName, email, password, onCambiarInput,
        isFormValid, displayNameValid, emailValid, passwordValid
    }: any = useForm(formData, formValidations);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previe el recarge de la pantalla
        setFormSubmitted(true);

        if (!isFormValid) return;
        dispatch(startRegisterUserWithEmailPassword(email, password, displayName));
    }

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    {/* xs indica el tamano a tomar en relación con el div o grid */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Nombre Completo"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={(event) => onCambiarInput(event)}
                            error={!!displayNameValid && formSubmitted} // el doble !! lo convierte en valor boolean
                            helperText={displayNameValid}
                        />
                    </Grid>

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
                            error={!!emailValid && formSubmitted} // el doble !! lo convierte en valor boolean
                            helperText={emailValid}
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
                            error={!!passwordValid && formSubmitted} // el doble !! lo convierte en valor boolean
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'} // el doble !! convierte en boolean, si hay errorMessage se muestra el alert
                        >
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isChekingAuthentication}
                            >
                                Crear cuenta
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography mr={1}>Ya tienes cuenta ?</Typography>
                        {/* El primer Link es el material ui, el cual permite trabajar con estilos y demás */}
                        {/* El RouterLink es un alias de Link de react-router-dom el cual si permite redireccionar a otras páginas */}
                        <Link component={RouterLink} color="inherit" to="/auth/login">
                            ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}