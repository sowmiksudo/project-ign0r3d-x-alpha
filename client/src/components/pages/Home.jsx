import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadProfileAction } from '../redux/actions/ProfileActions';

function Home(){
  
  const navigate = useNavigate();
  const goToDashboard = (url) => {
    navigate(url);
  }

  const dispatch = useDispatch();
  const profileResponse = useSelector(state => state.userDetails.userProfile);
  useEffect(() => {
    dispatch(LoadProfileAction());
    return () => {
    };
  }, [])

  return (
    <>
      <div>
        <div>
          {profileResponse !== "" && profileResponse !== null && profileResponse.success === true ?
          <Button variant="contained" onClick={e => goToDashboard(e, '/user')}
            size="large" color="primary">User Dashboard
          </Button> 
          : goToDashboard("/user/login")
}
        </div>
      </div>
    </>
  )
}
export default Home