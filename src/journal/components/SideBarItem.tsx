import { useMemo } from "react"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"

import { Note } from "../../interfaces"
import { useAppDispatch } from "../../store"
import { setActiveNote } from "../../store/journal"

export const SideBarItem = ({ note }: SideBarItemProps) => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch()

    const { title, body, id } = note;

    // The React useMemo Hook returns a memoized value.
    // en la variable newTitle se almace en memoria un valor, este solo va a cambiar, cuando el valor sea diferente,
    const newTitle = useMemo(() => {
        return title.length > 17 // Si el titulo es mayor a 7 caracteres
            ? title.substring(0, 17) + '...' // entonces, solo obtenemos los 17 primeros caracters
            : title
    }, [note.title]);

    const onSetActiveNote = () => {
        dispatch(setActiveNote(note))
    }

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={onSetActiveNote}>
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