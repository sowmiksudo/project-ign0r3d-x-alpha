import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';
import { store } from './components/redux/CreateStore';
import { Provider } from 'react-redux';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#42d4f5',
      // main: '#b12122',
      dark: '#42d4f5',
      light: '#000000',
    },
    secondary: {
      main: '#42d4f5',
    },
    background: {
      default: '#151515',
      paper: '#151515',
    },
    text: {
      primary: '#42d4f5',
      secondary: '#42d4f5',
    },
  },
  outlinedInput: {
    "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#42d4f5"
    },
    "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#42d4f5"
    }
  },
  '& .MuiSvgIcon-root': {
    htmlColor: "#42d4f5"
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
