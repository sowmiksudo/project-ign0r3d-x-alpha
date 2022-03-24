import React, { useState, useEffect } from 'react';
import { Box, Backdrop, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import PublicApis from "./PublicApis";
import PrivateApis from "./PrivateApis";
import ShowApi from './ShowApi';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { LoadApiAction, ImportApiAction } from './../../../redux/actions/BomberActions';

export default function CollapsibleTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const Toastify = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
            }
        })
    }
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [sharingDialog, setSharingDialog] = useState({
        open: false,
        isExportMode: true,
        payload: ""
    });
    const bomber = useSelector(state => state.bomber);
    useEffect(() => {
        if (!bomber.apis) {
            dispatch(LoadApiAction());
        }
    }, [])

    const export_api = () => {
        const config = JSON.stringify(bomber.apis.api_json.private, null, 4);
        setSharingDialog({
            ...sharingDialog,
            open: true,
            isExportMode: true,
            payload: config
        });
    }

    const import_api = () => {
        setSharingDialog({
            ...sharingDialog,
            open: true,
            isExportMode: false,
        });
    }


    const handleClose = () => {
        setSharingDialog({
            ...sharingDialog,
            open: false,
        });
    };

    const handleConfigChange = (e) => {
        setSharingDialog({
            ...sharingDialog,
            payload: e.target.value
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(sharingDialog.payload).then(()=>{
            Toastify("Copied to the clipboard", "success");
        }).catch(()=>{
            Toastify("Can't copy to the clipboard", "error");
        })
    }


    const handleSave = () => {
        if(sharingDialog.payload === ""){
            Toastify("Please paste your config.", "info")
            return
        }
        try {
            JSON.parse(sharingDialog.payload)
        } catch (e) {
            Toastify("Invalid config JSON.", "error")
            return
        }
        dispatch(ImportApiAction(JSON.parse(sharingDialog.payload)));
    }

    useEffect(()=>{
        if(!bomber.loading){
            if(bomber.import !== null){
                Toastify(bomber.import.message, bomber.import.success ?"success":"error");
            }
        }
    }, [bomber.import])

    return (
        <Box>
            <Backdrop
                open={bomber.loading}
                sx={{ color: '#fff', zIndex: 100210201201 }}
            >
                <CircularProgress sx={{ color: 'inherit' }} />
            </Backdrop>
            <Dialog open={sharingDialog.open} onClose={handleClose}>
                <DialogTitle>{sharingDialog.isExportMode ? "EXPORT" : "IMPORT"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="config"
                        multiline
                        rows={10}
                        value={sharingDialog.isExportMode ? sharingDialog.payload : undefined}
                        onChange={!sharingDialog.isExportMode ? handleConfigChange : undefined}
                        label="CONFIG"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {sharingDialog.isExportMode ?
                        <Button onClick={handleCopy}>COPY</Button>
                        :
                        <Button onClick={handleSave}>SAVE</Button>
                    }
                </DialogActions>
            </Dialog>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7, mb: 1 }}>
                <ButtonGroup size="small" aria-label="API ACTIONS">
                    <Button key="add" onClick={_ => setAddDialogOpen(true)}>ADD API</Button>
                    <Button key="import" onClick={import_api}>IMPORT</Button>
                    <Button key="export" onClick={export_api}>EXPORT</Button>
                    <Button key="feedback" onClick={_=>navigate("/feedback")}>FEEDBACK</Button>
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
