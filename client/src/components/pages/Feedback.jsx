import React, { useState, useEffect } from 'react'
import { Box, Typography, Backdrop, CircularProgress, Grid, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LoadAppAction } from './../redux/actions/AppActions';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { postFeedback } from './../services/AppServices';

function Feedback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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

  const [http, setHttp] = useState({
    loading: false,
    response: null
  });

  const app = useSelector(state => state.app)
  useEffect(() => {
    if (!app.success) {
      dispatch(LoadAppAction());
    }
  }, []);


  useEffect(() => {
    if (!app.loading) {
      if (app.success) {
        if (app.app.settings.can_send_feedback !== 1) {
          navigate("/user");
          Toastify("Sorry, currently we are not taking any feedbacks.",
            "error");
        }
      }
    }
  }, [app])

  const [fields, setFields] = useState({
    title: "",
    message: ""
  });
  const handleFieldChange = e => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    postFeedback(fields).then(res => {
      setHttp({
        ...http,
        loading: false,
        response: res.data
      })
    })
  }

  useEffect(() => {
    if (!http.loading) {
      if (http.response !== null) {
        if (http.response.success) {
          Toastify(http.response.message, "success")
        } else {
          if (typeof http.response.message == 'string') {
            Toastify(http.response.message, "error")
          } else {
            const errors = http.response.message
            for (const error in errors) {
              errors[error].map(error => {
                Toastify(error, "error")
                return null;
              })
            }
          }
        }
      }
    }
  }, [http])

  return (
    <Box display="flex" justifyContent="center" mt={7} flexDirection="column">
      <Backdrop
        open={app.loading || http.loading}
      >
        <CircularProgress sx={{ color: 'white', zIndex: 9999 }} />
      </Backdrop>
      <Typography align="center" variant="h4">FEEDBACK</Typography>
      <Typography align="center" variant="body">Send a message</Typography>
      {!app.loading && <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{
                borderColor: 'green'
              }}
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete='off'
              placeholder='Title'
              multiline
              inputProps={{
                maxLength: 150
              }}
              autoFocus
              value={fields.title}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              minRows={4}
              maxRows={10}
              name="message"
              label="Message"
              type="text"
              id="message"
              autoComplete='off'
              placeholder="Describe what you want to tell us."
              sx={{
                color: 'white'
              }}
              inputProps={{
                maxLength: 1000
              }}
              value={fields.message}
              onChange={handleFieldChange}
            />
          </Grid>
        </Grid>
        <Button sx={{ mt: 2 }} fullWidth variant="contained" disabled={http.loading} type="submit">SEND FEEDBACK</Button>
      </Box>}
    </Box>
  )
}

export default Feedback