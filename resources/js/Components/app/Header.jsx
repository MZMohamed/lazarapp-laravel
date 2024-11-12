import React, { useState } from "react";
import { Link as NavLink } from '@inertiajs/react'
import "@/../css/print.css";


//mui
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Collapse,
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

//mui icons
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";

import InboxIcon from "@material-ui/icons/MoveToInbox";

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

const MyTheme = {
  navButton: {
    display: "inline-block",
    padding: "8px 16px",
    // marginTop: "8px",
    // marginBottom: "8px",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    userSelect: "none",
    backgroundImage: "none",
    border: "1px solid transparent",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "#40ae49",
    boxShadow: "0 1px 4px rgba(0, 0, 0, .6)",
    transition: "background 0.8s",
  },
};

const Header = ({user}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const [menuOpen, setMenuOpen] = useState(true);

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const sideList = (side) => (
    <div className={classes.list}>
      <List component="nav" aria-label="list header profile">
        <ListItem>
          <ListItemText

            primary={user.name}
            secondary={user.email}
          />
        </ListItem>
        <ListItem>
          <strong>Version</strong>: {1.36}
        </ListItem>
      </List>

      <Divider />

        <>
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

            <JobSection toggleDrawer={toggleDrawer} />
          </List>

          <Divider />
        </>

        <>
          <Divider />
          <List
            component="nav"
            aria-label="sidebar-nested-list"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Driver
              </ListSubheader>
            }
          >
            <NavLink
              href="/driver/jobs"
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
                <ListItemText primary="My Jobs" />
              </ListItem>
            </NavLink>
            <NavLink
              href="/driver/jobs/new"
              style={{
                textDecoration: "none",
              }}
            >
              <ListItem
                button
                className={classes.nested}
                onClick={toggleDrawer("left", false)}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Create Jobs" />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
        </>

        <>
          <List
            component="nav"
            aria-label="sidebar-nested-list"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Client
              </ListSubheader>
            }
          >
            <NavLink
              href="/client/jobs"
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
                <ListItemText primary="Completed Jobs" />
              </ListItem>
            </NavLink>
          </List>
        </>
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
            <Typography variant="h6" className={classes.title}>
              {/* {groups && groups.length > 0
                ? groups.includes("admin")
                  ? "ADMIN"
                  : groups.includes("driver")
                  ? "DRIVER"
                  : groups.includes("client")
                  ? "CLIENT"
                  : "UNAUTHORISED USER"
                : "UNAUTHORISED USER"} */}
            </Typography>
            {/* <Authenticator hideDefault={true} theme={MyTheme}  className='noPrint'>
              <SignOut />
            </Authenticator> */}
            <Button color="secondary" variant="contained">Sign Out</Button>
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
