import React, { useEffect, useState } from 'react'
import { Typography, Box, Backdrop, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { LoadBombingHistoryAction } from "../../redux/actions/BomberActions";

const themeColor = "#b5e853";

function History() {
  const dispatch = useDispatch()
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  useEffect(() => {
    dispatch(LoadBombingHistoryAction());
  }, [])

  const [rows, setRows] = useState([]);

  const bomber = useSelector(state => state.bomber)

  useEffect(() => {
    if (!bomber.loading) {
      if (bomber.history_success) {
        setRows(bomber.history.bombings.reverse())
      }
    }
  }, [bomber])

  return (
    <Box>
      <Backdrop
        open={bomber.loading}
        sx={{ color: '#fff', zIndex: 100210201201 }}
      >
        <CircularProgress sx={{ color: themeColor }} />
      </Backdrop>
      <Typography align="center" variant="h4">HISTORY</Typography>
      {!bomber.loading &&
        <Box>
          {(rows.length !== 0) ? <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Number</StyledTableCell>
                  <StyledTableCell align="left">Amount</StyledTableCell>
                  <StyledTableCell align="left">Time</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.number}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.amount}</StyledTableCell>
                    <StyledTableCell align="left">{row.created_at}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            :
            <Typography variant="h6" align="center">No history found!</Typography>}
        </Box>
      }
    </Box>
  )
}

export default History