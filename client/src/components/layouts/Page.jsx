import * as React from 'react';
import { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Backdrop, CircularProgress, Container, CssBaseline } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";
import { LogoutAction } from "../redux/actions/AuthActions";
import { LoadProfileAction } from "../redux/actions/ProfileActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { Navigate } from "react-router"


const themeColor = '#b5e853';

export default function Page({ children }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedOutEventFired, setIsLoggedOutEventFired] = React.useState(false);
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

    const auth = useSelector(state => state.auth)
    const LogOutUser = () => {
        dispatch(LogoutAction())
        setTimeout(() => {
            window.location.reload()
        }, 5000);
    }

    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(LoadProfileAction());
        return () => {
        };
    }, []);

    const list = () => {
        return (
            <Box
                sx={{ width: 250, marginTop: '10%' }}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >
                <Avatar sx={{ bgcolor: themeColor, m: 'auto' }}>X</Avatar>

                <List>
                    {
                        [
                            {
                                name: "Home",
                                icon: <HomeIcon />,
                                path: "/",
                            },
                            ...user.success ? [{
                                name: "Profile",
                                icon: <AccountBoxIcon />,
                                path: '/user',
                            }] : [],
                            ...!user.success ? [{
                                name: "Login",
                                icon: <LoginIcon />,
                                path: "/user/login",
                            }] : []
                        ].map((item) => {
                            return (
                                <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }} key={item.name}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Box sx={{ color: themeColor }}>
                                                {item.icon}
                                            </Box>
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                </Link>
                            )
                        })}
                </List>
            </Box>
        );

    }

    return (
        <div>
            {/* {
                !auth.loading && auth.success && !auth.response.success && <Navigate to="/user/login" />
            } */}
            <Box sx={{ flexGrow: 1 }}>
                <Backdrop
                    open={user.loading}
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <AppBar position="fixed">
                    <Toolbar variant="dense" >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"

                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => { navigate("/") }}>
                            IGN0R3D x ALPHA
                        </Typography>
                        {!user.loading && <div>
                            {user.success ?
                                <Box>
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
                                        <MenuItem onClick={() => { navigate('/user/profile'); setAnchorEl(null) }}>Profile</MenuItem>
                                        <MenuItem onClick={() => { navigate('/user'); setAnchorEl(null) }}>Dashboard</MenuItem>
                                        <MenuItem onClick={() => { LogOutUser(); setAnchorEl(null) }}>Logout</MenuItem>
                                    </Menu>
                                </Box> :
                                <Box>
                                    <Button variant="contained" onClick={() => { navigate("/user/login") }}>LOGIN</Button>
                                </Box>}
                        </div>}
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
            <Container maxWidth="xs" component="main" sx={{ mt: '48px' }}>
                <CssBaseline />
                {children}
            </Container>
        </div>
    );
}

