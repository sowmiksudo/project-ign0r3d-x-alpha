import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';
import { store } from './components/redux/CreateStore';
import { Provider } from 'react-redux';


const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#b5e853',
      // main: '#b12122',
      dark: '#b5e853',
      light: '#000000',
    },
    secondary: {
      main: '#b5e853',
    },
    background: {
      default: '#151515',
      paper: '#151515',
    },
    text: {
      primary: '#b5e853',
      secondary: '#b5e853',
    },
  },
  outlinedInput: {
    "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#b5e853"
    },
    "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#b5e853"
    }
  }
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
