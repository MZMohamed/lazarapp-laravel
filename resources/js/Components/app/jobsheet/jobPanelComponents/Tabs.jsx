import { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Typography,
    Box,
    Tab,
    Tabs,
    AppBar,
    Card,
    CardActions,
    CardContent,
    // Button,
    Grid,
} from "@material-ui/core";
import { Link } from "@inertiajs/react";

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
        width: "100%",
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
    jobCardsRoot: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "start",
        gap: theme.spacing(2),
    },
    card: {
        margin: theme.spacing(2),
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: theme.shadows[5],
        },
    },
    title: {
        fontSize: 18,
        fontWeight: 600,
    },
    info: {
        marginTop: theme.spacing(1),
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    actions: {
        justifyContent: "space-between",
    },
    linkButton: {
        backgroundColor: theme.palette.secondary.main,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

        borderRadius: theme.spacing(1)

    }
}));

const TopTabs = ({ groupedJobs, vehicleTypes, selectedLocation, selectedDistrict }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);

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

    // console.log({groupedJobs},{selectedDistrict}, {selectedLocation});

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
                    // className={classes.swipeableContainer}
                >
                    {groupedJobs.original.map((vehicleType) => {
                        return (
                            <Grid
                                key={vehicleType.id}
                                container spacing={3}
                            >
                                {vehicleType.jobs

                                .filter(job => job.district_id === selectedDistrict || selectedDistrict === 0)
                                .filter(job => job.location_id === selectedLocation || selectedLocation === 0)
                                .map((job) => {
                                    return (
                                        <Card
                                            key={job.id}
                                            className={classes.card}
                                        >
                                            <CardContent>
                                                <Typography
                                                    className={classes.title}
                                                    color="textPrimary"
                                                    gutterBottom
                                                >
                                                    Job #{job.jobNumber}
                                                </Typography>
                                                <Typography
                                                    className={classes.info}
                                                >
                                                    Hours Worked:{" "}
                                                    {job.hoursWorked || "N/A"}
                                                </Typography>
                                                <Typography
                                                    className={classes.info}
                                                >
                                                    Driver:{" "}
                                                    {job.driver?.name ||
                                                        "No driver assigned"}
                                                </Typography>
                                                <Typography
                                                    className={classes.info}
                                                >
                                                    Remarks:{" "}
                                                    {job.remarks ||
                                                        "No remarks"}
                                                </Typography>
                                            </CardContent>
                                            <CardActions
                                                className={classes.actions}
                                            >
                                                <Link
                                                    className={classes.linkButton}
                                                    // eslint-disable-next-line no-undef
                                                    href={route('jobs.show', [job.id])}
                                                    color="secondary"
                                                    underline="hover"
                                                >
                                                    View Details
                                                </Link>
                                                {/* <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Take Action
                                                </Button> */}
                                            </CardActions>
                                        </Card>
                                    );
                                })}
                            </Grid>
                        );
                    })}
                </SwipeableViews>
            </div>
        </div>
    );
};

TopTabs.propTypes = {
    groupedJobs: PropTypes.object,
    vehicleTypes: PropTypes.array,
    selectedLocation: PropTypes.number,
    selectedDistrict: PropTypes.number,
};

export default TopTabs;
