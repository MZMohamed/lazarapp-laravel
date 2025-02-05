import { Head, useForm, Link } from "@inertiajs/react";

// components
import CreateJobFormContainer from "@/Components/app/admin/jobs/CreateJobFormContainer";

//mui
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
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

const GroupCreate = () => {
    const classes = useStyles();

    const { data, setData, errors, post, processing } = useForm({
        name: "",
    });

    // add validation to form
    // const [error, setError] = useState(false)

    const handleChange = (event) => {
        setData("name", event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post("/districts", data);

    };

    return (
        <>
            <Head title="Create District" />
            <form
                className={classes.root}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h5" color="secondary">
                    Create District
                </Typography>
                <Link
                    className="btn-indigo focus:outline-none"
                    // eslint-disable-next-line no-undef
                    href={route("districts.index")}
                >
                    Back
                </Link>
                <CreateJobFormContainer>
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
                    <input
                        type="submit"
                        value="Create District"
                        disabled={processing}
                        className={classes.submitButton}
                    />
                </CreateJobFormContainer>
            </form>
        </>
    );
};

// eslint-disable-next-line react/no-children-prop
GroupCreate.layout = (page) => <MaterialUiLayout children={page} />;

export default GroupCreate;
