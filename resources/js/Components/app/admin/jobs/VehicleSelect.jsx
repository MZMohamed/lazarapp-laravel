import React, { useState, useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Input, FormHelperText} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

//aws
import { Amplify, Auth, API } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const VehiclesSelect = ({setValues, values, vehicleHelperTextState, jobCreated}) => {

  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState([]);
  const [random, setRandom] = useState(0);

  //holds operator ids to push to parent
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
      fetchVehicles()
      .then(res => {
        setVehicles(res)
      })
      .catch(err => alert('Error fetching vehicles: ', err ))
  }, [])

  useEffect(() => {
    jobCreated && setVehicles([])
  }, [jobCreated])

  const handleChange = event => {
    event.preventDefault()
    setPersonName(event.target.value);

    const ops = event.target.value

    setValues({
      ...values,
      operatorId1: ops && ops[0] ? ops[0].id : null,
      operatorId2: ops && ops[1] ? ops[1].id : null
    });

  };

  return (      
      <FormControl required error={operatorHelperTextState} className={classes.formControl}>
        <InputLabel id="mutiple-chip-label">Operators</InputLabel>
        <Select
          labelId="mutiple-chip-label"
          id="mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value.id} label={value.name} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name.id} value={name} style={getStyles(name, personName, theme)}>
              {name.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>One Required</FormHelperText>
      </FormControl>
  );
}

OperatorSelect.defaultProps = {
  operatorHelperTextState: false,
  jobCreated: false

}

export default OperatorSelect