import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JournalAction, Note } from '../../interfaces';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
        messageSaved: '',
        notes: [] as Note[],
        active: {} as Note
    } as JournalAction,
    reducers: {
        addNewEmptyState: (state, action: PayloadAction<JournalAction>) => {

        },
        setActiveNote: (state, action: PayloadAction<JournalAction>) => {

        },
        setNotes: (state, action: PayloadAction<JournalAction>) => {

        },
        setSaving: (state) => {

        },
        updateNote: (state, action: PayloadAction<JournalAction>) => {

        },
        deleteNote: (state, action: PayloadAction<JournalAction>) => {

        },
    }
});

// Action creators are generated for each case reducer function
export const { addNewEmptyState, setActiveNote, setNotes, setSaving, updateNote, deleteNote } = journalSlice.actions;