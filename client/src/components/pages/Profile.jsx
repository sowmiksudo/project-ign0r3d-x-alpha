import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, CardMedia, Avatar, Divider, Typography, Collapse, IconButton, Button, CircularProgress, Backdrop, Box, bottomNavigationClasses, Alert } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import ShareIcon from "@mui/icons-material/Share"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useSnackbar } from "notistack"
import MuiLink from '@mui/material/Link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, Link } from "react-router-dom";
import styled from '@emotion/styled';


const themeColor = "#b5e853";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const divRef = React.useRef(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToLogin = () => {
    navigate("/user/login");
  }

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  const user = useSelector(state => state.user);
  const app = useSelector(state => state.app);
  const profile = !user.loading ? user.profile.data : null
  useEffect(() => {
    if (!user.loading) {
      if (!user.profile.success) {
        goToLogin();
      }
    }
    return () => {
    };
  }, [divRef]);

  useEffect(()=>{
      if(!user.loading){
        if(user.profile.success){
          setIsVerified(user.profile.data.is_verified ===1);
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
        {(!user.loading && !app.loading) &&
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {!isVerified && <Alert
              sx={{ my: 2 }}
              severity="warning"
              action={
                <Button color="warning" size="small" onClick={toggleDialog}>VERIFY</Button>
              }
            >Account is not verified!</Alert>}
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
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: themeColor }} aria-label="recipe">
                    {profile.name.split("")[0].toUpperCase()}
                  </Avatar>
                }
                title={profile.name}
                subheader={profile.email}
              />
              <CardContent>
                <Typography paragraph>
                  This website is still under regular development we're pushing new patch everyday. Give us suggestion about what can be added to make this website better.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions disableSpacing>
                <IconButton aria-label="Share">
                  <ShareIcon sx={{ color: themeColor }} />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <CheckCircleOutlineIcon sx={{ color: themeColor }} />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit key="hi">
                <CardContent>
                  {/* <Typography variant="h6">You are not verified! <SentimentVeryDissatisfiedIcon /></Typography>
                  <Typography paragraph>Verified accounts never get blocked. You will be totally anonymouse. Verified profiles also get <i>LIMITLESS</i> messaging!</Typography>
                  <Typography variant="h6">How to verify your account?</Typography>
                  <Typography paragraph>Follow <Link to="https://t.me/TeamX1337Official">THIS</Link> telegram post to know the procedure.</Typography> */}
                </CardContent>
              </Collapse>
            </Card>
          </div>
        }
      </Box>
    </Box>
  );
}