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
      <Typography variant="body2" color="#fa7fe3" align="center" {...props}>
        <Link sx={{ textDecoration: 'none', }} color="#fa7fe3" href="https://www.facebook.com/MrTeamTiger/">
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
            color: '#fa7fe3'
          }} aria-label="">
            <GitHubIcon />
          </IconButton>
        </a>
        <a href="https://www.facebook.com/MoJiiB.RsM">
          <IconButton sx={{
            color: '#fa7fe3'
          }} aria-label="">
            <FacebookIcon />
          </IconButton>
        </a>
        <a href="https://t.me/MrTools_BD">
          <IconButton sx={{
            color: '#fa7fe3'
          }} aria-label="">
            <TelegramIcon />
          </IconButton>
        </a>
      </Box>
    </>
  );
}

export default Footer