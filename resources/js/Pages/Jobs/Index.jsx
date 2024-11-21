import { useState } from "react";
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import { usePage, Head } from "@inertiajs/react";
// mui
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import TopTabs from "@/Components/app/jobsheet/jobPanelComponents/Tabs";
import DistrictFilterSelect from "@/Components/app/jobsheet/jobPanelComponents/DistrictFilterSelect";
import LocationFilterSelect from "@/Components/app/jobsheet/jobPanelComponents/LocationFilterSelect";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
    },
    child: {
        paddingLeft: theme.spacing(2),
    },
    filters: {
        display: "flex",
        flexFlow: "row wrap",
    },
}));

const Index = () => {
    const { groupedJobs, vehicleTypes, locations, districts } = usePage().props;

    console.log(groupedJobs);

    const [selectedDistrict, setSelectedDistrict] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState(0);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Head title="Jobs" />
            <Typography
                variant="h4"
                color="secondary"
                className={classes.child}
            >
                Select a Job
            </Typography>

            <div className={classes.filters}>
                <DistrictFilterSelect
                    districts={districts}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedDistrict={selectedDistrict}
                />
                <LocationFilterSelect
                    locations={locations}
                    setSelectedLocation={setSelectedLocation}
                    selectedLocation={selectedLocation}
                    selectedDistrict={selectedDistrict}
                />
            </div>

            <TopTabs
                vehicleTypes={vehicleTypes}
                groupedJobs={groupedJobs}
                selectedLocation={selectedLocation}
                selectedDistrict={selectedDistrict}
            />
        </div>
    );
};

// eslint-disable-next-line react/no-children-prop
Index.layout = (page) => <MaterialUiLayout children={page} />;
export default Index;
