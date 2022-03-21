import * as React from 'react';
import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';


const themeColor = '#b5e853';
export default function PublicApis({ apis }) {
  return (
    <Box sx={{ border:`1px solid ${themeColor}`, mb:2, borderRadius:'10px'}}>
      <Typography variant="h6" align="center" sx={{ mt:1 }}>PUBLIC APIs</Typography>
      <Typography variant="body2" align="center">TOTAL {apis.length}</Typography>
      <List>
        {apis.map((api, index) => {
          return (
            <ListItem disablePadding key={api.name}>
              <ListItemButton>
                {index+1} | {api.name}
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  );
}
