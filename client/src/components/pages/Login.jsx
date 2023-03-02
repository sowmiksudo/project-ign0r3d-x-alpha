import React, { useState, useEffect, useRef } from 'react';
import { TextField, Grid, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { LoginAction } from '../redux/actions/AuthActions';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { CircularProgress, Box, Backdrop } from '@mui/material';
import { useSnackbar } from "notistack";
import Button from "./../utilities/Button"
import LoginIcon from '@mui/icons-material/Login';
import { LoadProfileAction } from '../redux/actions/ProfileActions';
import { LoadAppAction } from '../redux/actions/AppActions';


const themeColor = "#42d4f5";

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

  const user = useSelector(state => state.user);

  useEffect(() => {
    // dispatch(LoadProfileAction())
    return () => {
    };
  }, [])

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



  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.loading) {
      if (!auth.response.success) {
        if (typeof auth.response.message == 'string') {
          Toastify(auth.response.message, "error")
        } else {
          const errors = auth.response.message
          for (const error in errors) {
            errors[error].map(error => {
              Toastify(error, "error")
              return null;
            })
          }
        }
      } else {
        Toastify(auth.response.message, "success")
        dispatch(LoadProfileAction())
        dispatch(LoadAppAction());
        if(!user.loading){
          if(user.profile.success){
            navigate("/user")
          }
        }
      }
    }
  }, [auth])

  const UserLogin = (e) => {
    e.preventDefault();
    if (fields.email === "" | fields.password === "") {
      Toastify("You must fillup all the boxes.", "warning")
      return
    }

    dispatch(LoginAction(fields, navigate));
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
      {!user.loading && user.profile && user.profile.success && <Navigate to="/user" />}
      <Backdrop
        open={(user.loading && auth.loading)}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {(!user.loading || !auth.loading) &&
        <Box>
          <Box component="form" noValidate onSubmit={UserLogin} sx={{ mt: 3 }}>
            <Typography variant="h2" align="center">LOGIN</Typography>
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
              loading={user.loading}
              handleButtonClick={UserLogin}
              timer={timer}
              text="LOGIN"
              icon={<LoginIcon />} />
          </Box>
          <Typography align="right" sx={{ mt: 2, color:themeColor + '!important' }}>
            <Link to="/user/register">Don't have an account? Register now!</Link>
          </Typography>
        </Box>
      }
    </Box>
  )
}
export default Login;