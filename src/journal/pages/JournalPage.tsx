import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useAppDispatch } from '../../store';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch()

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <JournalLayout>

            {/* NothingSelected */}
            <NothingSelectedView />

            {/* NoteView */}
            {/* s<NoteView /> */}

            <IconButton
                onClick={onClickNewNote}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>

        </JournalLayout>
    )
}
