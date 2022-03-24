import React, { useState, useEffect, useRef } from "react";
import { TextField, Grid, Box, Backdrop, Typography } from "@mui/material";
import Button from "./../utilities/Button";
import { useSnackbar } from "notistack";
import { useDispatch } from 'react-redux';
import { RegisterAction } from '../redux/actions/AuthActions';
import { useSelector } from "react-redux";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Navigate, useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

function RegisterComponent() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const timer = useRef(0);
  const navigate = useNavigate()
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

  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.loading) {
      if (auth.response && !auth.response.success) {
        if (typeof auth.response.message == 'string') {
          Toastify(auth.response.message, "error");
        } else {
          const errors = auth.response.message
          for (const error in errors) {
            errors[error].map(error => {
              Toastify(error, "error")
              return null;
            });
          }
        }
      } else {
        Toastify(auth.response.message, "success")
        navigate("/user/login");
      }
    }
  }, [auth])

  const [fields, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    number: ""
  });

  const handleFieldChange = e => {
    setState({
      ...fields,
      [e.target.id]: e.target.value
    })
  }

  const UserRegister = (e) => {
    e.preventDefault();
    if (fields.name === "" || fields.email === "" || fields.password === "" || fields.password_confirmation === "") {
      Toastify("You must fill in all the inputs.", "info");
      return;
    }
    if (fields.password !== fields.password_confirmation) {
      Toastify("Passwords are not same!", "error");
      return;
    }
    dispatch(RegisterAction(fields, navigate));
  };

  const user = useSelector(state => state.user)
  useEffect(() => {
    // dispatch(LoadProfileAction())
    return () => { }
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
      {!user.loading && user.success && <Navigate to="/user" />}
      <Backdrop
        open={auth.loading && user.loading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {
        <Box component="form" noValidate onSubmit={UserRegister} sx={{ mt: 3 }}>
          <Typography variant="h4" align="center" sx={{ mb:2 }}>REGISTER</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{
                  borderColor: 'green'
                }}
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete='off'
                placeholder='Your name'
                value={fields.name}
                onChange={handleFieldChange}
              />
            </Grid>
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
                style={{
                  borderColor: 'green'
                }}
                required
                fullWidth
                id="number"
                label="Number"
                name="number"
                autoComplete='off'
                placeholder='01xxxxxxxxx'
                value={fields.number}
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                id="password_confirmation"
                autoComplete='off'
                sx={{
                  color: 'white'
                }}
                value={fields.password_confirmation}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <Button
            loading={user.loading}
            handleButtonClick={UserRegister}
            timer={timer}
            text="REGISTER"
            icon={<HowToRegIcon />} />
          <Typography align="right" sx={{ mt: 1 }}>
            <Link to="/user/login">Already have an account? Login now.</Link>
          </Typography>
        </Box>
      }

    </Box>
  );
}
export default RegisterComponent;