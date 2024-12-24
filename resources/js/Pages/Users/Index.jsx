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
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";

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
    const { users } = usePage().props;

    console.log(users);
    const classes = useStyles();

    const userList = users.map((row) => (
        <StyledTableRow key={users.indexOf(row)}>
            {/* username */}
            <StyledTableCell component="th" scope="row">
                {/* <Link href={`/admin/users/details/${row.name}`}>{row.name}</Link> */}
                {row.name}
            </StyledTableCell>

            {/* enabled */}
            <StyledTableCell align="right">
                {row.isEnabled ? "Enabled" : "Not Enabled"}
            </StyledTableCell>

            {/* last modified */}
            <StyledTableCell align="right">
                {format(new Date(row.UserLastModifiedDate), "ccc, PP p")}
            </StyledTableCell>

            {/* created */}
            <StyledTableCell align="right">
                {format(new Date(row.UserCreateDate), "ccc, PP p")}
            </StyledTableCell>
            {/* actions */}
            <StyledTableCell align="right">
                <Link
                    // eslint-disable-next-line no-undef
                    href={route("users.edit", row.id)}
                    className={classes.tableActionButton}
                >
                    Edit
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    ));

    return (
        <>
            <Head title="Users" />
            <Paper className={classes.tableBackground}>
                <div className={classes.tableHeaderAction}>
                    <Typography variant="h6">Users</Typography>
                    <Link
                        className="btn-indigo focus:outline-none"
                        // eslint-disable-next-line no-undef
                        href={route("users.create")}
                    >
                        Create User
                    </Link>
                </div>
                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell align="right">
                                    Enabled
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Updated
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Created
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Actions
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{userList}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

// eslint-disable-next-line react/no-children-prop
Index.layout = (page) => <MaterialUiLayout children={page} />;

export default Index;
