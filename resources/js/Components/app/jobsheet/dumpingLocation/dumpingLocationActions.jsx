import React, { useState, useEffect } from "react";

import AddSheetItemDialog from "./addSheetItemDialog";
// mui
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { IconButton, Button } from "@material-ui/core";

//aws
import { Amplify, API } from "aws-amplify";
import awsconfig from "../../../aws-exports";
Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const DumpingLocationActions = ({ jobid, setIsEdited }) => {
  const classes = useStyles();

  const [addOpen, setAddOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<AddBoxIcon />}
        onClick={() => setAddOpen(true)}
      >
        Add
      </Button>
      <AddSheetItemDialog
        addOpen={addOpen}
        setAddOpen={setAddOpen}
        jobid={jobid}
        setIsEdited={setIsEdited}
      />
    </div>
  );
};

export default DumpingLocationActions;
