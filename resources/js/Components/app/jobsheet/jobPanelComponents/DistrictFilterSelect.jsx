import {useState} from "react";
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
        maxWidth: "45%",
    },
}));

const DistrictFilterSelect = ({
    districts,
    setSelectedDistrict,
}) => {
    const classes = useStyles();
    const [districtName, setDistrictName] = useState("");

    const handleChange = (event) => {
        setDistrictName(event.target.value);
        setSelectedDistrict(event.target.value);
    };

    const districtList = districts.map((district) => {
        return (
            <MenuItem key={district.id} value={district.id}>
                {district.name}
            </MenuItem>
        );
    });

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                    Select District
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={districtName}
                    onChange={handleChange}
                >
                    {districtList}
                </Select>
            </FormControl>
        </div>
    );
};

DistrictFilterSelect.propTypes = {
    districts: PropTypes.array,
    setSelectedDistrict: PropTypes.any,
};

export default DistrictFilterSelect;
