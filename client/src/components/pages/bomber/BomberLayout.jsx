import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import AddLinkIcon from "@mui/icons-material/AddLink";
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function BottomNav({ children }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const BasicMenu = () => {
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
      </div>
    );
  }

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
            bottom: 0,
            left: 0,
            right: 0
          }}
          value={value}
          onChange={handleChange}
          showLabels
        >

          <BottomNavigationAction
            component={Link}
            to="/user"
            label="HOME"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/bomber"
            label="BOMBER"
            value="bomber"
            icon={<SmsFailedIcon />}
          />
          {/* <BottomNavigationAction
            component={Link}
            to="/bomber/history"
            label="History"
            value="history"
            icon={<HistoryIcon />}
          /> */}
          <BottomNavigationAction
            component={Link}
            to="/bomber/dashboard"
            label="Profile"
            value="dashboard"
            icon={<DashboardIcon />}
          />
          {/* <BottomNavigationAction
            component={Link}
            to="/bomber/blacklist"
            label="BLACKLIST"
            value="blacklist"
            icon={<CancelIcon />}
          /> */}
          <BottomNavigationAction
            label="More"
            value="more"
            id="basic-menu"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            icon={<MoreVertIcon />}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {/* <Link to="/bomber/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
              <MenuItem onClick={handleClose}>Dashboard</MenuItem>
            </Link> */}
            <Link to="/bomber/history" style={{ color: 'inherit', textDecoration: 'none' }}>
              <MenuItem onClick={handleClose}>History</MenuItem>
            </Link>
            <Link to="/bomber/api" style={{ color: 'inherit', textDecoration: 'none' }}>
              <MenuItem onClick={handleClose}>API</MenuItem>
            </Link>
            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>
        </BottomNavigation>
      </Box>
    </Box>
  );
}
