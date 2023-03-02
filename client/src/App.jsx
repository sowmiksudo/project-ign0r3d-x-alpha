import "./styles/App.css";
import { useEffect, useState } from 'react';
import { HashRouter } from "react-router-dom";
import Routes from "./Routes";
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Grow, Box } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux';
import { LoadAppAction } from './components/redux/actions/AppActions';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

function App() {
  const dispatch = useDispatch()
  const app = useSelector(state => state.app)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(LoadAppAction());
  }, [])

  useEffect(() => {
    if (!app.loading) {
      if (app.success) {
        if (app.app.settings.is_under_maintanance === 1) {
          console.log('maintanance');
          setOpen(true)
        }
      }
    }
  }, [app])

  return (
    <div className="overlay">
      <FullScreenDialog open={open} />
      <SnackbarProvider maxSnack={3} TransitionComponent={Grow} autoHideDuration={3000} >
        <HashRouter>
          <Routes />
        </HashRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({ open }) {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography align="center" variant="h6">MR TOOLS</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: "center",
          alignItems:'center',
          flexDirection:'column'
        }}>
          <Typography variant="h4">We will be back soon..</Typography>
          <Typography variant="body" align="center">We are working on adding something new. Please stay tuned in our social media accounts to get latest updates.</Typography>
          <Box sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: "center"
          }}>
            <a href="https://github.com/mojibrsm">
              <IconButton sx={{
                color: '#42d4f5'
              }} aria-label="">
                <GitHubIcon />
              </IconButton>
            </a>
            <a href="https://web.facebook.com/groups/team.x.official.community">
              <IconButton sx={{
                color: '#42d4f5'
              }} aria-label="">
                <FacebookIcon />
              </IconButton>
            </a>
            <a href="https://t.me/teamx1337official">
              <IconButton sx={{
                color: '#42d4f5'
              }} aria-label="">
                <TelegramIcon />
              </IconButton>
            </a>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}