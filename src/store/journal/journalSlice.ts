import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JournalAction, Note } from '../../interfaces';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [] as Note[],
        active: {} as Note
    } as JournalAction,
    reducers: {

        savingNewNote: (state, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload
        },
        addNewEmptyNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<Note>) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
        },
        setSaving: (state, action: PayloadAction<boolean>) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            state.isSaving = false;
            // la función devuelve un nuevo array con las modificaciones realizadas
            // map itera el actual listado
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });

            state.messageSaved = `${action.payload.title} actualizada correctamente`;
        },
        deleteNote: (state, action: PayloadAction<JournalAction>) => {

        },
    }
});

// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    deleteNote,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote
} = journalSlice.actions;