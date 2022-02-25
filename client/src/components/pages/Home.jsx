import React, { useEffect } from 'react';
import { Button, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadProfileAction } from '../redux/actions/ProfileActions';
import { CircularProgress, Backdrop } from '@mui/material';
import "./../../styles/App.css";
import { useSnackbar } from "notistack";

function Home() {
  const themeColor = "#b5e853";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const profileResponse = useSelector(state => state.userDetails.userProfile);
  useEffect(() => {
    dispatch(LoadProfileAction());
    if(profileResponse === ""){
      return
    }

    if(profileResponse !== 'loading'){
      if(!profileResponse.success){
        navigate("/user/login")
        console.log(profileResponse)
      }
    }
    return () => {
    };
  }, [])

  return (
    <Container maxWidth="xs" component="main">
      <CssBaseline />
      <div>
        <div>
          <Backdrop
            open={profileResponse === 'loading'}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress sx={{ color: themeColor }} />
          </Backdrop>
          {
            profileResponse !== "loading" && profileResponse !== "" && profileResponse.success &&
            <Button sx={{ mt: 10 }} variant="contained" onClick={e => navigate(e, '/user')}
              size="large" color="primary">User Dashboard
            </Button>
          }
        </div>
      </div>
    </Container>
  )
}
export default Home