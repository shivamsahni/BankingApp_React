import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell align="right"><strong>Transaction Amount</strong></TableCell>
            {/* <TableCell align="right">Date</TableCell> */}
            <TableCell align="right"><strong>Transaction Type</strong></TableCell>
            <TableCell align="right"><strong>Transaction Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.description}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              {/* <TableCell align="right">{row.date}</TableCell> */}
              <TableCell align="right">{row.transactionType}</TableCell>
              <TableCell align="right">{moment(row.date).format("D MMM YYYY h:mm A")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
