import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { CircularProgress, Backdrop, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Footer from './../layouts/Footer';

function Home() {
  const themeColor = "#b5e853";
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  useEffect(() => {
    // dispatch(LoadProfileAction());
    return () => {
    };
  }, [])

  return (
    <Box sx={{ display:'flex', alignItems:'center', height:'80vh' }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>            
            <Button variant="contained" onClick={e => navigate('/x-sms')}
              size="large" color="primary" sx={{ m: 3 }}>Xsms
            </Button>
            <Button variant="contained" onClick={e => navigate('/bomber')}
              size="large" color="primary" sx={{ m: 3 }}>Fiery Bomber
            </Button>
          </Box>
          <Footer sx={{ mt:10 }} />
          <a href="https://web.facebook.com/groups/team.x.official.community" style={{ color:'inherit' }}>
            <Typography align="center" variant="body2" sx={{ mt:2 }}>FROM TEAM X 1337</Typography>
          </a>
        </Box>
      }
    </Box>
  )
}
export default Home