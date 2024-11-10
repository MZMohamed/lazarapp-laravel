import React, { useState, useEffect } from 'react';

// mui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Input,
  Chip
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


//aws
import { Amplify, Auth, API, Storage } from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const useStyles = makeStyles(theme => ({
  picker: {
    margin: theme.spacing(1)

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const fetchAgents = async () => {
  const apiName = 'backendapi';
  const path = '/agents';
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
      // name: 'param'
    }
  }
  return await API.get(apiName, path, myInit)
};

const fetchDrivers = async () => {
  const apiName = 'backendapi';
  const path = '/drivers';
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
      // name: 'param'
    }
  }
  return await API.get(apiName, path, myInit)
};

const fetchVehicles = async () => {
  const apiName = 'backendapi';
  const path = '/vehicles';
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
      // name: 'param'
    }
  }
  return await API.get(apiName, path, myInit)
};

const fetchDistricts = async () => {
  const apiName = 'backendapi';
  const path = '/districts';
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
      // name: 'param'
    }
  }
  return await API.get(apiName, path, myInit)
};

const fetchLocations = async () => {
  const apiName = 'backendapi';
  const path = '/locations';
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
      // name: 'param'
    }
  }
  return await API.get(apiName, path, myInit)
};

export default function EditJob({ open, setOpen, job, setJob, jobid, jobEdited, setJobEdited }) {

  const classes = useStyles()
  const theme = useTheme();

  let random
  const [groups, setGroups] = useState(Auth.user.signInUserSession.accessToken.payload["cognito:groups"])
  const [agents, setAgents] = useState([])
  const [drivers, setDrivers] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [districts, setDistricts] = useState([])
  const [locations, setLocations] = useState([])
  const [values, setValues] = useState({
    agentId: null,
    driverId: null,
    districtId: null,
    locationId: null,
    operatorId1: null,
    operatorId2: null,
    remarks: null,
    dumpingLocation: null,
    timeOnSite: '',
    timeOffSite: '',
    vehicles: []
  });

  useEffect(() => {

    fetchAgents()
      .then(res => setAgents(res))
      .catch(err => alert('Error fetching agents: ', err))

    fetchDrivers()
      .then(res => setDrivers(res))
      .catch(err => alert('Error fetching drivers: ', err))

    fetchVehicles()
      .then(res => setVehicles(res))
      .catch(err => alert('Error fetching vehicles: ', err))

    fetchDistricts()
      .then(res => setDistricts(res))
      .catch(err => alert('Error fetching districts: ', err))


    fetchLocations()
      .then(res => setLocations(res))
      .catch(err => alert('Error fetching locations: ', err))

    // console.log(theme)


  }, [])

  useEffect(() => {
    if (!job) return;
  
    setValues((prevValues) => ({
      ...prevValues,
      agentId: job.agentId,
      driverId: job.driverId,
      vehicles: job.vehicles,
      districtId: job.districtId,
      locationId: job.locationId,
      operatorId1: job.operatorId1,
      operatorId2: job.operatorId2,
      remarks: job.remarks,
      dumpingLocation: job.dumpingLocation,
      timeOnSite: job.timeOnSite ? new Date(job.timeOnSite) : null,
      timeOffSite: job.timeOffSite ? new Date(job.timeOffSite) : null,
    }));
  }, [job, setValues]);

  const handleMultipleChipSelectChange = name => event => {
    event.preventDefault()
    const multiSelectValues = event.target.value

    const selectVehicles = multiSelectValues.map(msv => {
      const vehicle = vehicles.find(v => v.registration === msv)
      return vehicle
    })

    setValues({
      ...values,
      [name]: selectVehicles
    });
  }

  const handleSelectChange = name => event => {
    event.preventDefault()
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const handleClose = (event) => {
    event.preventDefault()
    setValues({
      ...values,
      agentId: job.agentId,
      driverId: job.driverId,
      vehicles: job.vehicles,
      districtId: job.districtId,
      locationId: job.locationId,
      operatorId1: job.operatorId1,
      operatorId2: job.operatorId2,
      remarks: job.remarks,
      dumpingLocation: job.dumpingLocation,
      timeOnSite: job.timeOnSite ? new Date(job.timeOnSite) : null,
      timeOffSite: job.timeOffSite ? new Date(job.timeOffSite) : null,
    })

    setOpen(false);
  };

  const handleEdit = () => {

    if (values.vehicles.length > 0) {
      setJob({
        ...job,
        timeOnSite: values.timeOnSite || null,
        timeOffSite: values.timeOffSite || null,
        agentId: values.agentId,
        driverId: values.driverId,
        districtId: values.districtId,
        locationId: values.locationId,
        remarks: values.remarks,
        dumpingLocation: values.dumpingLocation,
        vehicles: values.vehicles
      });
  
      setJobEdited(true)
      setOpen(false);
      
    } else {
      alert("Vehicle Error: At least one vehicle is required")
    }

  };



  const agentList = agents.map(a =>
    <MenuItem key={a.id} value={a.id} name={a.name}>
      {a.name}
    </MenuItem>
  );

  const driverList = drivers.map(d =>
    <MenuItem key={d.id} value={d.id} name={d.name}>
      {d.name}
    </MenuItem>
  )

  const vehicleList = vehicles.map(v => {

    const found = values?.vehicles?.some(el => el.id === v.id)

    const weight = found ? theme.typography.fontWeightBold : theme.typography.fontWeightLight

    return (
      <MenuItem
        key={v.registration}
        value={v.registration}
        name={v.registration}
        style={{
          fontWeight: weight
        }}
      >
        {v.registration}
      </MenuItem>

    )
  });

  const districtList = districts.map(d => (
    <MenuItem key={d.id} value={d.id} name={d.name}>
      {d.name}
    </MenuItem>
  ));

  const locationList = locations.map(l => (
    <MenuItem key={l.id} value={l.id} name={l.name}>
      {l.name}
    </MenuItem>
  ));

  const handleDateChange = name => time => {

    setValues({
      ...values, [name]: time
    })

  }

  const handleChange = e => {
    e.preventDefault()
    setValues({
      ...values, [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-job-dialog"
      >
        <DialogTitle id="edit-job-dialog-title">Edit Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form below to edit job items
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              value={values.timeOnSite}
              onChange={handleDateChange("timeOnSite")}
              name="timeOnSite"
              label="Time On Site"
              fullWidth
              className={classes.picker}
            />

            <KeyboardDateTimePicker
              value={values.timeOffSite}
              onChange={handleDateChange("timeOffSite")}
              name="timeOffSite"
              label="Time Off Site"
              fullWidth
              className={classes.picker}
            />
          </MuiPickersUtilsProvider>

          {/* Agent section start */}
          <FormControl className={classes.formControl} required fullWidth>
            <InputLabel shrink id="agent-label">
              Agent
            </InputLabel>
            <Select
              value={values.agentId}
              onChange={handleSelectChange("agentId")}
              name="agentId"
              labelId="agent-label"
              className={classes.selectEmpty}
            >
              {agentList}
            </Select>
          </FormControl>
          {/* Agent section end */}

          {/* Driver section start */}

          {!groups.includes("admin") || (
            <FormControl className={classes.formControl} required fullWidth>
              <InputLabel shrink id="driver-label">
                Driver
              </InputLabel>
              <Select
                value={values.driverId}
                onChange={handleSelectChange("driverId")}
                name="driverId"
                labelId="driver-label"
                className={classes.selectEmpty}
              >
                {driverList}
              </Select>
            </FormControl>
          )}

          {/* Driver section end */}

          {/* Vehicle start */}
          <FormControl className={classes.formControl} required fullWidth>
            <InputLabel id="multiple-chip-vehicle-label">Vehicles</InputLabel>
            <Select
              labelId="multiple-chip-vehicle-label"
              id="multiple-chip-vehicle"
              multiple
              value={values?.vehicles?.map(el => el.registration)}
              onChange={handleMultipleChipSelectChange("vehicles")}
              input={<Input id="select-multiple-vehicle" />}
              renderValue={selected => {

                console.log({ selected })

                return (
                  <div className={classes.chips}>

                    {selected.map((value) => {

                      return (

                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}

                        />
                      )
                    })}
                  </div>
                )
              }}
              MenuProps={MenuProps}
            >
              {vehicleList}
            </Select>
          </FormControl>
          {/* Vehicle end */}

          {/* District start */}
          <FormControl className={classes.formControl} required fullWidth>
            <InputLabel shrink id="district-label">
              District
            </InputLabel>
            <Select
              value={values.districtId}
              onChange={handleSelectChange("districtId")}
              className={classes.selectEmpty}
            >
              {districtList}
            </Select>
          </FormControl>
          {/* District end */}

          {/* Loacation start */}
          <FormControl className={classes.formControl} required fullWidth>
            <InputLabel shrink id="location-label">
              Loacation
            </InputLabel>
            <Select
              value={values.locationId}
              onChange={handleSelectChange("locationId")}
              className={classes.selectEmpty}
            >
              {locationList}
            </Select>
          </FormControl>
          {/* Location end */}

          {/* Dumping Location Start */}
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              id="dumpingLocation"
              label="Dumping Location"
              name='dumpingLocation'
              value={values.dumpingLocation || ''}
              onChange={handleChange}
            />
          </FormControl>
          {/* Dumping Location End */}

          {/* Remarks Start */}
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              id="remarks"
              label="Remarks"
              name='remarks'
              value={values.remarks || ''}
              onChange={handleChange}
            />
          </FormControl>
          {/* Remarks End */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
