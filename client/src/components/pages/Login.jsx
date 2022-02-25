import React, { useState, useEffect, useRef } from 'react';
import { TextField, Container, CssBaseline, Grid } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../redux/actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadProfileAction } from '../redux/actions/ProfileActions';
import { CircularProgress, Box, Backdrop } from '@mui/material';
import { useSnackbar } from "notistack";
import Button from "./../utilities/Button"

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const timer = useRef()

  const Toastify = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      }
    })
  }

  const profileResponse = useSelector(state => state.userDetails.userProfile);
  useEffect(() => {
    dispatch(LoadProfileAction());
    if (profileResponse !== "loading") {
      if (profileResponse.success) {
        navigate("/user")
        Toastify("You are already logged in!", "info")
      }
    }
    return () => {
    };
  }, [Toastify, navigate, dispatch])



  const [fields, setState] = useState({
    email: "",
    password: "",
  });
  const handleFieldChange = e => {
    setState({
      ...fields,
      [e.target.id]: e.target.value
    })
  }

  const authResponse = useSelector(state => state.userAuth.authResponse);

  const UserLogin = (e) => {
    e.preventDefault();
    dispatch(LoginAction(fields, navigate));
    console.table(authResponse)
    if (authResponse !== "" && authResponse !== 'loading') {
      if (!authResponse.success) {
        Toastify(authResponse.message, "error");
      } else {
        Toastify(authResponse.message, "success");
      }
    }
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
      <CssBaseline />
      <Backdrop
        open={profileResponse === 'loading'}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {profileResponse !== 'loading' &&
        <Box component="form" noValidate onSubmit={UserLogin} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{
                  borderColor: 'green'
                }}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete='off'
                placeholder='example@example.domain'
                value={fields.email}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete='off'
                sx={{
                  color: 'white'
                }}
                value={fields.password}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <Button
            loading={profileResponse === 'loading'}
            handleButtonClick={UserLogin}
            timer={timer}
            text="LOGIN"
            icon={<AccountCircleIcon />} />
        </Box>


      }
    </Container >
  )
}
export default Login;