import React from 'react';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';


export default function DialogSelect({open, handleClose, handleSubmit, groups, setGroups}) {

  const handleChange = event => {
    setGroups({ ...groups, [event.target.value]: event.target.checked });
  };

  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Select Groups</DialogTitle>
      <DialogContent>
        <FormGroup>
          {/* Admin */}
          <FormControlLabel
            control={
              <Switch
                checked={groups.admin}
                onChange={handleChange}
                value="admin"
                color="secondary"
              />
            }
            label="Admin"
          />

          {/* Driver */}
          <FormControlLabel
            control={
              <Switch
                checked={groups.driver}
                onChange={handleChange}
                value="driver"
                color="secondary"
              />
            }
            label="Driver"
          />

          {/* Client */}
          <FormControlLabel
            control={
              <Switch
                checked={groups.client}
                onChange={handleChange}
                value="client"
                color="secondary"
              />
            }
            label="Client"
          />
        </FormGroup>
        <Typography variant="caption">
          Please note: Users should logout and back in again for changes to take
          effect
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
