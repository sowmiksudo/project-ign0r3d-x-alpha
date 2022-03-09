import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

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
            to="/bomber"
            label="BOMBER" 
            value="bomber"
            icon={<LocalFireDepartmentIcon />} 
            />
            <BottomNavigationAction 
            component={Link}
            to="/x-sms/history"
            label="Bombing History" 
            value="history"
            icon={<HistoryIcon />} 
            />
            <BottomNavigationAction 
            component={Link}
            to="/x-sms/dashboard"
            label="Bomber Profile" 
            value="dashboard"
            icon={<DashboardIcon />} 
            />
          </BottomNavigation>
        </Box>
    </Box>
  );
}
