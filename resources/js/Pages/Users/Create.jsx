import { usePage, Head, Link, useForm } from "@inertiajs/react";

// components
import CreateJobFormContainer from "@/Components/app/admin/jobs/CreateJobFormContainer";

//mui
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Typography,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Switch,
} from "@material-ui/core";

import MaterialUiLayout from "@/Layouts/MaterialUiLayout";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200,
        },
        "& .MuiFormControl-root": {
            margin: theme.spacing(1),
            width: 200,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: 200,
    },
    submitButton: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1, 4),
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        borderRadius: "4px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));

const UserCreate = () => {
    const { groups } = usePage().props;
    const classes = useStyles();

    const { data, setData, errors, post, processing } = useForm({
        name: "",
        password: "",
        phone: "",
        email: "",
        isEnabled: true,
        groups: [],
    });

    console.log({ data, errors });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleGroupSwitchChange = (event) => {
        const groupId = parseInt(event.target.value, 10); // Get the group ID from the switch value
        const isGroupChecked = event.target.checked; // Get the new checked state

        // Update the specific group in the data.groups array

        if (isGroupChecked && !data.groups.includes(groupId)) {
            setData("groups", [...data.groups, groupId]);
        } else if (!isGroupChecked && data.groups.includes(groupId)) {
            setData(
                "groups",
                data.groups.filter((id) => id !== groupId)
            );
        }
    };

    const handleEnabledSwitchChange = () => {
        setData("isEnabled", !data.isEnabled);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/users", data);
    };

    const groupSwitchList = groups.map((group) => {
        return (
            <FormControlLabel
                key={group.id}
                control={
                    <Switch
                        value={group.id}
                        checked={data.groups.includes(group.id)}
                        onChange={handleGroupSwitchChange}
                        name={group.name}
                    />
                }
                label={group.name}
            />
        );
    });

    return (
        <>
            <Head title="Create User" />
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h5" color="secondary">
                    Create User
                </Typography>
                <Link
                    className="btn-indigo focus:outline-none"
                    // eslint-disable-next-line no-undef
                    href={route("users.index")}
                >
                    Back
                </Link>
                <CreateJobFormContainer>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Enable/Disable User
                        </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.isEnabled}
                                        onChange={handleEnabledSwitchChange}
                                        name="isEnabled"
                                    />
                                }
                                label="Enabled"
                            />
                        </FormGroup>
                        <FormHelperText error={errors.isEnabled}>{errors.isEnabled || ""}</FormHelperText>
                    </FormControl>
                    <TextField
                        required
                        name="name"
                        id="name"
                        label="Name"
                        variant="outlined"
                        onChange={handleChange}
                        value={data.name}
                        helperText={errors.name || ""}
                        error={errors.name}
                    />
                    <TextField
                        required
                        name="password"
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={handleChange}
                        value={data.password}
                        helperText={errors.password || ""}
                        error={errors.password}
                    />
                    <TextField
                        name="email"
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        onChange={handleChange}
                        value={data.email}
                        helperText={errors.email || ""}
                        error={errors.email}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Add to group</FormLabel>
                        <FormGroup>{groupSwitchList}</FormGroup>
                        <FormHelperText error={errors.groups}>{errors.groups || ""}</FormHelperText>
                    </FormControl>
                    <input
                        type="submit"
                        value="Create User"
                        disabled={processing}
                        className={classes.submitButton}
                    />
                </CreateJobFormContainer>
            </form>
        </>
    );
};

// eslint-disable-next-line react/no-children-prop
UserCreate.layout = (page) => <MaterialUiLayout children={page} />;

export default UserCreate;
