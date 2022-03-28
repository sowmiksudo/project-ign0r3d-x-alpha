import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Typography, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AddApiAction, LoadApiAction } from './../../../redux/actions/BomberActions';

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}


export default function FormDialog({ open, setOpen }) {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [fields, setFields] = useState({
        name: "",
        url: "",
        method: "get",
        body: "",
        req_headers: "{}"
    });
    const handleFieldChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fields.name === "") {
            Toastify("Name is required", "info")
            return
        }
        if (fields.url === "") {
            Toastify("Url is required", "info")
            return
        }
        if (!isValidHttpUrl(fields.url)) {
            Toastify("URL is not valid", "error");
            return
        }
        try {
            JSON.parse(fields.req_headers);
        } catch (e) {
            Toastify("Invalid headers JSON", "error");
            return
        }
        console.log(fields);
        dispatch(AddApiAction(fields));
    }
    const bomber = useSelector(state => state.bomber);
    useEffect(() => {
        if (!bomber.loading) {
            if (bomber.add_api !== null) {
                Toastify(bomber.add_api.message, bomber.add_api.success ? "success" : "error");
            }
        }
    }, [bomber.add_api])



    return (
        <div>
            <Dialog open={open} onClose={_ => setOpen(false)}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>ADD API</DialogTitle>
                    <DialogContent>
                        <Typography variant="body">USE <code>_MSISDN_</code> in exchange of 1xxxxxxxxxx in the place of phone number. For detailed tutorial, follow tutorial on telegram.</Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="API Name"
                            type="text"
                            fullWidth
                            onChange={handleFieldChange}
                            value={fields.name}
                        />
                        <TextField
                            margin="dense"
                            name="url"
                            label="API Endpoint Url"
                            type="text"
                            fullWidth
                            onChange={handleFieldChange}
                            value={fields.url}
                        />
                        <FormControl fullWidth sx={{ mt: 3 }}>
                            <InputLabel id="method-label">METHOD</InputLabel>
                            <Select
                                labelId="method-label"
                                name="method"
                                value={fields.method}
                                label="METHOD"
                                onChange={handleFieldChange}
                            >
                                <MenuItem value="get">GET</MenuItem>
                                <MenuItem value="post">POST</MenuItem>
                                <MenuItem value="delete">DELETE</MenuItem>
                                <MenuItem value="update">UPDATE</MenuItem>
                                <MenuItem value="patch">PATCH</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            name="body"
                            label="API BODY"
                            type="text"
                            fullWidth
                            // variant="standard"
                            onChange={handleFieldChange}
                            value={fields.body}
                        />
                        <TextField
                            margin="dense"
                            name="req_headers"
                            label="API Headers in JSON Format"
                            type="text"
                            fullWidth
                            multiline
                            minRows={3}
                            maxRows={4}
                            onChange={handleFieldChange}
                            value={fields.headers}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={_ => setOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleSubmit}>ADD</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
