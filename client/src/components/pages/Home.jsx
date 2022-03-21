import React, { useEffect } from 'react';
import { Button, Container, CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadProfileAction } from '../redux/actions/ProfileActions';
import { CircularProgress, Backdrop, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function Home() {
  const themeColor = "#b5e853";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    // dispatch(LoadProfileAction());
    return () => {
    };
  }, [])

  return (
    <Box sx={{ mt: 10 }}>
      <Backdrop
        open={user.loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress sx={{ color: themeColor }} />
      </Backdrop>
      {
        !user.loading && user.profile.success &&
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Button variant="contained" onClick={e => navigate('/')}
            size="large" color="primary" sx={{ m:3 }}>Home
          </Button>
          <Button variant="contained" onClick={e => navigate('/x-sms')}
            size="large" color="primary" sx={{ m:3 }}>Xsms
          </Button>
          <Button variant="contained" onClick={e => navigate('/bomber')}
            size="large" color="primary" sx={{ m:3 }}>FieryBomber
          </Button>
        </Box>
      }
    </Box>
  )
}
export default Home