import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { Note } from "../../interfaces"
import { useMemo } from "react"

export const SideBarItem = ({ note }: SideBarItemProps) => {

    const { title, body, id } = note;

    // The React useMemo Hook returns a memoized value.
    // en la variable newTitle se almace en memoria un valor, este solo va a cambiar, cuando el valor sea diferente,
    const newTitle = useMemo(() => {
        return title.length > 17 // Si el titulo es mayor a 7 caracteres
            ? title.substring(0, 17) + '...' // entonces, solo obtenemos los 17 primeros caracters
            : title
    }, [note.title]);

    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

interface SideBarItemProps {
    note: Note
}