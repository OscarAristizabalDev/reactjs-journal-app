import { FormEvent, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components'
import { useForm } from '../../hooks';
import { RootState, useAppDispatch } from '../../store';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch()
    // el hook useSelector de react-redux permite leer datos del store
    // en este caso se necesita obtener la nota activa
    const { active: activeNote, messageSaved, isSaving } = useSelector((state: RootState) => state.journal);

    // se utiliza el custom Hook useForm para el manejo del formulario
    const { body, title, date, onCambiarInput, formState }: any = useForm(activeNote);

    // Utilizamos el useMemo para retornar una nueva fecha, este hace una conversión cada vez que la fecha sea diferente
    const dateString = useMemo(
        () => {
            const newDate = new Date(date);
            return newDate.toUTCString();
        }, [date]);

    // el hook useRef permite hacer referencia a un elemento html
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]); // Cada que cambie algo del formulario note view

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = (event: FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (Number(target.files) === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type='file'
                    multiple
                    ref={fileInputRef}
                    onChange={(event) => onFileInputChange(event)}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
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

            <Grid container justifyContent='end' sx={{ mt: 2 }}>
                <button
                    onClick={onDeleteNote}
                    color="error"
                >
                    <DeleteOutline />
                </button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={activeNote.imageUrls} />

        </Grid>
    )
}