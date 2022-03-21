import React, { useState, useEffect } from 'react'
import { Box, Backdrop, CircularProgress, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadBlacklistedAction, AddBlacklistedAction, DeleteBlacklistedAction } from './../../redux/actions/BomberActions';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Typography, CardActions } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';

const themeColor = "#b5e853";
function Blacklist() {
  const dispatch = useDispatch()
  const bomber = useSelector(state => state.bomber);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [fields, setFields] = useState({
    number: "",
    note: ""
  });

  const handleFieldChange = e => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value
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
    });
    dispatch(LoadBlacklistedAction());
  }

  useEffect(() => {
    if (bomber.blacklist === null) {
      dispatch(LoadBlacklistedAction());
    }
  }, [])


  const toggleClick = () => {
    setOpen(!open);
  };

  const handleAdd = () => {
    dispatch(AddBlacklistedAction(fields));
  }

  const handleDelete = (id) => {
    dispatch(DeleteBlacklistedAction(id));
  }

  useEffect(()=>{
    if(!bomber.loading){
      if(bomber.delete_blacklist !== null){
        Toastify(bomber.delete_blacklist.message, bomber.delete_blacklist.success ? "success" : "error")
      }
    }
  }, [bomber.delete_blacklist])


  useEffect(() => {
    if (!bomber.loading && bomber.add_blacklist !== null) {
      if (bomber.add_blacklist.success) {
        Toastify(bomber.add_blacklist.message, "success")
      } else {
        if (typeof bomber.add_blacklist.message === 'string') {
          Toastify(bomber.check_response.message, "error")
        } else {
          const errors = bomber.add_blacklist.message
          for (const error in errors) {
            errors[error].map(error => {
              Toastify(error, "error")
              return null;
            })
          }
        }
      }
    }
  }, [bomber.add_blacklist])



  return (
    <>
      <Backdrop
        open={bomber.loading}
        sx={{ color: 'white', zIndex: 99999 }}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Backdrop>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
        <Button variant="outlined" onClick={toggleClick}>ADD</Button>
      </Box>
      <Dialog open={open} >
        <DialogTitle>ADD BLACKLIST</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            autoFocus
            required
            id="number"
            label="Phone Number"
            inputProps={{
              maxLength: 10
            }}
            placeholder="1xxxxxxxxx"
            type="text"
            fullWidth
            variant="standard"
            value={fields.number}
            onChange={handleFieldChange}
          />
          <TextField
            margin='dense'
            id="note"
            required
            label="Reasone/Note"
            placeholder="Please describe the not about why you are blacklisting."
            multiline
            rows={3}
            inputProps={{
              maxLength: 50
            }}
            type="text"
            fullWidth
            variant="standard"
            value={fields.note}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleClick}>Cancel</Button>
          <Button onClick={handleAdd}>ADD</Button>
        </DialogActions>
      </Dialog>
      {!bomber.loading && (bomber.blacklist !== null) &&
        <Box sx={{ mt:2 }}>
          <Typography variant="h5" align="center" gutterBottom>BLACKLISTS</Typography>
          {bomber.blacklist.blacklists.map(item => {
            return <Card key={item.id} sx={{ mb: 2, border: `1px solid ${themeColor}` }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="body" component="div">
                    0{item.number} - {item.note}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="small" color="primary" variant="outlined" onClick={() => { handleDelete(item.id) }}>
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          })}
        </Box>
      }
    </>
  )
}

export default Blacklist