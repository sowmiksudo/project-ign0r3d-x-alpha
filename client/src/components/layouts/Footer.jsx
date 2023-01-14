import React from 'react'
import Typography from '@mui/material/Typography';
import { Link, IconButton, Box } from '@mui/material';
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer(props) {
  return (
    <>
      <Typography variant="body2" color="#42d4f5" align="center" {...props}>
        <Link sx={{ textDecoration: 'none', }} color="#42d4f5" href="https://www.facebook.com/MoJiiB.RsM">
          FROM Team Tiger
        </Link>
      </Typography>
      <Box sx={{
        marginTop: 2,
        display: 'flex',
        justifyContent: "center"
      }}>
        <a href="https://github.com/mojib-rsm">
          <IconButton sx={{
            color: '#42f58d'
          }} aria-label="">
            <GitHubIcon />
          </IconButton>
        </a>
        <a href="https://www.facebook.com/MoJiiB.RsM">
          <IconButton sx={{
            color: '#42f58d'
          }} aria-label="">
            <FacebookIcon />
          </IconButton>
        </a>
        <a href="https://t.me/MrBomberOfficial">
          <IconButton sx={{
            color: '#42f58d'
          }} aria-label="">
            <TelegramIcon />
          </IconButton>
        </a>
      </Box>
    </>
  );
}

export default Footer