import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components'
import { useForm } from '../../hooks';
import { RootState, useAppDispatch } from '../../store';
import { setActiveNote, startSaveNote } from '../../store/journal';

export const NoteView = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch()
    // el hook useSelector de react-redux permite leer datos del store
    // en este caso se necesita obtener la nota activa
    const { active: activeNote } = useSelector((state: RootState) => state.journal);

    // se utiliza el custom Hook useForm para el manejo del formulario
    const { body, title, date, onCambiarInput, formState }: any = useForm(activeNote);

    // Utilizamos el useMemo para retornar una nueva fecha, este hace una conversión cada vez que la fecha sea diferente
    const dateString = useMemo(
        () => {
            const newDate = new Date(date);
            return newDate.toUTCString();
        }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]); // Cada que cambie algo del formulario note view

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={(event) => onCambiarInput(event)}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={(event => onCambiarInput(event))}
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery />

        </Grid>
    )
}