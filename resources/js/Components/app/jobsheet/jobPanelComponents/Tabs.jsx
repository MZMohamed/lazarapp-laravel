import { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Box, Tab, Tabs, AppBar } from "@material-ui/core";


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
    flexGrow: 1,
    width: '100%',
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

const TopTabs = ({ jobs, vehicleTypes }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  // const [locationsEnabled, setLocationsEnabled] = useState(false);
//   const { bottomNavValue } = useContext(JobPanelContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const vehicleTypeTabList = vehicleTypes.map((el) => {
    const { id, name } = el;

    return (
      <Tab
        // disabled={jobsInDistrict.length < 1}
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

//   jobsList = jobs.map(job => (

//   ))


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
          {vehicleTypeTabList}
        </Tabs>
      </AppBar>
      <div className={classes.childView}>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div>slide n°1</div>
          <div>slide n°2</div>
          <div>slide n°3</div>
        </SwipeableViews>
      </div>
    </div>
  );
}

TopTabs.propTypes = {
    jobs: PropTypes.array,
    vehicleTypes: PropTypes.array,

}

export default TopTabs
