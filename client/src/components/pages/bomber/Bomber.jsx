import { useState, useRef, useEffect } from 'react';
import Button from "../../utilities/Button";
import TextField from '@mui/material/TextField';
import { Backdrop, CircularProgress } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from "./Header";
import Footer from "../../layouts/Footer";
import BomberDialog from './BomberDialog';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import { LoadApiAction, CheckMsisdnAction } from "../../redux/actions/BomberActions";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Main() {
  const dispatch = useDispatch();
  const timer = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [fields, setFields] = useState({
    number: "",
    amount: "",
  });

  const [publicApis, setPublicApis] = useState([]);
  const [privateApis, setPrivateApis] = useState([]);
  const [publicChecked, setpublicChecked] = useState(true);
  const [hasBombingClicked, setHasBombingClicked] = useState(false);
  const [privateChecked, setPrivateChecked] = useState(false);
  const selectedApi = [
    ...(publicChecked ? publicApis : []),
    ...(privateChecked ? privateApis : [])
  ];

  const [dialogOpen, setDialogOpen] = useState(false);


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

  const handleFieldChange = e => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value
    })
  }

  const user = useSelector(state => state.user);
  const bomber = useSelector(state => state.bomber)
  useEffect(() => {
    dispatch(LoadApiAction());
  }, []);

  useEffect(() => {
    if (!bomber.loading) {
      if (bomber.check_success) {
        if (bomber.check_response) {
          Toastify(bomber.check_response.message, "success")
        }
      } else {
        if (bomber.check_response) {
          if (typeof bomber.check_response.message == 'string') {
            Toastify(bomber.check_response.message, "error")
          } else {
            const errors = bomber.check_response.message
            for (const error in errors) {
              errors[error].map(error => {
                Toastify(error, "error")
                return null;
              })
            }
          }
        }
      }
    }
  }, [bomber])


  useEffect(() => {
    if (!bomber.loading) {
      if (bomber.api_success) {
        let apis = bomber.apis.api_json;
        setPrivateApis(apis.private)
        setPublicApis(apis.public)
      }
    }
  }, [bomber]);


  const togglePublicCheck = (e) => {
    setpublicChecked(!publicChecked);
  }
  const togglePrivateCheck = (e) => {
    setPrivateChecked(!privateChecked);
  }


  const [mode, setMode] = useState('extreme');

  const handleChange = (event) => {
    setMode(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    if (fields.number === "" || fields.number.length !== 10) {
      Toastify("Please enter a valid number.", "error")
      return
    } if (fields.amount === "") {
      Toastify("Please enter a valid amount.", "error")
      return
    }

    if(selectedApi.length === 0){
      Toastify("No API selected.", "error")
      return
    }

    dispatch(CheckMsisdnAction(fields));
    setHasBombingClicked(true);
    console.log(selectedApi)
  };


  useEffect(() => {
    if (!bomber.loading) {
      if (bomber.check_success) {
        setDialogOpen(true);
      }
    }
  }, [bomber.check_response])



  return (
    <Box>
      <Backdrop
        open={bomber.loading}
        sx={{ color: '#fff', zIndex: 100210201201 }}
      >
        <CircularProgress sx={{ color: 'inherit' }} />
      </Backdrop>
      {!user.loading && bomber.api_success && bomber.apis && <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                style={{
                  borderColor: 'green'
                }}
                required
                fullWidth
                id="number"
                label="Number"
                name="number"
                autoComplete='off'
                placeholder='1819400400'
                inputProps={{
                  maxLength: 10
                }}
                autoFocus
                value={fields.number}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{
                  borderColor: 'green'
                }}
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                autoComplete='off'
                placeholder='500'
                value={fields.amount}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel control={<Checkbox checked={privateChecked} onChange={togglePrivateCheck} />} label="PRIVATE" />
                <FormControlLabel control={<Checkbox checked={publicChecked} onChange={togglePublicCheck} />} label="PUBLIC" />
              </Box>
            </Grid>
            {/* <Grid item xs={4}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="bombing-mode-id">MODE</InputLabel>
                  <Select
                    labelId="bombing-mode-id"
                    id="bombing-mode-id"
                    value={mode}
                    label="Mode"
                    onChange={handleChange}
                  >
                    <MenuItem value="extreme">Extreme</MenuItem>
                    <MenuItem value="relaxed">Relaxed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid> */}
          </Grid>
          <Button loading={bomber.loading} success={bomber.success} timer={timer} text="START BOMBING" icon={<LocalFireDepartmentIcon />} />
        </Box>
        <Footer sx={{ mt: 5 }} />

        {dialogOpen && hasBombingClicked && <BomberDialog open={dialogOpen} setOpen={setDialogOpen} apis={selectedApi} fields={fields} mode={mode} proxies={bomber.apis.proxies} />}

      </Box>}
    </Box>
  );
}