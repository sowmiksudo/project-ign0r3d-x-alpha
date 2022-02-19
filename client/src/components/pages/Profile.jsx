import React, { useEffect } from 'react';
import { Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadProfileAction } from '../redux/actions/ProfileActions';
export default function Profile() {
  const dispatch = useDispatch();
  const profileResponse = useSelector(state => state.userDetails.userProfile);
  useEffect(() => {
    dispatch(LoadProfileAction());
    return () => {
    };
  }, [])
  return (
    <div>
      <Card>
        {
          profileResponse !== "" && profileResponse !== null && profileResponse.success === true ?
            <div>
              <h3><b>Name: {profileResponse.data.name}</b></h3>
              <h3><b>email: {profileResponse.data.email}</b></h3>
              <h3><b>Creation Date: {profileResponse.data.created_at}</b></h3>
            </div>
            :
            <div>Unable to display profile</div>
        }
      </Card>
    </div>
  );
}