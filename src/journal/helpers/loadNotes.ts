import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { Note } from "../../interfaces";

export const loadNotes = async (uid: string = '') => {

    // Permite traer la referencia de una collecion según la ruta, es decir, notes es una colección
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    // Permite traer los documentos que tiene la colección
    const docs = await getDocs(collectionRef);

    const notes: Note[] = [];
    docs.forEach(doc => {
        console.log(doc)
        // se obtiene cada uno de los valores que tiene cada documento
        const { title, body, date, imageUrls } = doc.data();
        const note: Note = {
            id: doc.id,
            title,
            body,
            date,
            imageUrls
        }
        notes.push(note)
    });

    return notes;
}