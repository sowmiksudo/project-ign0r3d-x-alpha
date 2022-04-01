import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography, Box, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function EditDialog({ open, toggleOpen }) {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    return (
        <div>
            <Dialog open={open} onClose={toggleOpen}>
                <DialogTitle sx={{ textAlign: 'center' }}>Team X 1337</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="center">
                        <img src="/icons/teamx.png" width="150px" />
                    </Box>
                    <Divider />
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="h6">TEAM MEMBERS</Typography>
                        <Divider />
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List component="nav" aria-label="secondary mailbox folder">
                                <MuiLink href="https://github.com/ign0r3dh4x0r" target="_blank">
                                    <ListItemButton
                                        selected={selectedIndex === 2}
                                        onClick={(event) => handleListItemClick(event, 2)}
                                    >
                                        <ListItemText primary="IGN0R3DH4X0R" secondary="Fullstack Web | CLI | InfoSec" />
                                    </ListItemButton>
                                </MuiLink>
                                <MuiLink href="https://web.facebook.com/shofikul21" target="_blank">
                                    <ListItemButton
                                        selected={selectedIndex === 3}
                                        onClick={(event) => handleListItemClick(event, 3)}
                                    >
                                        <ListItemText primary="Shofikul Islam" secondary="Android Developer &  Designer" />
                                    </ListItemButton>
                                </MuiLink>
                                <MuiLink href="https://github.com/mao2116" target="_blank">
                                    <ListItemButton
                                        selected={selectedIndex === 4}
                                        onClick={(event) => handleListItemClick(event, 4)}
                                    >
                                        <ListItemText primary="Mao2116" secondary="Python CLI | Fullstack Web" />
                                    </ListItemButton>
                                </MuiLink>
                                <MuiLink href="https://github.com/CyberHanterBangladesh" target="_blank">
                                    <ListItemButton
                                        selected={selectedIndex === 5}
                                        onClick={(event) => handleListItemClick(event, 5)}
                                    >
                                        <ListItemText primary="MD414M1N" secondary="Python CLI | Android Dev" />
                                    </ListItemButton>
                                </MuiLink>
                                <MuiLink href="https://web.facebook.com/Juyeljas" target="_blank">
                                    <ListItemButton
                                        selected={selectedIndex === 6}
                                        onClick={(event) => handleListItemClick(event, 6)}
                                    >
                                        <ListItemText primary="Sheikh Juyel" secondary="Logo & Graphics Designer" />
                                    </ListItemButton>
                                </MuiLink>
                            </List>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpen}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
