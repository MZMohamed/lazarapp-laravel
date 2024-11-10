import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Paper, useTheme } from "@material-ui/core";

import CardContainer from "./cardContainer";
import { colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: theme.spacing(3),
    // margin: theme.spacing(2),
    flexWrap: "nowrap",
  },
  cardsRoot: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "start",
    gap: theme.spacing(2),
  },
  jobsRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
  },
  cardRoot: {},
}));

const CollectionContainer = ({ collection, disabled, jobs }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [toggledState, setToggledState] = useState(
    collection.map((el) => {
      return { id: el.id, toggled: false };
    })
  );

  if (disabled) {
    return (
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" color="secondary">
          {"Selected equipment is not used in this district."}
        </Typography>
      </Paper>
    );
  }

  const handleClick = (clickedItem) => (ev) => {
    const tempCollection = collection.map((el) => {
      if (el.id === clickedItem && !el.toggled) {
        el.toggled = true;
      } else {
        el.toggled = false;
      }
      return el;
    });

    setToggledState([...tempCollection]);
  };

  const jobHandleClick = (clickedItem) => (ev) => {};

  const jobCollectionList = jobs.map((item, i) => {
    return (
      <Card key={item.id}>
        {/* <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {item.jobNumber}
          </Typography>
        </CardContent> */}
        <CardActions>
          <Button size="small" href={`/admin/job/${item.id}`}>
            {item.jobNumber}
          </Button>
        </CardActions>
      </Card>
    );
  });

  const collectionList = collection.map((item, i) => {
    return (
      <CardContainer
        key={item.id}
        item={item}
        index={i}
        handleClick={handleClick}
        toggledState={toggledState}
      ></CardContainer>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.cardsRoot}>{collectionList}</div>

      <div className={classes.jobsRoot}>
        <Typography color="secondary" variant="h4">
          Jobs
        </Typography>
        <div className={classes.cardsRoot}>{jobCollectionList}</div>
      </div>
    </div>
  );
};

export default CollectionContainer;
