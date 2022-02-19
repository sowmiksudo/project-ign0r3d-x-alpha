import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";
import { LogoutAction } from "../redux/actions/AuthActions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


const themeColor = '#b5e853';

export default function Page({ children }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = true;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(!drawerOpen);
    };

    const logOut = () => {
        console.log("Logged out!");
    }

    const list = () => {
        return (
            <Box
                sx={{ width: 250, marginTop: '10%' }}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >

                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <Avatar sx={{ bgcolor: themeColor, m: 'auto' }}>X</Avatar>

                <List>
                    {
                        [
                            {
                                name: "Home",
                                icon: <HomeIcon />,
                                path: "/"
                            },
                            {
                                name: "Profile",
                                icon: <AccountBoxIcon />,
                                path: '/profile'
                            }
                        ].map((item) => (
                            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button key={item.name}>
                                    <ListItemIcon>
                                        <Box sx={{ color: themeColor }}>
                                            {item.icon}
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            </Link>
                        ))}
                </List>
            </Box>
        );

    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar variant="dense" >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>{navigate("/")}}>
                            IGN0R3D x ALPHA
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={()=>{navigate('/user')}}>Profile</MenuItem>
                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    anchor='left'
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}
                >
                    {list()}
                </SwipeableDrawer>
            </Box>
            {children}
        </div>
    );
}

