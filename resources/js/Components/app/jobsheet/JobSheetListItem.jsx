import React from 'react'

// mui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
  
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',

    //   '& > *': {
    //     margin: theme.spacing(1),
    //   },
    },
    left: {
        display: 'flex',
      width: '30%',
      justifyContent: 'flex-end',
      paddingRight: theme.spacing(1),

      whiteSpace: 'nowrap',
    //   overflow: 'hidden',
    //   textOverflow: 'ellipsis' // This is where the magic happens


    },
    right: {
        display: 'flex',
      width: '70%',
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(1)

    },
  }));

const JobSheetListItem = (props) => {

    const classes= useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                {props.children[0]}
            </div>
            <div className={classes.right}>
                {props.children[1]}
            </div>
        </div>)

}

export default JobSheetListItem
