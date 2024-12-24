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
    Button,
} from "@material-ui/core";

import MaterialUiLayout from "@/Layouts/MaterialUiLayout";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
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
    footerActions: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing(1)
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
    deleteButton: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.error.dark,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const UserEdit = () => {

    /**
     * user is user data
     * groups are all groups required to list all switches
     *
     * user groups are taken from user data
     *
     * component state is populated with user data
     */

    const { groups, user } = usePage().props;
    const classes = useStyles();

    const { data, setData, errors, put, processing } = useForm({
        name: user.data.name || "",
        password: "",
        email: user.data.email || "",
        isEnabled: user.data.isEnabled || true,
        groups: user.data.groups.map(g => g.id) || [],
    });

    console.log({ data, errors, groups, user });

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

    const handleSubmit = (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-undef
        put(route("users.update", user.data.id));
    };

    const handleDestroy = () => {
        if (confirm("Are you sure you want to delete this user")) {
            // eslint-disable-next-line no-undef
            router.delete(route("users.destroy", user.data.id));
        }
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

    const handleEnabledSwitchChange = () => {
        setData("isEnabled", !data.isEnabled);
    };

    return (
        <div className={classes.root}>
            <Head title="Edit User" />
            <Typography variant="h5" color="secondary">
                Edit User
            </Typography>
            <form
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
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
                        <FormHelperText error={errors.isEnabled}>
                            {errors.isEnabled || ""}
                        </FormHelperText>
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
                        <FormHelperText error={errors.groups}>
                            {errors.groups || ""}
                        </FormHelperText>
                    </FormControl>
                    <input
                        type="submit"
                        value="Update User"
                        disabled={processing}
                        className={classes.submitButton}
                    />
                </CreateJobFormContainer>
            </form>
            <div className={classes.footerActions}>
                <Link
                    className="btn-indigo focus:outline-none"
                    // eslint-disable-next-line no-undef
                    href={route("users.index")}
                >
                    Back
                </Link>
                <Button
                    variant="contained"
                    className={classes.deleteButton}
                    onClick={handleDestroy}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

// eslint-disable-next-line react/no-children-prop
UserEdit.layout = (page) => <MaterialUiLayout children={page} />;

export default UserEdit;
