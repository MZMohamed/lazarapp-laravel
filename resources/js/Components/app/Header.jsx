import { useState } from "react";
import { usePage, Link as NavLink } from "@inertiajs/react";
import "@/../css/print.css";

//mui
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { StarBorder } from "@material-ui/icons";
// components
import JobSection from "./sidebar/admin/JobSection";

const useStyles = makeStyles((theme) => ({
    drawerRoot: {
        flexGrow: 1,
        marginBottom: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    drawerListRoot: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Header = () => {
    const { user } = usePage().props.auth;

    const classes = useStyles();
    const [state, setState] = useState({
        left: false,
    });

    // const [menuOpen, setMenuOpen] = useState(true);

    const toggleDrawer = (side, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    // const handleClick = () => {
    //     setMenuOpen(!menuOpen);
    // };

    const sideList = (side) => (
        <div className={classes.list}>
            <List component="nav" aria-label="list header profile">
                <ListItem>
                    <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
                <ListItem>
                    <strong>Version</strong>: {1.36}
                </ListItem>
            </List>

            <Divider />

            <List
                component="nav"
                aria-label="sidebar-nested-list"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Admin
                    </ListSubheader>
                }
            >
                <List component="div" disablePadding>
                    <NavLink
                        href="/users"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={toggleDrawer(side, false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </NavLink>
                </List>


                <List component="div" disablePadding>
                    <NavLink
                        href="/groups"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={toggleDrawer(side, false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItem>
                    </NavLink>
                </List>
            </List>

            <Divider />

            <List
                component="nav"
                aria-label="sidebar-nested-list"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Jobs
                    </ListSubheader>
                }
            >
                <JobSection toggleDrawer={toggleDrawer} />
            </List>
        </div>
    );

    return (
        <div className="noPrint">
            <div className={classes.drawerRoot}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer("left", true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            className={classes.title}
                        ></Typography>
                        <Button color="secondary" variant="contained">
                            Sign Out
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                    {sideList("left")}
                </Drawer>
            </div>
        </div>
    );
};

export default Header;
