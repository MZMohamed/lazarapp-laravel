import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Link as NavLink } from "@inertiajs/react";

//mui-drawer
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";

//mui icons
import {  StarBorder } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    drawerRoot: {
        flexGrow: 1,
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

const JobSection = ({toggleDrawer}) => {
    const classes = useStyles();

    // const [state, setState] = useState({
    //   left: false
    // });

    // const [menuOpen, setMenuOpen] = useState(true);

    // const toggleDrawer = (open) => event => {
    //   if (
    //     event.type === "keydown" &&
    //     (event.key === "Tab" || event.key === "Shift")
    //   ) {
    //     return;
    //   }

    //   setState({ ...state, left: open });
    // };

    // const handleClick = () => {
    //     setMenuOpen(!menuOpen);
    // };

    return (
        <div>
            <List component="div" disablePadding>
                <NavLink
                    // eslint-disable-next-line no-undef
                    href={route('jobs.index')}
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
                        <ListItemText primary="Jobs" />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
};

JobSection.propTypes = {
    toggleDrawer: PropTypes.func,
};

export default JobSection;
