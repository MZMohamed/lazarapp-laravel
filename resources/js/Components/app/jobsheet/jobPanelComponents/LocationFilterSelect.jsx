import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 200,
        maxWidth: "40%",
    },
}));

const LocationFilterSelect = ({
    locations,
    selectedLocation,
    setSelectedLocation,
    selectedDistrict,
}) => {
    const classes = useStyles();
    const [locationName, setLocationName] = React.useState("");

    const handleChange = (event) => {
        setLocationName(event.target.value);
        setSelectedLocation(event.target.value)
    };

    const locationList = locations
        .filter(
            (location) =>
                selectedDistrict === 0 ||
                location.district.id === selectedDistrict
        )
        .map((location) => {

            return (
                <MenuItem key={location.id} value={location.name}>
                    {location.name}
                </MenuItem>
            );
        });

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                    Select Location
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={locationName}
                    onChange={handleChange}
                >
                    {locationList}
                </Select>
            </FormControl>
            {location.district_id}
        </div>
    );
};

LocationFilterSelect.propTypes = {
    locations: PropTypes.array,
    selectedLocation: PropTypes.number,
    setSelectedLocation: PropTypes.any,
    selectedDistrict: PropTypes.number,
};

export default LocationFilterSelect;
