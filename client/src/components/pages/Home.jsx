import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { CircularProgress, Backdrop, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Footer from './../layouts/Footer';
import About from './About';

function Home() {
  const themeColor = "#b5e853";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.user);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '80vh', justifyContent: 'center' }}>
      <Backdrop
        open={user.loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress sx={{ color: themeColor }} />
      </Backdrop>
      {
        !user.loading && user.profile.success &&
        <Box>
          <Typography variant="body2" align="left">THE PROJECT</Typography>
          <Typography variant="h4" align="center">IGN0R3DxALPHA</Typography>
          <Typography variant="body2" align="right">VERSION :: 1.0-BETA</Typography>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={e => navigate('/x-sms')}
              size="small" color="primary" sx={{ m: 3 }}>Xsms
            </Button>
            <Button variant="contained" onClick={e => navigate('/bomber')}
              size="small" color="primary" sx={{ m: 3 }}>Fiery Bomber
            </Button>
          </Box> */}
          <Footer sx={{ mt: 10 }} />
          <About open={open} toggleOpen={_ => setOpen(!open)} />
          <Typography align="center" variant="body2" sx={{ mt: 2, textDecoration: 'underline' }} onClick={_ => setOpen(true)}>FROM TEAM X 1337</Typography>
        </Box>
      }
    </Box>
  )
}
export default Home