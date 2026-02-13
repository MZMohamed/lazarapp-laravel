import React, { useEffect, useState } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

//components
import DocumentActions from "./DocumentActions";
import DocumentList from "./DocumentList";

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
}));

const Index = ({ job }) => {
  const classes = useStyles();

  const [isUpdated, setIsUpdated] = useState(false)

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="secondary">
        Documents
      </Typography>
      <DocumentList job={job} />
      <DocumentActions jobid={job.id} jobNumber={job.jobNumber} setIsUpdated={setIsUpdated}/>
    </div>
  );
};

export default Index;
