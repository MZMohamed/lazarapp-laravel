import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import { usePage, Head, Link } from "@inertiajs/react";
//date-fns
import { format } from "date-fns";

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
    },
}));

// this page should only be accessible by an admin user

const Index = () => {
    const { districts } = usePage().props;

    // console.log(flash);
    const classes = useStyles();

    const groupList = districts.map((row) => (
        <StyledTableRow key={row.id}>
            {/* groupname */}
            <StyledTableCell component="th" scope="row">
                {/* <Link href={`/admin/districts/details/${row.name}`}>{row.name}</Link> */}
                {row.name}
            </StyledTableCell>

            {/* actions */}
            <StyledTableCell align="right">
                <Link
                    // eslint-disable-next-line no-undef
                    href={route("districts.edit", row.id)}
                    className={classes.tableActionButton}
                >
                    Edit
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    ));

    return (
        <>
            <Head title="Districts" />
            <Paper className={classes.tableBackground}>
                <div className={classes.tableHeaderAction}>
                    <Typography variant="h6">Districts</Typography>
                    <Link
                        className="btn-indigo focus:outline-none"
                        // eslint-disable-next-line no-undef
                        href={route("districts.create")}
                    >
                        Create District
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
                        <TableBody>{groupList}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};
// eslint-disable-next-line react/no-children-prop
Index.layout = (page) => <MaterialUiLayout children={page} />;
export default Index;
