import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

//aws
import { Amplify, Auth, API, Storage } from "aws-amplify";
import awsconfig from "../../../aws-exports";
Amplify.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const deleteDocFromDb = async (id) => {
  const apiName = "backendapi";
  const path = `/documentuploads`;
  const myInit = {
    // OPTIONAL
    body: { id: id }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  await API.del(apiName, path, myInit);
};

const fetchDocuments = async (jobid) => {
  const apiName = "backendapi";
  const path = `/documentuploads/${jobid}`;
  const myInit = {
    // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      // OPTIONAL
      // name: 'param'
    },
  };
  return await API.get(apiName, path, myInit);
};

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.addEventListener("click", clickHandler, false);
  a.click();
  return a;
}

const DocumentList = ({ jobid, documents, setDocuments, isUpdated, setIsUpdated }) => {
  const classes = useStyles();
  const [groups, setGroups] = useState(
    Auth.user.signInUserSession.accessToken.payload["cognito:groups"]
  );

  useEffect(() => {
    jobid && 
      fetchDocuments(jobid)
        .then((res) => {
          setDocuments(res);
          isUpdated && setIsUpdated(false)
        })
        .catch((err) => alert(`Error fetching documents: ${err}`));
  }, [jobid, isUpdated]);

  const handleRowDelete = (doc) => (event) => {
    Storage.remove(doc.key)
      .then(() =>
        deleteDocFromDb(doc.id)
          .then(() => {
            jobid &&
              fetchDocuments(jobid)
                .then((res) => {
                  setDocuments(res);
                })
                .then(() => alert("Document Deleted"))
                .catch((err) => alert(`Error fetching documents: ${err}`));
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  };

  const docList = documents.map((doc) => {

    const documentName =
      doc.key.length > 0 ? doc.key.split("/")[2] : "No Document";

    return (
      <ListItem key={doc.id} button>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText
          primary={documentName}

          // download document on click
          onClick={ async () =>
            await Storage.get(doc.key, { download: true })
              .then((res) => downloadBlob(res.Body, documentName))
              .catch((err) => alert(`Could not download: ${err}`))
          }
        />
        {groups && !groups.includes("client") && (
          <IconButton onClick={handleRowDelete(doc)}>
            <DeleteIcon color="action" />
          </IconButton>
        )}
      </ListItem>
    );
  });

  const emptyDocList = (
    <ListItem>
      <ListItemIcon>
        <CancelPresentationIcon />
      </ListItemIcon>
      <ListItemText
        primary={"No Documents"}
        secondary={"Click the ADD button to add a document"}
      />
    </ListItem>
  );

  return (
    <>
      {documents && (

        <div className={classes.root}>
          <List aria-label="documents">
            {documents.length > 0 ? docList : emptyDocList}
          </List>
        </div>
      )}
    </>
  );
};

export default DocumentList;
