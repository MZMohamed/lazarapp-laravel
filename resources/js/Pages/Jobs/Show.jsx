import { useState, useEffect } from "react";
import { usePage, Head } from "@inertiajs/react";

import JobSheetTable from "@/Components/app/jobsheet/JobSheetTable";
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import PrintOptions from "@/Components/app/jobsheet/print/";
import JobSheetItems from "@/Components/app/jobsheet/JobSheetItems";
import DumpingLocation from "@/Components/app/jobsheet/dumpingLocation/";

// mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

import clsx from "clsx";

import '../../../css/print.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    // '& : last-child': {
    //   marginLeft: 'auto',
    // },
  },
  sheet: {
    margin: "auto",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
  },
}));

const Show = () => {
  const { job } = usePage().props;
  const classes = useStyles();
    // used for printing state
  const [printOption, setPrintOption] = useState(0);

  console.log('details', job);

  return (
    <div className={classes.root}>
      <Head title={`Job ${job.id}`} />
      <Grid
        className="noPrint"
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >

        <Grid
          item
          xs={8}
          container
          spacing={1}
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={11}>
            <Typography variant="h4" color="secondary" className="noPrint">
              Job Detail
            </Typography>
          </Grid>
          <Grid item xs={1} className="noPrint">
            <PrintOptions
              setPrintOption={setPrintOption}
              printOption={printOption}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <JobSheetItems
            jobid={job.id}
            job={job}
            // setJob={setJob}
            // setAdminApproved={setAdminApproved}
            // setJobNumber={setJobNumber}
          />
        </Grid>

        <Grid item xs={12} className="noPrint">
          <DumpingLocation
            jobid={job.id}
            dumpingLocation={job.dumpingLocation}
          />
        </Grid>


      </Grid>

      <JobSheetTable jobDetail={job.details} />
    </div>
  )
}

// eslint-disable-next-line react/no-children-prop
Show.layout = (page) => <MaterialUiLayout children={page} />;

export default Show
