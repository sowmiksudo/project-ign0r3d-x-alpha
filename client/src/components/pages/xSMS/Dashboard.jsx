import * as React from "react";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, Avatar, Backdrop, CircularProgress, Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { LoadSmsProfileAction } from "./../../redux/actions/XsmsActions";
import { useDispatch, useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const themeColor = '#42d4f5';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const xsms = useSelector(state => state.xsms);
 
  useEffect(() => {
    dispatch(LoadSmsProfileAction())
  }, [])

  const toggleOpen = () => {
    navigate("/user/profile");
  }

  useEffect(() => {
    if (!xsms.loading) {
      if (xsms.profile_success) {
        let profile = xsms.profile;
        setRows({
          "Total SMS sent alltime": profile.total_sent,
          "Total SMS sent today": profile.sms_sent_today,
          "Free SMS left today":profile.sms_left_today,
          "Daily total free SMS": profile.total_daily_sms
        });
      }
    }
  }, [xsms])


  const handleShare = (e) => {
    navigator.share({
      title:"MR TOOLS",
      url:"https://mojibrsm.com",
      text:"Hi! I'm inviting you to visit this website."
    });
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'space-evenly', }}>
      <Backdrop
        open={xsms.loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!xsms.loading && xsms.profile_success && xsms.profile.profile && <Box>
        <Typography variant="h4" align="center" sx={{ my: 1 }}>MR SMS PROFILE</Typography>
        <Card sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <CardActionArea>
            <CardMedia sx={{ mt: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: themeColor }}>{"M".charAt(0)}</Avatar>
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="div" align="center">
                {xsms.profile.profile.name} {xsms.profile.is_verified && <CheckCircleIcon sx={{ fill: red[800], fontSize: 'medium' }} />}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ fontStyle: 'italic' }}>
                {`${xsms.profile.profile.email} | ${xsms.profile.profile.number}`}
              </Typography>
              {xsms.profile.is_verified && <Box>
                <Divider variant="middle" sx={{ width: '100%' }} />
                <br />
                <Typography variant="body2" align="center">Congratulations! You are a verified user of MR TOOLS. Share with your friends and inspire us to make more cool stuffs.</Typography>
              </Box>}
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button size="small" color="primary" onClick={handleShare} startIcon={<IosShareIcon />}>
              SHARE
            </Button>
            <Divider orientation="vertical" />
            <Button size="small" color="primary" startIcon={<ModeEditIcon />} onClick={toggleOpen}>
              EDIT
            </Button>
          </CardActions>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableBody>
                {Object.keys(rows).map((key) => (
                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{rows[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>}
    </Box>
  )
}

export default Dashboard