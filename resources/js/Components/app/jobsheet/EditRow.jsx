import React, { useState, useEffect } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  FormLabel,
  MenuItem,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const EditRow = ({
  row,
  setRow,
  editRowOpen,
  setEditRowOpen,
  jobEdited,
  setJobEdited,
}) => {
  const [values, setValues] = useState({
    streetName: "",
    gullies: "",
    connect: "",
    manholes: "",
    mains: "",
    lengthDetail: "",
    fullPercentage: "",
  });

  let random;

  useEffect(() => {
    if (row) {
      setValues({
        streetName: row.streetName,
        gullies: row.gullies,
        connect: row.connect,
        manholes: row.manholes,
        mains: row.mains,
        lengthDetail: row.lengthDetail,
        fullPercentage: row.fullPercentage,
      });
    }
  }, [row, setValues]);

  const handleClose = () => {
    setEditRowOpen(false);
  };

  const handleEdit = () => {
    setRow({ ...values, id: row.id });
    setJobEdited(true);
    setEditRowOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();

    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Dialog
        open={editRowOpen}
        onClose={handleClose}
        aria-labelledby="edit-row-dialog"
      >
        <DialogTitle id="edit-job-dialog-title">Edit Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form below to edit items
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
            value={row.fullPercentage}
            label="Percentage"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditRow;
