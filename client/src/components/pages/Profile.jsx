import React, { useEffect, useState } from 'react';
import { Card, Typography, CardActions, Avatar, IconButton, Button, CircularProgress, Backdrop, Box, Alert } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSelector } from 'react-redux';
import ShareIcon from "@mui/icons-material/Share"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MuiLink from '@mui/material/Link';
import KeyIcon from '@mui/icons-material/Key';
import EditDialog from './EditDialog'
import ChangePassword from './ChangePassword';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'



const themeColor = "#b5e853";


export default function Profile() {
  const navigate = useNavigate();
  const divRef = React.useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPassChangedOpen, setIsPassChangedOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const shareApp = () => {
    navigator.share({
      title:"Project IGN0R3DxALPHA",
      url:"https://alphasowmik.xyz",
      text:"Hi! I'm inviting you to join the hidden universe of Ign0r3dH4x0r! Send free SMS, Do SMS Bombing with own API and many more tools are waiting for you."
    });
  }
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleOpen = () => {
    setIsEditOpen(!isEditOpen);
  }

  const togglePassChanger = () => {
    setIsPassChangedOpen(!isPassChangedOpen);
  }

  const goToLogin = () => {
    navigate("/user/login");
  }

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  const user = useSelector(state => state.user);
  const app = useSelector(state => state.app);
  useEffect(() => {
    if (!user.loading) {
      if (!user.profile.success) {
        goToLogin();
      }
    }
    return () => {
    };
  }, [divRef]);

  useEffect(() => {
    if (!user.loading) {
      if (user.profile.success) {
        setIsVerified(user.profile.data.is_verified === 1);
      }
    }
  }, [user])

  return (
    <Box>
      <Backdrop
        open={user.loading}
        sx={{ color: '#fff', zIndex: 100210201201 }}
      >
        <CircularProgress sx={{ color: themeColor }} />
      </Backdrop>
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {(!user.loading && !app.loading) && user.success &&
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {!isVerified ? <Alert
              sx={{ my: 2 }}
              severity="warning"
              action={
                <Button color="warning" size="small" onClick={toggleDialog}>VERIFY</Button>
              }
            >Account is not verified!</Alert>
              :
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
              />
            }
            {isDialogOpen && <Dialog
              open={isDialogOpen}
              onClose={toggleDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Why you should verify?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Verify your account to increase daily sms sending limits, use private APIs and to get an awesome verified badge.
                  <br /><br />
                  In order to verify your account, click on the button bellow to learn more. Follow the announcement and submit google form accordingly. We'll mark your account as verified within 48 hours.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <MuiLink href={app.app.settings.verify_link}>
                  <Button autoFocus>
                    ANNOUNCEMENT
                  </Button>
                </MuiLink>
              </DialogActions>
            </Dialog>}
            <Card sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 9, minWidth:'90vw' }}>
              <Avatar sx={{ bgcolor: themeColor, mt: 2 }} aria-label="recipe">
                {user.profile.data.name.split("")[0].toUpperCase()}
              </Avatar>
              <Typography variant="h6">{user.profile.data.name} {isVerified && <CheckCircleIcon sx={{ pt:1, color:'cyan' }} /> }</Typography>
              <Typography variant="body">{user.profile.data.email}</Typography>
              <Typography variant="body">{user.profile.data.number}</Typography>
              <Typography variant="body2">{user.profile.data.created_at}</Typography>

              <CardActions disableSpacing sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <IconButton aria-label="Share" onClick={shareApp}>
                  <ShareIcon sx={{ color: themeColor }} />
                </IconButton>
                <IconButton onClick={toggleOpen} aria-label="Edit">
                  <ModeEditIcon sx={{ color: themeColor }} />
                </IconButton>
                <IconButton onClick={togglePassChanger} aria-label="Change Password">
                  <KeyIcon sx={{ color: themeColor }} />
                </IconButton>
              </CardActions>
              {!user.loading && user.success &&
                <Box>
                  <EditDialog open={isEditOpen} toggleOpen={toggleOpen} profile={user.profile.data} />
                  <ChangePassword open={isPassChangedOpen} toggleOpen={togglePassChanger} />
                </Box>
              }
            </Card>
          </div>
        }
      </Box>
    </Box>
  );
}