import { useState, useRef, useEffect } from 'react';
import Button from "../../utilities/Button";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useSnackbar } from 'notistack';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from "react-redux";
import { LoadConfigAction, SendMessageAction } from "../../redux/actions/XsmsActions";

export default function Main() {
  const dispatch = useDispatch();
  const timer = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [fields, setFields] = useState({
    number: "",
    message: ""
  });


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

  const handleFieldChange = e => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value
    })
  }

  const user = useSelector(state => state.user);
  const xsms = useSelector(state => state.xsms)
  useEffect(() => {
    dispatch(LoadConfigAction());
  }, [])

  useEffect(() => {
    if(!xsms.loading){
      if(xsms.success){
        if(xsms.response){
            Toastify(xsms.response.message, "success")
        }
      } else {
        if(xsms.response) {
          if (typeof xsms.response.message == 'string') {
            Toastify(xsms.response.message, "error")
          } else {
            const errors = xsms.response.message
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
  }, [xsms])

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(SendMessageAction(fields));
  };


  return (
    <Box>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                multiline
                inputProps={{
                  maxLength: 11
                }}
                autoFocus
                value={fields.number}
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
                placeholder="Hey there, xSMS has got you!"
                sx={{
                  color: 'white'
                }}
                inputProps={{
                  maxLength: 150
                }}
                value={fields.message}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <Button loading={xsms.loading} success={xsms.success} timer={timer} text="SEND SMS" icon={<SendIcon />} />
        </Box>
      </Box>
      <Footer sx={{ mt: 5 }} />
    </Box>
  );
}