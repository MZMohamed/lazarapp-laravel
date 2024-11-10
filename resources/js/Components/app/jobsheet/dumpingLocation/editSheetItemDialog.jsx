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

const updateSheetNumber = async (sheetNumberItem) => {
  const id = sheetNumberItem.id;
  const sheetNumber = sheetNumberItem.sheetNumber;

  const apiName = "backendapi";
  const path = `/sheetnumbers/${id}`;
  const myInit = {
    // OPTIONAL
    body: { sheetNumber: sheetNumber }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  return await API.post(apiName, path, myInit);
};

const EditSheetItemDialog = ({
  editOpen,
  setEditOpen,
  editingItem,
  setEditingItem,
  setIsEdited,
}) => {
  const [sheetItemNumber, setSheetItemNumber] = useState({});

  useEffect(() => {
    // check if sheet itemnumber is set and if editing item set then setsheet item
    Object.keys(sheetItemNumber).length < 1 &&
      Object.keys(editingItem).length > 0 &&
      setSheetItemNumber(editingItem);
  }, [editingItem, sheetItemNumber]);

  const handleClickEdit = () => {
    updateSheetNumber(sheetItemNumber)
      .then((res) => {
        setEditOpen(false);
        setIsEdited(true);
        setSheetItemNumber({});
        setEditingItem({});
        console.log(res);
        res.length > 0 && alert(`Updated Sheet Number`);
      })
      .catch((err) => alert(`Error Adding New Sheet Number: ${err.message}`));
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  const handleChange = (event) => {
    setSheetItemNumber({ ...sheetItemNumber, sheetNumber: event.target.value });
  };

  return (
    <div>
      <Dialog
        open={editOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Sheet Number</DialogTitle>
        <DialogContent>
          <DialogContentText>Dumping Location Sheet Number</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sheetNumber"
            label="Sheet Number"
            type="text"
            onChange={handleChange}
            value={sheetItemNumber.sheetNumber}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickEdit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditSheetItemDialog;
