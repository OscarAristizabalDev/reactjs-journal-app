import { collection, doc, setDoc } from 'firebase/firestore/lite';

import { Note } from "../../interfaces";
import { AppThunk } from "../store";
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './';
import { fileUpload, loadNotes } from '../../journal/helpers';

export const startNewNote = (): AppThunk => {
    // getState permite obtener la información respectiva del store
    return async (dispatch, getState) => {

        dispatch(savingNewNote(true));

        const { uid } = getState().auth;

        const note: Note = {
            id: "",
            title: "",
            body: "",
            date: new Date().getTime(),
            imageUrls: []
        }

        // permite definir la estructura de un nuevo documento, dentro de la colección de datos en FirebaseDB
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        note.id = newDoc.id;
        // Permite registrar información dentro de un documento
        await setDoc(newDoc, note);
        dispatch(addNewEmptyNote(note));
        dispatch(setActiveNote(note));
    }
}


export const startLoadingNotes = (): AppThunk => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = (): AppThunk => {
    return async (dispatch, getState) => {

        dispatch(setSaving(true));

        const { uid } = getState().auth;
        const { active: activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote } // se asignan todos los atributos, ...activeNote permite acceder a cada uno de los atributos
        delete noteToFireStore.id;  // Forma de eleminar un valor de un atributo de un objeto

        // Se obtiene la referencia del documento mediante la base de datos y la ruta.
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        // setDoc permite actualizar el documento
        // { merge: true } indica que si alg
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(activeNote));

    }
}

export const startUploadingFiles = (files: FileList | null): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(setSaving(true));
        await fileUpload(files![0]);
    }
}