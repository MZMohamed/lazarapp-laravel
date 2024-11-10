import React from 'react'

//mui
// import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'flex-start',
      
      marginBottom: theme.spacing(2)
  
    },
    itemLabelLeft: {
      display: 'flex',
      width: '30%',
      justifyContent: 'flex-end',
      paddingRight: theme.spacing(1),

      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis' // This is where the magic happens
     
    },
    itemLabelRight: {
      display: 'flex',
      width: '70%',
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(1)
     
    }
  }));

const UserDetailItem = (props) => {

  const classes = useStyles();

  return (
      <div className={classes.root}>
        <div className={classes.itemLabelLeft}>
          {props.children[0]}
        </div>
        <div className={classes.itemLabelRight}>
          {props.children[1]}
        </div>
          
      </div>
  )
}

export default UserDetailItem