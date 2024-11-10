import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import {
//   Accordion,
//   AccordionSummary,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemSecondaryAction,
//   ListItemText,
//   Tooltip,
//   Typography,
// } from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import WorkIcon from "@material-ui/icons/Work";
// import DeleteIcon from "@material-ui/icons/Delete";
// import PictureAsPdfSharpIcon from "@material-ui/icons/PictureAsPdfSharp";
// import PhotoLibraryTwoToneIcon from "@material-ui/icons/PhotoLibraryTwoTone";
import { BottomNav } from "./jobPanelComponents/bottomNav";

//router
import { Link as RouterLink, useHistory } from "react-router-dom";

//aws
import { Auth, Storage } from "aws-amplify";
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

import { JobPanelContextProvider } from "../../stores/jobPanelContext";

import { DistrictTabs, Locations } from "./jobPanelComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  locationPanel: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  listPanel: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const JobPanel = ({
  jobs,
  setJobs,
  districts,
  locations,
  images,
  pdfs,
  deleteJob,
  deleteJobDetail,
  deletePdfs,
}) => {
  const classes = useStyles();

  console.log({jobs, districts, locations});

  const history = useHistory();

  const handleClick = (id) => (event) => {
    event.preventDefault();
    history.push(`/${groups[0]}/job/${id}`);
  };

  const [groups, setGroups] = useState(
    Auth.user.signInUserSession.accessToken.payload["cognito:groups"]
  );

  return (
    <JobPanelContextProvider>
      <div className={classes.root}>
        <DistrictTabs jobs={jobs} districts={districts} locations={locations}/>
      </div>
      <BottomNav />
    </JobPanelContextProvider>
  );
};

export default JobPanel;
