import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, IconButton, CardActionArea, CardActions, Backdrop, CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { DeleteApiAction, LoadApiAction } from './../../../redux/actions/BomberActions';

const themeColor = '#b5e853';

export default function MultiActionAreaCard({ apis }) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const Toastify = (message, variant) => {
        enqueueSnackbar(message, {
          variant: variant,
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          }
        });
      }
    
    const bomber = useSelector(state => state.bomber);

    const handleDelete = (id) => {
        dispatch(DeleteApiAction(id));
    }

    useEffect(()=>{
        if(!bomber.loading){
            if(bomber.delete !== null){
                Toastify(bomber.delete.message, "success");
            }
        }
    }, [bomber.delete])

    return (
        <Box sx={{ pb: 10 }}>
            <Backdrop 
            sx={{ color:'white', zIndex:99999 }}
            open={bomber.loading}
            >
                <CircularProgress sx={{ color: themeColor }} />
            </Backdrop>
            {!bomber.loading && apis.map(api => {
                return <Card key={api.id} sx={{ mb: 2, border: `1px solid ${themeColor}` }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h6" align="center" component="div">
                                {api.name}
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">URL</TableCell>
                                            <TableCell>{api.config.url}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">METHOD</TableCell>
                                            <TableCell>{api.config.method}</TableCell>
                                        </TableRow>
                                        {(Object.keys(api.config.headers).length > 0) &&
                                            <>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="left">HEADERS</TableCell>
                                                </TableRow>
                                                {
                                                    Object.keys(api.config.headers).map(key => {
                                                        return (
                                                            <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell component="th" scope="row">{key}</TableCell>
                                                                <TableCell>{api.config.headers[key]}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size="small" color="primary" variant="outlined">
                            EDIT
                        </Button>
                        <Button size="small" color="primary" data-name={api.name} variant="outlined" key={api.name} onClick={()=>{handleDelete(api.id)}}>
                            <DeleteIcon />
                        </Button>
                    </CardActions>
                </Card>
            }
            )}
        </Box >
    );
}
