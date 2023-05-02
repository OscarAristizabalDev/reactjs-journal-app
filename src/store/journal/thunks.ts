import { collection, doc, setDoc } from 'firebase/firestore/lite';

import { Note } from "../../interfaces";
import { AppThunk } from "../store";
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './';
import { loadNotes } from '../../journal/helpers';

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
        // Permite registrar información dentro de un documento
        await setDoc(newDoc, note);

        note.id = newDoc.id;
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