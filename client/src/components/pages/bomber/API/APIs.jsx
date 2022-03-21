import React, { useState, useEffect } from 'react';
import { Box, Backdrop, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import PublicApis from "./PublicApis";
import PrivateApis from "./PrivateApis";
import ShowApi from './ShowApi';
import { Button, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { LoadApiAction } from './../../../redux/actions/BomberActions';

export default function CollapsibleTable() {
    const dispatch = useDispatch();
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const bomber = useSelector(state => state.bomber);
    useEffect(() => {
        if (!bomber.apis) {
            dispatch(LoadApiAction());
        }
    }, [])

    return (
        <Box>
            <Backdrop
                open={bomber.loading}
                sx={{ color: '#fff', zIndex: 100210201201 }}
            >
                <CircularProgress sx={{ color: 'inherit' }} />
            </Backdrop>
            <Box sx={{ display:'flex', justifyContent:'center', mt:7, mb:1 }}>
                <ButtonGroup size="small" aria-label="API ACTIONS">
                    <Button key="add" onClick={_=>setAddDialogOpen(true)}>ADD API</Button>
                    <Button key="import">IMPORT</Button>
                    <Button key="export">EXPORT</Button>
                    <Button key="feedback">FEEDBACK</Button>
                </ButtonGroup>
            </Box>
            {!bomber.loading && bomber.api_success && <Box>
                <ShowApi open={addDialogOpen} setOpen={setAddDialogOpen} />
                <Typography align="center" variant="h3">APIs</Typography>
                <PublicApis apis={bomber.apis.api_json.public} />
                <PrivateApis apis={bomber.apis.api_json.private} />
            </Box>}
        </Box>
    );
}
