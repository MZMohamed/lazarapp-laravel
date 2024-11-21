import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import { usePage, Head, useForm, Link } from "@inertiajs/react";
//mui
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

// components
import CreateJobFormContainer from "@/Components/app/admin/jobs/CreateJobFormContainer";

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
    deleteButton: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.error.dark,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));
const Edit = () => {
    const classes = useStyles();

    const { group } = usePage().props;
    const { data, setData, errors, put, processing } = useForm({
        name: group.data.name || "",
    });

    console.log("name", group.data.name);
    console.log(errors);

    const handleSubmit = (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-undef
        put(route("groups.update", group.data.id));
    };

    const handleChange = (e) => {
        setData("name", e.target.value);
    };
    return (
        <div className={classes.root}>
            <Head title="Edit Group" />

            <Typography variant="h5" color="secondary">
                Edit Group
            </Typography>
            <form
                className={classes.form}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <CreateJobFormContainer>
                    <TextField
                        required
                        name="name"
                        id="name"
                        label="Name"
                        variant="outlined"
                        onChange={handleChange}
                        helperText={errors.name || ""}
                        value={data.name}
                        error={errors.name}
                    />
                    <input
                        type="submit"
                        value="Update"
                        className={classes.submitButton}
                        disabled={processing}
                    />
                </CreateJobFormContainer>
            </form>

            <div className={classes.footerActions}>
                <Link
                    className="btn-indigo focus:outline-none"
                    // eslint-disable-next-line no-undef
                    href={route("groups.index")}
                >
                    Back
                </Link>
                <Link
                    className={classes.deleteButton}
                    // eslint-disable-next-line no-undef
                    href={route("groups.destroy", group.data.id)}
                >
                    Delete
                </Link>
            </div>
        </div>
    );
};

// eslint-disable-next-line react/no-children-prop
Edit.layout = (page) => <MaterialUiLayout children={page} />;

export default Edit;
