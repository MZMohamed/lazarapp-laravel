import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 150,
    maxWidth: 345,
    transition: "0.5s",
    borderRadius: "16px",
  },
  cardContent: {
    textAlign: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const CardContainer = ({
  item,
  toggledState,
  handleClick,
  index,
  itemType,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      className={classes.card}
      onClick={handleClick(item.id)}
      elevation={toggledState[index].toggled ? 24 : 1}
      // raised={toggledState[index].toggled}
      style={{
        backgroundColor: `${
          toggledState[index].toggled
            ? theme.palette.secondary.main
            : theme.palette.background.default
        }`,
      }}
    >
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.title}
          color="textPrimary"
          gutterBottom
          variant="button"
        >
          {item.name}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default CardContainer;
