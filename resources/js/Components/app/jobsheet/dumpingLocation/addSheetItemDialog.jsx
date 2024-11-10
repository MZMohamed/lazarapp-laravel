import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//aws
import { Amplify, API } from "aws-amplify";
import awsconfig from "../../../aws-exports";
Amplify.configure(awsconfig);

const addSheetNumber = async (jobid, sheetNumber) => {
  const apiName = "backendapi";
  const path = "/sheetnumbers";
  const myInit = {
    // OPTIONAL
    body: { "jobId": jobid, "sheetNumber": sheetNumber }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  return await API.post(apiName, path, myInit)
};

const AddSheetItemDialog = ({ addOpen, setAddOpen, jobid, setIsEdited }) => {
  const [sheetNumber, setSheetNumber] = useState("");

  const handleClickAdd = () => {
    addSheetNumber(jobid, sheetNumber)
      .then(res => {
        setAddOpen(false);
        setSheetNumber("");

        setIsEdited(true)

        alert(`Added: ${res.sheetNumber}`)
      })
      .catch((err) => alert(`Error Adding New Sheet Number: ${err}`));
  };

  const handleClose = () => {
    setAddOpen(false);
    setSheetNumber("");
  };

  const handleChange = (event) => {
    setSheetNumber(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Sheet Number</DialogTitle>
        <DialogContent>
          <DialogContentText>Dumping Location Sheet Number</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sheetNumber"
            label="Sheet Number"
            type="text"
            onChange={handleChange}
            value={sheetNumber}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSheetItemDialog;
