import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HistoryIcon from '@mui/icons-material/History';
import SmsIcon from '@mui/icons-material/Sms';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function SimpleBottomNavigation({ children }) {
  const location = useLocation();
  const page = location.pathname.split("/").slice(-1)[0]
  const [value, setValue] = React.useState(page);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
        {children}
        <Box>
          <BottomNavigation
            sx={{ 
                width:'100%',
                position:'fixed',
                bottom: 0,
                left:0,
                right:0
             }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction 
            component={Link}
            to="/"
            label="HOME" 
            value="home"
            icon={<HomeIcon />} 
            />
            <BottomNavigationAction 
            component={Link}
            to="/x-sms"
            label="XSMS" 
            value="x-sms"
            icon={<SmsIcon />} 
            />
            <BottomNavigationAction 
            component={Link}
            to="/x-sms/history"
            label="History" 
            value="history"
            icon={<HistoryIcon />} 
            />
            <BottomNavigationAction 
            component={Link}
            to="/x-sms/dashboard"
            label="XSMS PROFILE" 
            value="dashboard"
            icon={<DashboardIcon />} 
            />
          </BottomNavigation>
        </Box>
    </Box>
  );
}
