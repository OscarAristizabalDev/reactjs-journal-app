import { collection, doc, setDoc } from 'firebase/firestore/lite';

import { Note } from "../../interfaces";
import { AppThunk } from "../store";
import { FirebaseDB } from '../../firebase/config';

export const startNewNote = (): AppThunk => {
    // getState permite obtener la información respectiva del store
    return async (dispatch, getState) => {

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


    }
}
