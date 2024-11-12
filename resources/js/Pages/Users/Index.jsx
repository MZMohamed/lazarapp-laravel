import { usePage, Head } from "@inertiajs/react";
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
    Typography
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
        </StyledTableRow>
    ));

    return (
        <>
            <Head title="Users" />
            <Paper className={classes.tableBackground}>
                <Typography variant="h6">Users</Typography>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>{userList}</TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

Index.layout = page => <MaterialUiLayout children={page} />

export default Index;
