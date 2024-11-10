import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LocationSection = ({ dumpingLocation }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List aria-label="sheet numbers">
        <ListItem>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText 
            primary={`Location: ${dumpingLocation || "none"}`}
            secondary={`Click the EDIT button above to set or update the location`}
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default LocationSection;
