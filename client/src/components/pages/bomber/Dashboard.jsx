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

import { LoadBomberProfileAction, LoadApiAction } from "../../redux/actions/BomberActions";
import { useDispatch, useSelector } from "react-redux";
import { red } from "@mui/material/colors";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditDialog from "./../xSMS/EditDialog";

const themeColor = '#b5e853';

function Dashboard() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const bomber = useSelector(state => state.bomber);
  useEffect(() => {
    dispatch(LoadBomberProfileAction());
  }, [])

  const toggleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    if (!bomber.loading) {
      if (bomber.profile_success) {
        let profile = bomber.profile;
        setRows({
          "TOTAL BOMBING": profile.total_bombing_sessions,
        });
      }
    }
  }, [bomber]);


  const handleShare = (e) => {
    navigator.share({
      url: "https://alphasowmik.xyz",
      title: "Test title",
      text: "Test Text"
    });
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'space-evenly', }}>
      <Backdrop
        open={bomber.loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!bomber.loading && bomber.profile_success && bomber.profile.profile && <Box>
        <Typography variant="h4" align="center" sx={{ my: 1 }}>BOMBER PROFILE</Typography>
        <Card sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <CardActionArea>
            <CardMedia sx={{ mt: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: themeColor }}>{"Xowmik".charAt(0)}</Avatar>
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="div" align="center">
                {bomber.profile.profile.name} {bomber.profile.profile.is_verified && <CheckCircleIcon sx={{ fill: red[800], fontSize: 'medium' }} />}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ fontStyle: 'italic' }}>
                {`${bomber.profile.profile.email} | ${bomber.profile.profile.number}`}
              </Typography>
              {(bomber.profile.profile.is_verified === 1) && <Box>
                <Divider variant="middle" sx={{ width: '100%' }} />
                <br />
                <Typography variant="body2" align="center">Congratulations! You are a verified user of IGN0R3DxALPHA. Share with your friends and inspire us to make more cool stuffs.</Typography>
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
        <EditDialog open={open} toggleOpen={toggleOpen} profile={bomber.profile.profile} />
      </Box>}
    </Box>
  )
}

export default Dashboard