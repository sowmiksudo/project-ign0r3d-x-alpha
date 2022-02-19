import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Grow } from "@mui/material"
import Page from "./components/layouts/Page";

function App() {
  return (
    <BrowserRouter>
      <Page>
        <SnackbarProvider maxSnack={3} TransitionComponent={Grow} autoHideDuration={3000} >
          <Routes />
        </SnackbarProvider>
      </Page>

    </BrowserRouter>
  );
}

export default App;
