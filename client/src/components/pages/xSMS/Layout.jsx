import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Divider from "@mui/material/Divider";
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
            width: '100%',
            position: 'fixed',
            bottom: 0, // 56px
            left: 0,
            right: 0
          }}
          value={page}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction
            component={Link}
            to="/user/"
            label="HOME"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/sms"
            label="XSMS"
            value="sms"
            icon={<SmsIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/sms/history"
            label="History"
            value="history"
            icon={<HistoryIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/sms/dashboard"
            label="DASHBOARD"
            value="dashboard"
            icon={<DashboardIcon />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
