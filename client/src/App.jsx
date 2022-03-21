import { HashRouter } from "react-router-dom";
import Routes from "./Routes";
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Grow } from "@mui/material"
import "./styles/App.css";

function App() {
  return (
    <div className="">
      <SnackbarProvider maxSnack={3} TransitionComponent={Grow} autoHideDuration={3000} >
        <HashRouter>
          <Routes />
        </HashRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
