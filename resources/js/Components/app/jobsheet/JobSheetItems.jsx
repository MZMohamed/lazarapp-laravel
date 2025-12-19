import React, { useState, useEffect } from "react";

import "../../print.css";

// mui
import { makeStyles, styled } from "@material-ui/core/styles";
import { Paper, Button, Typography, Chip, CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";


//date-fns
import { format } from "date-fns";

//components
import EditJob from "./EditJob";
import JobSheetListItem from "./JobSheetListItem";
import PrintJobBox from "./PrintJobBox";
import DocumentUpload from "./document/DocumentUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    // maxWidth: 650,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",

    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const fetchJob = async (jobid) => {
  const apiName = "backendapi";
  const path = `/jobs/job/${jobid}`;
  const myInit = {
    // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      // OPTIONAL
      // name: 'param'
    },
  };
  return await API.get(apiName, path, myInit);
};

const updateJob = async (job, jobid) => {
  const apiName = "backendapi";
  const path = `/jobs/${jobid}`;
  const myInit = {
    // OPTIONAL
    body: { ...job }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  // console.log(myInit)

  return await API.put(apiName, path, myInit);
};

const JobSheetItems = ({
  jobid,
  setAdminApproved,
  setJobNumber,
  job,
  setJob,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [jobEdited, setJobEdited] = useState(false);
  const [fetchingJob, setFetchingJob] = useState(true);
  const [groups, setGroups] = useState(
    Auth.user.signInUserSession.accessToken.payload["cognito:groups"]
  );

  useEffect(() => {
  if (jobEdited) {
    updateJob(
      {
        timeOnSite: job.timeOnSite || null,
        timeOffSite: job.timeOffSite || null,
        agentId: job.agentId || null,
        driverId: job.driverId || null,
        vehicles: job.vehicles || null,
        districtId: job.districtId || null,
        locationId: job.locationId || null,
        remarks: job.remarks || null,
        dumpingLocation: job.dumpingLocation || null,
      },
      jobid
    )
      .then((rowsUpdated) => {
        fetchJob(jobid).then((j) => {
          if (j && Object.entries(j).length > 0) {
            setJob(j);
            alert("Job Changed");
          }
        });
      })
      .catch(() => alert("Unable to edit job"));

    setJobEdited(false);
  }
}, [jobEdited, job, jobid, updateJob, fetchJob, setJob]);

  const handleApprove = (approveType) => {
    updateJob(
      {
        [approveType]: 1,
      },
      jobid
    )
      .then((res) => {
        res &&
          res[0] === 1 &&
          setJob({
            ...job,
            [approveType]: 1,
          });

        approveType === "adminApproved" && setAdminApproved(true);
      })
      .catch(() => alert("Unable to edit job"));
  };

  useEffect(() => {

    jobid &&
      jobid !== -1 &&
      fetchJob(jobid).then((j) => {

        j && Object.entries(j).length > 0 && setJob(j);
      });
  }, [jobid]);

  useEffect(() => {
    console.log(job)

    job && job.adminApproved && setAdminApproved(job.adminApproved);

    job && setJobNumber(job.jobNumber);

    job && !job.deletedAt  && setFetchingJob(false)
  }, [job]);

  // format(new Date(2014, 1, 11), 'MM/dd/yyyy')
  //=> '02/11/2014'

  // format(new Date(), "'Today is a' iiii")
  //=> "Today is a Wednesday"

  //https://date-fns.org/v2.10.0/docs/format

  const labelDetailList = (
    <>
      <JobSheetListItem>
        <Typography variant="h6">Job Number</Typography>
        <Typography variant="h6">
          {job && job.jobNumber ? job.jobNumber : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Driver</Typography>
        <Typography variant="h6">
          {job && job.driver ? job.driver.name : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Operator 1</Typography>
        <Typography variant="h6">
          {job && job.Operator1 ? job.Operator1.name : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Operator 2</Typography>
        <Typography variant="h6">
          {job && job.Operator2 ? job.Operator2.name : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Time On Site</Typography>
        <Typography variant="h6">
          {job && job.timeOnSite
            ? format(new Date(job.timeOnSite), "PPPP p")
            : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Hours Worked</Typography>
        <Typography variant="h6">
          {job && job.hoursWorked ? job.hoursWorked : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Vehicles</Typography>
        {job && job.vehicles && job.vehicles.length > 0 ?
          <ul style={{ listStyleType: "none" }}>
            {job.vehicles
              .map(
                jv =>
                  <ListItem key={jv.id}>
                    <Chip
                      label={jv.registration}
                    />
                  </ListItem>
              )}
          </ul> : "none"}
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">District</Typography>
        <Typography variant="h6">
          {job && job.district ? job.district.name : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Location</Typography>
        <Typography variant="h6">
          {job && job.location ? job.location.name : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Agent</Typography>
        <Typography variant="h6">
          {job && job.agent ? job.agent.name : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Status</Typography>
        <Typography variant="h6">
          {job && job.agentApproved
            ? "Agent Approved"
            : job && job.adminApproved
              ? "Admin Approved"
              : job && job.driverApproved
                ? "Driver Approved"
                : "Open"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Time Off Site</Typography>
        <Typography variant="h6">
          {job && job.timeOffSite
            ? format(new Date(job.timeOffSite), "PPPP p")
            : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Dumping Location</Typography>
        <Typography variant="h6">
          {job && job.dumpingLocation ? job.dumpingLocation : "none"}
        </Typography>
      </JobSheetListItem>

      <JobSheetListItem>
        <Typography variant="h6">Remarks</Typography>
        <Typography variant="h6">
          {job && job.remarks ? job.remarks : "none"}
        </Typography>
      </JobSheetListItem>
    </>
  );

  useEffect(() => {
    console.log(fetchingJob)

  }, [fetchingJob])


  if (fetchingJob) {
    return (
      <>
        <Typography color="secondary" variant="h6">Loading ...</Typography>
        <CircularProgress color="secondary" />
      </>
    )
  }
  else return (
    <div className={classes.root}>
      <EditJob
        open={open}
        setOpen={setOpen}
        job={job}
        setJob={setJob}
        jobid={jobid}
        jobEdited={jobEdited}
        setJobEdited={setJobEdited}
      />
      <div className="noPrint">
        <Paper className={classes.paper}>
          {job && Object.entries(job).length > 0 && labelDetailList}
        </Paper>
      </div>

      <div className="noPrint">
        <div className={classes.buttons}>


          {groups &&
            job &&
            Object.entries(job).length > 0 &&
            (groups.includes("admin") || groups.includes("driver")) &&
            job.driverApproved !== 1 &&
            job.agentApproved !== 1 ? (
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => setOpen(true)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          ) : null}

          {/* Approve button logic */}
          {
            // none approved and user is admin
            // if clicked then approve the driver setting as well
            job &&
              job.driverApproved === null &&
              job.adminApproved === null &&
              job.agentApproved === null &&
              groups &&
              groups.includes("admin") ? (
              <Button
                className={classes.button}
                startIcon={<ThumbUpIcon />}
                variant="contained"
                color="secondary"
                onClick={() => handleApprove("adminApproved")}
              >
                Approve
              </Button>
            ) : //none approved and user is driver
              job &&
                job.driverApproved === null &&
                job.adminApproved === null &&
                job.agentApproved === null &&
                groups &&
                groups.includes("driver") ? (
                <Button
                  className={classes.button}
                  startIcon={<ThumbUpIcon />}
                  variant="contained"
                  color="secondary"
                  onClick={() => handleApprove("driverApproved")}
                >
                  Approve
                </Button>
              ) : //none approved and user is client

                //driver approved and user is admin
                job &&
                  job.driverApproved === 1 &&
                  job.adminApproved === null &&
                  job.agentApproved === null &&
                  groups &&
                  groups.includes("admin") ? (
                  <Button
                    className={classes.button}
                    startIcon={<ThumbUpIcon />}
                    variant="contained"
                    color="secondary"
                    onClick={() => handleApprove("adminApproved")}
                  >
                    Approve
                  </Button>
                ) : //driver approved and user is driver

                  //driver approved and user is client

                  //admin approved and user is admin

                  //admin approved and user is driver

                  //admin approved and user is client
                  job &&
                    job.adminApproved === 1 &&
                    job.agentApproved === null &&
                    groups &&
                    groups.includes("client") ? (
                    <Button
                      className={classes.button}
                      startIcon={<ThumbUpIcon />}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleApprove("agentApproved")}
                    >
                      Approve
                    </Button>
                  ) : //client approved and user is client

                    // end
                    null
          }
        </div>
      </div>
      <PrintJobBox job={job} />
    </div>
  );
};

JobSheetItems.defaultProps = {
  jobid: -1,
};

export default JobSheetItems;
