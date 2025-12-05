import React, {useState, useEffect} from 'react'
// import '../../print.css'

  // mui
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Button } from '@material-ui/core';




import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// component
import AddJobSheetItemDialog from "./AddJobSheetItemDialog";
import EditRow from "./EditRow";

//aws
import { API, Auth } from 'aws-amplify';
import PrintJobDetailBox from './PrintJobDetailBox';
// import awsconfig from '../../../aws-exports';
// Amplify.configure(awsconfig);


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

  const fetchJobDetails = async (jobid) => {

    const apiName = 'backendapi'
    const path = `/jobdetails/${jobid}`
    const myInit = { // OPTIONAL
        headers: {}, // OPTIONAL
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {  // OPTIONAL
            // name: 'param'
        }
    }
     return await API.get(apiName, path, myInit)
  };

  const addNewDetail = async (detailItem) => {

    const apiName = "backendapi";
    const path = `/jobdetails`
    const myInit = {
      // OPTIONAL
      body: detailItem, // replace this with attributes you need
      headers: {} // OPTIONAL
    };

    return await API.post(apiName, path, myInit)
  };

  const deleteJobDetailRow = async rowid => {

    const apiName = "backendapi";
    const path = `/jobdetails`
    const myInit = {
      // OPTIONAL
      body: {id: rowid}, // replace this with attributes you need
      headers: {} // OPTIONAL
    };

    return await API.del(apiName, path, myInit)
  };

  const updateDetail = async (v) => {

    const {id, ...detailItem} = v

    const apiName = "backendapi";
    const path = `/jobdetails/${id}`
    const myInit = {
      // OPTIONAL
      body: detailItem, // replace this with attributes you need
      headers: {} // OPTIONAL
    };

    return await API.post(apiName, path, myInit)
  };



const JobSheetTable = ({jobid, PdfSheetItems, setPdfSheetItems, pdfItemAdded, setPdfItemAdded, adminApproved, setAdminApproved}) => {
    const classes = useStyles()
    let randomNumber
    const [newData, setNewData] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false)
    const [rows, setRows] = useState([])
    const [jobDetail, setJobDetail] = useState([])
    const [groups, setGroups] = useState(Auth.user.signInUserSession.accessToken.payload["cognito:groups"])

    const [rowValues, setRowValues] = useState({})
    const [editRowOpen, setEditRowOpen] = useState(false)
    const [jobEdited, setJobEdited] = useState(false)

    const [headers, setHeaders] = useState([
      'Street',
      'Gullies',
      'Connect',
      'Manholes',
      'Mains',
      'Length',
      'Percentage',
      'Map',
      'Actions'
    ])

    useEffect(() => {
      fetchJobDetails(jobid)
        .then(jd => {
          setJobDetail(jd)
        })
        .catch(() => {
          alert('Error fetching job detail')
        })
    }, [jobid])

    useEffect(() => {
      if (Object.entries(newData).length > 0) {
        const detailData = pdfItemAdded
          ? { ...newData, mapNumber: PdfSheetItems.length }
          : { ...newData };

        addNewDetail(detailData)
          .then((nd) => {
            alert(pdfItemAdded ? "New Map Item Added" : "New Item Added");
            setJobDetail([...jobDetail, nd]);
            setNewData({});
            if (pdfItemAdded) setPdfItemAdded(false);
          })
          .catch(() => {
            alert("Error adding new detail");
          });
      }
    }, [newData, pdfItemAdded, PdfSheetItems.length, addNewDetail, jobDetail]);



    // Update detail
    useEffect(() => {

      Object.entries(rowValues).length > 0 && jobEdited ?
      updateDetail(rowValues)
        .then(ud => {

          const tempDetails = [...jobDetail]
          const detailIndex = tempDetails.findIndex(index => index.id === rowValues.id)
          tempDetails[detailIndex] = rowValues
          setJobDetail(tempDetails)
          alert('Detail Updated')

          setRowValues({})
          setJobEdited(false)
        })
        .catch(err => console.log('Error', err))
      : randomNumber = 1

    }, [rowValues, jobEdited])

    useEffect(() => {
      console.log({jobDetail})
    }, [jobDetail])

    useEffect(() => {

      pdfItemAdded ? setDialogOpen(true) : randomNumber = 1

    }, [PdfSheetItems])

    const handleRowDelete = rowid => event => {
      event.preventDefault()
      deleteJobDetailRow(rowid)
        .then( row => {
          setJobDetail(jobDetail.filter(jd => jd.id !== rowid))
          alert('Job Item Removed')
        })
        .catch(() => {
          alert('Could not delete row')
        })
    }

    const handleRowEdit = row => event => {
      event.preventDefault()
      setEditRowOpen(true)

      setRowValues(row)


    }

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
        <TableCell align="right">{row.mapNumber}</TableCell>

        <TableCell align="right">
          {groups && !groups.includes("client") && !adminApproved ? (
            <IconButton onClick={handleRowEdit(row)} color="secondary" label="Edit">
              <EditIcon />
            </IconButton>
          ) : null}
          {groups && !groups.includes("client") && !adminApproved ? (
            <IconButton onClick={handleRowDelete(row.id)}>
              <DeleteIcon color="action" />
            </IconButton>
          ) : null}
        </TableCell>
      </TableRow>
    ));

    return (
      <>
      <div className="noPrint">
          <div className={classes.tableComponent}>
            <TableContainer component={Paper} className={classes.tableContainer}>
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
            <AddJobSheetItemDialog
              open={dialogOpen}
              setOpen={setDialogOpen}
              newData={newData}
              setNewData={setNewData}
              jobid={jobid}
            />
            <EditRow
              row={rowValues}
              editRowOpen={editRowOpen}
              setEditRowOpen={setEditRowOpen}
              jobEdited={jobEdited}
              setJobEdited={setJobEdited}
              setRow={setRowValues}
            />



            <div className="noPrint">
              <div className={classes.tableActions}>
                {groups &&
                (groups.includes("admin") || groups.includes("driver")) &&
                !adminApproved && (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<AddBoxIcon />}
                    onClick={() => setDialogOpen(true)}
                  >
                    {" "}
                    Add
                  </Button>
                )}
              </div>
            </div>

            {/* <IconButton className={classes.tableActions} onClick={() => setDialogOpen(true)}>
            <AddBoxIcon color="secondary"/>
          </IconButton> */}
          </div>
        </div>
        <PrintJobDetailBox
          jobDetail={jobDetail}
        />
      </>
    );
}

JobSheetTable.defaultProps={
  jobid: -1
}

export default JobSheetTable
