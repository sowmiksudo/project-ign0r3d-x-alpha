import Main from "./components/pages/Main";
import "./styles/App.css";
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Grow } from "@mui/material"




function App() {
  return (
    <SnackbarProvider maxSnack={3} TransitionComponent={Grow} autoHideDuration={3000} >
      <div className="overlay">
        <Main />
      </div>
    </SnackbarProvider>
  );
}

export default App;
