import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Box, Tab, Tabs, AppBar } from "@material-ui/core";
import CollectionContainer from "../collectionContainer";

// import vehicleTypes from "../../../../utils/vehicleTypes.json";

// context
import JobPanelContext from "../../../../stores/jobPanelContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    overflowX: "clip",
  },
  childView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: theme.spacing(1),
    margin: theme.spacing(2),
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TopTabs({ jobs, districts, locations }) {
  const classes = useStyles();
  const theme = useTheme();

  // console.log(jobs);

  const [value, setValue] = useState(0);
  // const [locationsEnabled, setLocationsEnabled] = useState(false);
  const { bottomNavValue } = useContext(JobPanelContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const districtTabList = districts.map((el) => {
    const { id, name } = el;

    // vehichles is an array and must be filtered as well

    const jobsInDistrict = jobs.filter((jd) => {
      const vehicleIds = [...new Set(jd.vehicles.map((v) => v.vehicleTypeId))];

      return jd.districtId === id && vehicleIds.includes(bottomNavValue.id);
    });

    // console.log(jobsInDistrict);

    return (
      <Tab
        disabled={jobsInDistrict.length < 1}
        key={id}
        label={
          <Typography variant="button" noWrap>
            {name}
          </Typography>
        }
        {...a11yProps(id)}
      />
    );
  });

  const tabPanelList = districts.map((el, i) => {
    const { id, name } = el;

    /**
     * The idea here is to
     * 1) get locations according the district
     * 2) get locations according the vehicle type
     * 3) create a new array based on the intersection of these 2 arrays
     * using the filter and includes array methods
     */

    // get locations according the district
    const locationDistricts = locations.filter((fl) => {
      return fl.districtid === id;
    });

    // get jobs length to check if panel is disabled
    const jobsInDistrict = jobs.filter((jd) => {
      const vehicleIds = [...new Set(jd.vehicles.map((v) => v.vehicleTypeId))];

      return jd.districtId === id && vehicleIds.includes(bottomNavValue.id);
    });

    // create components from data
    return (
      <TabPanel key={i} value={i} index={i} dir={theme.direction}>
        <CollectionContainer
          collection={locationDistricts}
          disabled={jobsInDistrict.length < 1}
          jobs={jobsInDistrict}
        />
      </TabPanel>
    );
  });

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          // scrollButtons="auto"
          aria-label="district tabs"
          className={classes.tabs}
        >
          {districtTabList}
        </Tabs>
      </AppBar>
      <div className={classes.childView}>
        <Typography color="secondary" variant="h4">
          Locations
        </Typography>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabPanelList}
        </SwipeableViews>
      </div>
    </div>
  );
}
