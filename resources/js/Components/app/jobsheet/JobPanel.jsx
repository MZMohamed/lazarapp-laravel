import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import { usePage, Head, Link } from "@inertiajs/react";
import { BottomNav } from "./jobPanelComponents/bottomNav";

// import { JobPanelContextProvider } from "../../stores/jobPanelContext";

import { DistrictTabs } from "./jobPanelComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  locationPanel: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  listPanel: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const JobPanel = ({
  jobs,
  districts,
  locations,
}) => {
  const classes = useStyles();

  console.log({jobs, districts, locations});

//   const history = useHistory();

//   const handleClick = (id) => (event) => {
//     event.preventDefault();
//     history.push(`/${groups[0]}/job/${id}`);
//   };

//   const [groups, setGroups] = useState(
//     Auth.user.signInUserSession.accessToken.payload["cognito:groups"]
//   );

  return (
    <>
      <div className={classes.root}>
        <DistrictTabs jobs={jobs} districts={districts} locations={locations}/>
      </div>
      <BottomNav />
    </>
  );
};

JobPanel.propTypes = {
    jobs: PropTypes.array,
    districts: PropTypes.array,
    locations: PropTypes.array,
}

export default JobPanel;
