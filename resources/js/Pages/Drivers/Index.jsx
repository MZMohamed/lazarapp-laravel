import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import { usePage, Head, Link } from "@inertiajs/react";

//mui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    tableBackground: {
        overflowX: "auto", // Enables horizontal scrolling on smaller screens
        margin: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            margin: theme.spacing(1),
        },
    },
    table: {
        minWidth: 700,
        marginTop: theme.spacing(1),
    },
    tableHeaderAction: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "8px",
    },
    tableActionButton: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

// this page should only be accessible by an admin user

const Index = () => {
    const { drivers } = usePage().props;

    // console.log(drivers);
    const classes = useStyles();

    const driverList = drivers.map((row) => (
        <StyledTableRow key={row.id}>
            {/* drivername */}
            <StyledTableCell component="th" scope="row">
                {row.name}
            </StyledTableCell>

            {/* actions */}
            <StyledTableCell align="right">
                {/* eslint-disable-next-line no-undef */}
                <Link href={route("drivers.edit", row.id)} className={classes.tableActionButton}>Edit</Link>
            </StyledTableCell>
        </StyledTableRow>
    ));

    return (
        <>
            <Head title="Drivers" />
            <Paper className={classes.tableBackground}>
                <div className={classes.tableHeaderAction}>
                    <Typography variant="h6">Drivers</Typography>
                    <Link
                        className="btn-indigo focus:outline-none"
                        // eslint-disable-next-line no-undef
                        href={route("drivers.create")}
                    >
                        Create Driver
                    </Link>
                </div>
                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">
                                    Actions
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{driverList}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};
// eslint-disable-next-line react/no-children-prop
Index.layout = (page) => <MaterialUiLayout children={page} />;
export default Index;
