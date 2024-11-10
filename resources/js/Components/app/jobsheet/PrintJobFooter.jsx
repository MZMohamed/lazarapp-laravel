import React from 'react'

// mui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, List, ListItem, Divider } from '@material-ui/core';

//date 
import { format, differenceInMinutes, differenceInHours } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    '& > *':  {
        margin: theme.spacing(1)
      }
  },
  colItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    '& > *':  {
        marginRight: theme.spacing(1)
      }
  },
}));

const PrintJobFooter = ({job}) => {

    const classes = useStyles()

    const col1 = 
        <>
            <div className={classes.colItem}>
                <Typography variant="subtitle1" color="textSecondary">Time on Site</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" color="textPrimary" style={{textDecoration: 'underline'}}>{job && job.timeOnSite ? format(new Date(job.timeOnSite), 'HH:MM') : 'None'}</Typography>
            </div>
            <div className={classes.colItem}>
                <Typography variant="subtitle1" color="textSecondary">Site Agent</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" color="textPrimary" style={{textDecoration: 'underline'}}>{job && job.agent ? job.agent.name : 'None'}</Typography>
            </div>
        </>

    const col2 = 
        <>
            <div className={classes.colItem}>
                <Typography variant="subtitle1" color="textSecondary">Time off Site</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" color="textPrimary" style={{textDecoration: 'underline'}}>{job && job.timeOffSite ? format(new Date(job.timeOffSite), 'HH:MM')  : 'None'}</Typography>
            </div>
            <div className={classes.colItem}>
                <Typography variant="subtitle1" color="textSecondary">Signature</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" color="textPrimary" style={{textDecoration: 'underline'}}>{ }</Typography>
            </div>
        </>

    const col3 = 
        <>
            <div className={classes.colItem}>
                <Typography variant="subtitle1" color="textSecondary">Date</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography 
                    variant="subtitle1" 
                    color="textPrimary" 
                    style={{textDecoration: 'underline'}}
                >
                    {
                        job && job.timeOnSite && 
                        format(new Date(job.timeOnSite), 'dd/LL/yyyy') 
                    }
                </Typography>
            </div>
            <div className={classes.colItem}>
                <Typography variant="subtitle1" color="textSecondary">Hours</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1" color="textPrimary" style={{textDecoration: 'underline'}}>{ `
                    ${differenceInHours(new Date(job.timeOffSite), new Date(job.timeOnSite)) }h:${differenceInMinutes(new Date(job.timeOffSite), new Date(job.timeOnSite)) % 60 }`}
                </Typography>
            </div>
        </>



    return (
        <div style={{ width: "100%",  }}>
            <Box display="none" displayPrint="block" m={1}>
                {/* root row */}
                <div className={classes.root}>


                    {/* col1 */}
                    <div className={classes.col}>
                        {col1}
                    </div>


                    {/* col2 */}
                    <div className={classes.col}>
                        {col2}
                    </div>


                    {/* col3 */}
                    <div className={classes.col}>
                        {col3}
                    </div>
                
                </div>
            </Box>
        </div>
    )
}

PrintJobFooter.defaultProps = { 
    job: {   }
   }
  

export default PrintJobFooter
