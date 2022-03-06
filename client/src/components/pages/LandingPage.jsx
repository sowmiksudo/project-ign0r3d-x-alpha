import React, { useEffect } from 'react'
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LoadProfileAction } from '../redux/actions/ProfileActions';

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(() => {
    // dispatch(LoadProfileAction())
    if (!user.loading) {
      if (!user.success) {
        navigate("/user/login");
      }
    }
    return () => {
    };
  }, [])

  return (
    <Box>
      <Typography color="white" variant="h1" align="center">INDEX</Typography>
      {!user.loading && user.success && <Button variant="contained" onClick={() => { navigate("/user") }}>Dashboard</Button>}
    </Box>
  )
}

export default LandingPage