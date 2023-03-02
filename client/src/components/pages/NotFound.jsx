import React from 'react'
import { Container, CssBaseline, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h1" color={"#42d4f5"}>404</Typography>
                <Typography color="#42d4f5">
                    PAGE NOT FOUND
                </Typography>
                <Link to="/">HOME</Link>
            </Box>
        </Container>
    )
}

export default NotFound