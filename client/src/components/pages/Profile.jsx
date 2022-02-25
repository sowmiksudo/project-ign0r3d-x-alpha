import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardActionArea, CardActions, CardMedia, Avatar, Divider, Typography, Container, CssBaseline, Collapse, IconButton, CircularProgress, Backdrop, Box, bottomNavigationClasses } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadProfileAction } from '../redux/actions/ProfileActions';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useSnackbar } from "notistack"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, Link } from "react-router-dom";
import "./../../styles/App.css";
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
  const [expanded, setExpanded] = React.useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToLogin = () => {
    navigate("/user/login");
  }

  const dispatch = useDispatch();
  const profileResponse = useSelector(state => state.userDetails.userProfile);
  useEffect(() => {
    if(profileResponse !== 'loading'){
      if(!profileResponse.success){
        goToLogin();
      }
    }
    dispatch(LoadProfileAction());
    setAnchorEl(divRef.current)
    return () => {
    };
  }, [divRef]);

  return (
    <Container maxWidth="xs" component="main" sx={{ height: '100%' }}>
      <CssBaseline />
      <Backdrop
        open={profileResponse === 'loading'}
        sx={{ color: '#fff', zIndex: 100210201201 }}
      >
        <CircularProgress sx={{ color: themeColor }} />
      </Backdrop>
      <Box sx={{ height: '100%', display: 'flex', justifyContents: 'center', alignItems: 'center' }}>
        {profileResponse.success &&
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: themeColor }} aria-label="recipe">
                  {profileResponse.data.name.split("")[0].toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon sx={{ color: themeColor }} />
                </IconButton>
              }
              title={profileResponse.data.name}
              subheader={profileResponse.data.email}
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
                <Typography variant="h6">You are not verified! <SentimentVeryDissatisfiedIcon /></Typography>
                <Typography paragraph>Verified accounts never get blocked. You will be totally anonymouse. Verified profiles also get <i>LIMITLESS</i> messaging!</Typography>
                <Typography variant="h6">How to verify your account?</Typography>
                <Typography paragraph>Follow <Link to="https://t.me/TeamX1337Official">THIS</Link> telegram post to know the procedure.</Typography>
              </CardContent>
            </Collapse>
          </Card>          
        }
      </Box>
    </Container>
  );
}