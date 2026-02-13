import React, { useState, useEffect } from "react";
// mui
import { makeStyles } from "@material-ui/core/styles";

//components
import DocumentUpload from "./DocumentUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    // maxWidth: 650,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",

    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const DocumentActions = ({job, setIsUpdated}) => {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);

  {
    /* Document Upload button logic */
  }
  const addButton = (groups.includes("admin") || groups.includes("driver")) && (
    <DocumentUpload
      className={classes.button}
      jobNumber={job.jobNumber}
      jobid={job.id}
      setIsUpdated={setIsUpdated}
    />
  );

  return <div>{addButton}</div>;
};

export default DocumentActions;
