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
      main: '#42f58d',
      // main: '#b12122',
      dark: '#42f58d',
      light: '#000000',
    },
    secondary: {
      main: '#42f58d',
    },
    background: {
      default: '#151515',
      paper: '#151515',
    },
    text: {
      primary: '#42f58d',
      secondary: '#42f58d',
    },
  },
  outlinedInput: {
    "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#42f58d"
    },
    "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#42f58d"
    }
  },
  '& .MuiSvgIcon-root': {
    htmlColor: "#42f58d"
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
