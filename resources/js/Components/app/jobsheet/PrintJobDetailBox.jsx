import React, {useState} from 'react'

// mui
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: theme.spacing(1),

  },
  tableComponent : {
    display: 'flex',
    flexDirection: 'column',
    
  },
  tableActions: {
    alignSelf: 'flex-start',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PrintJobDetailBox = ({jobDetail}) => {
  const classes = useStyles()

  const [headers, setHeaders] = useState([
    'Street',
    'Gullies',
    'Connect',
    'Manholes',
    'Mains',
    'Length',
    '%Full',
  ])

  const headerList = headers.map(header => 
    <TableCell key={header} align="right" 
      >{header}</TableCell> 
  )

  const sheetTable = jobDetail.map(row => (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.streetName}
      </TableCell>
      <TableCell align="right">{row.gullies}</TableCell>
      <TableCell align="right">{row.connect}</TableCell>
      <TableCell align="right">{row.manholes}</TableCell>
      <TableCell align="right">{row.mains}</TableCell>
      <TableCell align="right">{row.lengthDetail}</TableCell>
      <TableCell align="right">{row.fullPercentage}</TableCell>
    </TableRow>
  ));


    return (
      <div style={{ width: "100%" }}>
        <Box display="none" displayPrint="block" m={1}>
          <TableContainer className={classes.tableContainer}>
            <Table
              className={classes.table}
              size="small"
              aria-label="job detail table"
            >
              <TableHead>
                <TableRow>{headerList}</TableRow>
              </TableHead>
              <TableBody>{sheetTable}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    );
}

export default PrintJobDetailBox
