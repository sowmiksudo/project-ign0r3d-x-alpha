import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { LoadProfileAction, UpdateProfileAction } from "../redux/actions/ProfileActions";
import { useSnackbar } from 'notistack';

export default function EditDialog({ open, toggleOpen, profile }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isReloaded, setIsReloaded] = useState(false);
    const [fields, setFields] = useState({
        "name": profile.name,
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
        setIsSubmitted(true)
        dispatch(UpdateProfileAction(fields));
    }


    useEffect(() => {
        if (isSubmitted) {
            if (!user.loading) {
                if (user.success) {
                    Toastify("Profile successfully updated, reload to see effect.", "success");
                    toggleOpen();
                    if (!isReloaded) {
                        dispatch(LoadProfileAction());
                        setIsReloaded(true);
                    }
                } else {
                    Toastify("Unexpected Error Occured.", "error");
                    toggleOpen();
                }
            }
        }
    }, [user])

    return (
        <div>
            <Dialog open={open} onClose={toggleOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={fields.name}
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
