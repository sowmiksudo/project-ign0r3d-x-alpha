import * as React from 'react';
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import MuiLink from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Badge, Button, ButtonGroup, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Backdrop, CircularProgress, Container, CssBaseline, Card, CardContent, CardActions, CardActionArea } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { LogoutAction } from "../redux/actions/AuthActions";
import { LoadProfileAction } from "../redux/actions/ProfileActions"
import { LoadAppAction } from "../redux/actions/AppActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SmsIcon from "@mui/icons-material/Sms"


const themeColor = '#b5e853';


function BottomNav() {
    const location = useLocation();
    const page = location.pathname;
    const [value, setValue] = React.useState(page);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box>
                <BottomNavigation
                    sx={{
                        width: '100%',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                    value={page}
                    onChange={handleChange}
                >
                    <BottomNavigationAction
                        component={Link}
                        to="/user"
                        label="HOME"
                        value="/user"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/x-sms"
                        label="XSMS"
                        value="/x-sms"
                        icon={<SmsIcon />}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/bomber"
                        label="FIERY"
                        value="/bomber"
                        icon={<LocalFireDepartmentIcon />}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/user/profile"
                        label="PROFILE"
                        value="/user/profile"
                        icon={<AccountCircleIcon />}
                    />
                </BottomNavigation>
            </Box>
        </Box>
    );
}


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NotificationDialog = ({ open, setOpen, notifications }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Announcements
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display:'flex', justifyContent:'center', flexDirection:'column' }}>
                    {notifications.map(notification => {
                        return <Card key={notification.id} sx={{ border: `1px solid ${themeColor}`, borderRadius: '10px', m:1 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="body" component="p" align="center">
                                        ID. {notification.id}
                                        <br />
                                        {notification.created_at}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt:2 }}>
                                        {notification.message}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ display:'flex', justifyContent:'center' }}>
                                {(notification.has_action_link === 1) && 
                                <MuiLink href={notification.action_link} target="_blank">
                                    <Button size="small" color="primary" variant="contained">
                                        GO
                                    </Button>
                                </MuiLink>
                                }
                            </CardActions>
                        </Card>
                    })}
                </Box>
                {/* <CardActions >
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </Dialog>
        </div>
    );
}



export default function Page({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedOutEventFired, setIsLoggedOutEventFired] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

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
    const app = useSelector(state => state.app);
    const LogOutUser = () => {
        dispatch(LogoutAction())
        setIsLoggedOutEventFired(true)
    }

    useEffect(() => {
        if (!isLoggedOutEventFired) return;
        if (!auth.loading) {
            if (auth.success) {
                window.location.reload()
            }
        }
    }, [auth])

    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(LoadProfileAction());
        dispatch(LoadAppAction());
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
                                path: '/user/profile',
                            },
                            {
                                name: "Xsms",
                                icon: <MessageIcon />,
                                path: "/x-sms"
                            },
                            {
                                name: "Fiery Bomber",
                                icon: <LocalFireDepartmentIcon />,
                                path: "/bomber"
                            }
                            ] : [],
                            ...!user.success ? [{
                                name: "Login",
                                icon: <LoginIcon />,
                                path: "/user/login",
                            },
                            {
                                name: "Register",
                                icon: <HowToRegIcon />,
                                path: "/user/register",
                            }
                            ] : []
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
            <Box sx={{ flexGrow: 1 }}>
                <Backdrop
                    open={user.loading || app.loading}
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
                        {(!user.loading && !app.loading) && <div>
                            {(user.success && app.success) ?
                                <Box>
                                    <NotificationDialog open={notificationsOpen} setOpen={setNotificationsOpen} notifications={app.app.notifications} />
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    >
                                        <Badge badgeContent={app.app.notifications.length} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
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
                                        <MenuItem onClick={() => { navigate("/feedback"); setAnchorEl(null) }}>Feedback</MenuItem>
                                        <MenuItem onClick={() => { LogOutUser(); setAnchorEl(null) }}>Logout</MenuItem>
                                    </Menu>
                                </Box> :
                                <Box>

                                    <ButtonGroup variant="outlined" size="small">
                                        <Button variant="contained" onClick={() => { navigate("/user/login") }} startIcon={<LoginIcon />}>
                                        </Button>
                                        <Button variant="contained" onClick={() => { navigate("/user/register") }} startIcon={<HowToRegIcon />}>
                                        </Button>
                                    </ButtonGroup>
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
            {(!user.loading && !app.loading) && (user.success && app.success) && <BottomNav />}
            <Container maxWidth="xs" component="main" sx={{ mt: '48px' }}>
                <CssBaseline />
                {children}
            </Container>
        </div>
    );
}

