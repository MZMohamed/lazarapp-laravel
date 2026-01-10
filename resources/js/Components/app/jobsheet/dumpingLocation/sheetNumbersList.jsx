import React, { useEffect, useState } from "react";

import EditSheetItemDialog from "./editSheetItemDialog";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const fetchSheetNumbers = async (jobid) => {
  // const apiName = "backendapi";
  // const path = `/sheetnumbers/${jobid}`;
  // const myInit = {
  //   // OPTIONAL
  //   headers: {}, // OPTIONAL
  //   response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
  //   queryStringParameters: {
  //     // OPTIONAL
  //     // name: 'param'
  //   },
  // };
  // return await API.get(apiName, path, myInit);
};

const deleteSheetNumber = async (id) => {
  // const apiName = "backendapi";
  // const path = `/sheetnumbers`;
  // const myInit = {
  //   // OPTIONAL
  //   body: { id: id }, // replace this with attributes you need
  //   headers: {}, // OPTIONAL
  // };

  // await API.del(apiName, path, myInit);
};

const SheetNumbersList = ({ jobid, isEdited, setIsEdited }) => {
  const classes = useStyles();
  const [groups, setGroups] = useState([]
    // Auth.user.signInUserSession.accessToken.payload["cognito:groups"]
  );

  const [editOpen, setEditOpen] = useState(false);
  const [sheetNumbers, setSheetNumbers] = useState([]);

  const [editingItem, setEditingItem] = useState({});

  // useEffect(() => {
  //   jobid &&
  //     fetchSheetNumbers(jobid)
  //       .then((res) => {
  //         setSheetNumbers(res);
  //       })
  //       .catch((err) => alert(`Error fetching Sheet Numbers: ${err}`));
  // }, [jobid]);

  // useEffect(() => {
  //   isEdited &&
  //     fetchSheetNumbers(jobid)
  //       .then((res) => {
  //         setSheetNumbers(res);
  //       })
  //       .catch((err) => alert(`Error fetching Sheet Numbers: ${err}`));

  //   isEdited && setIsEdited(false);
  // }, [isEdited, jobid]);

  const handleRowDelete = (id) => (event) => {
    deleteSheetNumber(id)
      .then(() => {
        jobid &&
          fetchSheetNumbers(jobid)
            .then((res) => {
              setSheetNumbers(res);
              alert("Sheet Number Deleted");
            })
            .catch((err) => alert(`Error fetching Sheet Numbers: ${err}`));
      })
      .catch((err) => console.log(err));
  };

  const handleRowEdit = (sheetNumber) => (event) => {
    setEditOpen(true);
    setEditingItem(sheetNumber);
  };

  const sheetNumberList = sheetNumbers.map((sn) => (
    <ListItem key={sn.id}>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary={sn.sheetNumber} />
      {groups && !groups.includes("client") && (
        <IconButton onClick={handleRowEdit(sn)} color="secondary" label="Edit">
          <EditIcon />
        </IconButton>
      )}
      {groups && !groups.includes("client") && (
        <IconButton onClick={handleRowDelete(sn.id)}>
          <DeleteIcon color="action" />
        </IconButton>
      )}
    </ListItem>
  ));

  const emptySheetNumberList = (
    <ListItem>
      <ListItemIcon>
        <CancelPresentationIcon />
      </ListItemIcon>
      <ListItemText
        primary={"No Sheet Numbers"}
        secondary={"Click the 'ADD' button below to add one"}
      />
    </ListItem>
  );

  return (
    <>
      {sheetNumbers && (
        <>
          <div className={classes.root}>
            <List aria-label="sheet numbers">
              {sheetNumbers.length > 0 ? sheetNumberList : emptySheetNumberList}
            </List>
          </div>
          <EditSheetItemDialog
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            setIsEdited={setIsEdited}
          />
        </>
      )}
    </>
  );
};

export default SheetNumbersList;
