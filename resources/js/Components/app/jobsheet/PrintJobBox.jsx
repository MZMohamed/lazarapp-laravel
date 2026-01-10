import React from 'react'

// mui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, List, ListItem, Divider, ListItemText } from '@material-ui/core';

//assets
import Logo from "../../../../images/LAZAR_PRIMARY_BLCK.png"

const useStyles = makeStyles(theme => ({
  root: {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',


  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  col1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  col2: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4)
  },
  col3: {
    alignItems: 'flex-start'
  },
  list: {
    color: theme.palette.text.secondary,
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
  jobNum: {
    marginTop: theme.spacing(3),
  },

}));

const PrintJobBox = ({ job }) => {

  React.useEffect(() => {
    console.log(job)
  }, [job])


  const classes = useStyles()

  const vehicleList = job?.vehicles?.map(v => 
    <ListItem key={v.id}>
      <ListItemText
        primary={v.registration}
      />
    </ListItem>
  )

  const jobSheetListItems =
    <List>
      <ListItem dense disableGutters divider className={classes.list} >
        <Typography variant="subtitle1" color="textSecondary">Driver</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle1" color="textPrimary">{job && job.driver ? job.driver.name : 'None'}</Typography>
      </ListItem>
      <ListItem dense disableGutters divider className={classes.list} >
        <Typography variant="subtitle1" color="textSecondary">District</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle1" color="textPrimary">{job && job.district ? job.district.name : 'None'}</Typography>
      </ListItem>
      <ListItem dense disableGutters divider className={classes.list} >
        <Typography variant="subtitle1" color="textSecondary">Location</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle1" color="textPrimary">{job && job.location ? job.location.name : 'None'}</Typography>
      </ListItem>
      <ListItem dense disableGutters divider className={classes.list} >
        <Typography variant="subtitle1" color="textSecondary">Operator1</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle1" color="textPrimary">{job && job.Operator1 ? job.Operator1.name : 'None'}</Typography>
      </ListItem>
      <ListItem dense disableGutters divider className={classes.list} >
        <Typography variant="subtitle1" color="textSecondary">Operator2</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle1" color="textPrimary">{job && job.Operator2 ? job.Operator2.name : 'None'}</Typography>
      </ListItem>
      <ListItem dense disableGutters divider className={classes.list} >
        <Typography variant="subtitle1" color="textSecondary">Vehicles</Typography>
        <Divider orientation="vertical" flexItem />
        <List dense>{vehicleList}</List>
      </ListItem>
    </List>


  return (
    <div style={{ width: "100%" }}>
      <Box display="none" displayPrint="block" m={1}>
        {/* main column */}
        <div className={classes.root}>
          {/* 1st row of 3 columns */}
          <div className={classes.row}>
            {/* 1st col */}
            <div className={classes.col1}>
              <img
                style={{
                  width: "50%",
                  height: "auto",
                }}
                src={Logo}
                alt="Lazar Logo"
              />
              <>
                <Typography variant="caption" color="textPrimary">LAZAR CIVIL ENGINEERING CC</Typography>
                <Typography variant="caption" color="textPrimary">7 ANFIELD ROAD, BLACKHEATH INDUSTRIA</Typography>
                <Typography variant="caption" color="textPrimary">POSTNET SUITE 92</Typography>
                <Typography variant="caption" color="textPrimary">PRIVATE BAG X4</Typography>
                <Typography variant="caption" color="textPrimary">KUILS RIVER 7579</Typography>
              </>
            </div>

            {/* 2nd col */}
            <div className={classes.col2}>
              <Typography variant="subtitle2" color="textSecondary" noWrap>
                Tel: 021 905 4734
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" noWrap>
                Fax: 086 504 5523
              </Typography>
              <Typography variant="h6" color="textPrimary" noWrap className={classes.jobNum}>
                {job && job.jobNumber ? job.jobNumber : "No Job Number"}
              </Typography>
            </div>

            {/* 3rd col */}
            <div className={classes.col3}>{jobSheetListItems}</div>
          </div>

          {/* 2nd row - remarks*/}
          <div className={classes.row} style={{ border: '1px solid black' }}>
            <Typography variant="subtitle1" color="textSecondary" style={{ paddingLeft: '8px' }}>Remarks</Typography>
            <Typography variant="subtitle1" color="textPrimary" style={{ paddingLeft: '8px' }}>{job && job.remarks}</Typography>
          </div>
        </div>
      </Box>
    </div>
  );
}

PrintJobBox.defaultProps = {
  job: {}
}

export default PrintJobBox
