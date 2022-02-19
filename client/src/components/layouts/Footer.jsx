import React from 'react'
import Typography from '@mui/material/Typography';
import { Link, IconButton, Box } from '@mui/material';
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

function Footer(props) {


  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        <Link sx={{ textDecoration: 'none', }} href="https://ign0r3dh4x0r.github.io/linktree.html">
          &copy; IGN0R3DH4X0R
        </Link>
      </Typography>
      <Box sx={{
        marginTop: 2,
        display: 'flex',
        justifyContent: "center"
      }}>
        <a href="https://github.com/Ign0r3dh4x0r">
          <IconButton sx={{
            color: '#b5e853'
          }} aria-label="">
            <GitHubIcon />
          </IconButton>
        </a>
        <a href="https://web.facebook.com/groups/team.x.official.community">
          <IconButton sx={{
            color: '#b5e853'
          }} aria-label="">
            <FacebookIcon />
          </IconButton>
        </a>
        <a href="https://t.me/teamx1337official">
          <IconButton sx={{
            color: '#b5e853'
          }} aria-label="">
            <TelegramIcon />
          </IconButton>
        </a>
      </Box>
    </>
  );
}

export default Footer