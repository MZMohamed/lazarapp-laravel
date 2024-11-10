import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column'
  }
}));

const CreateJobFormContainer = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

export default CreateJobFormContainer
