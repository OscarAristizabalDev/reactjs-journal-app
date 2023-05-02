import { useSelector } from 'react-redux';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { RootState } from '../../store';
import { SideBarItem } from './';


interface SideBarProps {
    drawerWidth: number
}

export const SideBar = ({ drawerWidth = 240 }: SideBarProps) => {

    // el hook useSelector de react-redux permite leer datos del store
    const { displayName, uid } = useSelector((state: RootState) => state.auth);
    const { notes } = useSelector((state: RootState) => state.journal);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SideBarItem key={note.id} note={note} />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
