import React, { useState, useEffect } from 'react';
import { Button, TextField, Card } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../redux/actions/AuthActions';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadProfileAction } from '../redux/actions/ProfileActions';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const profileResponse = useSelector(state => state.userDetails.userProfile);
  useEffect(() => {
    dispatch(LoadProfileAction());
    return () => {
    };
  }, [])
  

  if(profileResponse !== "" && profileResponse !== null && profileResponse.success === true){
    navigate("/user")
  }

  const [fields, setState] = useState({
    email: "",
    password: "",
  });
  const handleFieldChange = e => {
    setState({
      ...fields,
      [e.target.id]: e.target.value
    })
  }
  const UserLogin = (e) => {
    e.preventDefault();
    console.log(fields);
    dispatch(LoginAction(fields, navigate));
  };
  return (
    <div>
      <div>
        <Card>
          <h2><b>Welcome to User Login Page</b></h2>
          <form onSubmit={UserLogin}>
            <div>
              <TextField
                type="email"
                required
                margin="normal"
                variant="outlined"
                label="email"
                id="email"
                value={fields.email}
                onChange={handleFieldChange}
              />
            </div>
            <div>
              <div>
                <TextField
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  id="password"
                  value={fields.password}
                  onChange={handleFieldChange}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<AccountCircleIcon />}
                >
                  <b>Login</b>
                </Button>
                <br />
                <div>
                  <Link to="/user/register">Register Here</Link>
                </div>
              </div>
              <div>
                <Link to="/home">Back To Home Page </Link>
              </div>
              <div></div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
export default Login