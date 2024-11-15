import React, {useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { ConcreteTruckIcon } from "./icons";

// import vehicleTypes from "../../../../utils/vehicleTypes.json";

// context
// import JobPanelContext from '../../../../stores/jobPanelContext'

const vehicleTypes = [
    {
      "id": 1,
      "name": "Bucket Machine"
    },
    {
      "id": 2,
      "name": "Pump"

    },
    {
      "id": 3,
      "name": "Truck"
    }
  ]



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: theme.palette.background.paper
    // height: '96px',
  },
  action: {
    transition: "0.3s",
    "&$selected": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main
    },
  },
  selected: {},
}));

export default function BottomNav() {

  const classes = useStyles();
//   const { bottomNavValue, setBottomNavValue } = useContext(JobPanelContext)

//   const handleChange = (event, newValue) => {
//     setBottomNavValue(newValue);
//   };

  const vehicleTypesList = vehicleTypes.map((el) => {
    const { id, name } = el;

    return (
      <BottomNavigationAction
        key={id}
        id={id}
        label={name}
        value={el}
        icon={<ConcreteTruckIcon />}
        classes={{
          root: classes.action,
          selected: classes.selected
        }}
      />
    );
  });

  return (
    <BottomNavigation
    //   value={bottomNavValue}
    //   onChange={handleChange}
      showLabels
      className={classes.root}
    >
      {vehicleTypesList}
    </BottomNavigation>
  );
}
