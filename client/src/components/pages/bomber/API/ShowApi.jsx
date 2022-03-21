import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, setOpen }) {
    const [fields, setFields] = useState({
        name: "",
        method: "get",
        body: ""
    });
    const handleFieldChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        console.log(fields)
    }

    return (
        <div>
            <Dialog open={open} onClose={_ => setOpen(false)}>
                <DialogTitle>ADD API</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        name="name"
                        label="API Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleFieldChange}
                        value={fields.name}
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
                        variant="standard"
                        onChange={handleFieldChange}
                        value={fields.body}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={_ => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>ADD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
