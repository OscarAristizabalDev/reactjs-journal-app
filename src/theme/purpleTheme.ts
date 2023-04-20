
import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

// mediante createTheme podemos personalizar los propios temas 
export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    },
    // components: {
    //     MuiFormHelperText: {
    //         styleOverrides: {
    //             root: {
    //                 color: "red"
    //             }
    //         }
    //     }
    // }
})