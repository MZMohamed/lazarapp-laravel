import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddJobSheetItemDialog({open, setOpen, newData, setNewData, jobid}) {
  
    const [values, setValues] = React.useState({
        jobId: null,
        streetName: '',
        gullies: '',
        connect: '',
        manholes: '',
        mains: '',
        lengthDetail: '',
        fullPercentage: '',

    })
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {


    setNewData({...values, jobId: jobid})
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
      event.preventDefault()

      setValues({...values, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Job Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form below to add a new job item
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="street"
            name="streetName"
            value={values.streetName}
            label="Street"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="gully"
            name="gullies"
            value={values.gullies}
            label="Gully"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="connect"
            name="connect"
            value={values.connect}
            label="Connect"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="manholes"
            name="manholes"
            value={values.manholes}
            label="Manhole"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="mains"
            name="mains"
            value={values.mains}
            label="Mains"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="length"
            name="lengthDetail"
            value={values.lengthDetail}
            label="Length"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            id="percentage"
            name="fullPercentage"
            value={values.fullPercentage}
            label="Percentage"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
