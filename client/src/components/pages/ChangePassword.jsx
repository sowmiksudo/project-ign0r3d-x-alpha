import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordAction } from "../redux/actions/ProfileActions";
import { useSnackbar } from 'notistack';

export default function EditDialog({ open, toggleOpen }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [fields, setFields] = useState({
        "old_pass": "",
        "new_pass": ""
    });

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

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(ChangePasswordAction(fields));
    }


    useEffect(() => {
        if (!user.loading) {
            if (user.change !== null) {
                if (user.change.success) {
                    Toastify(user.change.message, "success");
                    // toggleOpen();
                } else {
                    Toastify(user.change.message, "error");
                    // toggleOpen();
                }
            }
        }
    }, [user.change])

    return (
        <div>
            <Dialog open={open} onClose={toggleOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="old_pass"
                            label="Old Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={fields.old_pass}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="new_pass"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={fields.new_pass}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleOpen}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
