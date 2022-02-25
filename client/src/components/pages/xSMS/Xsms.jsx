import { useState, useRef } from 'react';
import Button from "../../utilities/Button";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useSnackbar } from 'notistack';
import SendIcon from '@mui/icons-material/Send';




export default function Main() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
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


  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        Toastify("API metadata fetched!", "success")
      }, 2000);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      number: data.get('number'),
      message: data.get('message'),
    });
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
              />
            </Grid>
          </Grid>
          <Button loading={loading} success={success} handleButtonClick={handleButtonClick} timer={timer} text="SEND SMS" icon={<SendIcon />} />
        </Box>
      </Box>
      <Footer sx={{ mt: 5 }} />
    </Container>
  );
}