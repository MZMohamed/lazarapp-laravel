import { useState, useEffect } from "react";
import { usePage, Head } from "@inertiajs/react";

import JobSheetTable from "@/Components/app/jobsheet/JobSheetTable";
import MaterialUiLayout from "@/Layouts/MaterialUiLayout";
import PrintOptions from "@/Components/app/jobsheet/print/";
import JobSheetItems from "@/Components/app/jobsheet/JobSheetItems";
import DumpingLocation from "@/Components/app/jobsheet/dumpingLocation/";
import Document from "@/Components/app/jobsheet/document";
import ImageAlbum from "@/Components/app/jobsheet/ImageAlbum";

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

  const [showPdf, setShowPdf] = useState(false);
  const [pdf, setPdf] = useState("");

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
            dumpingLocation={job.dumpingLocation}
            dumpingLocationSheetNumbers={job.dumping_location_sheet_numbers}
          />
        </Grid>

        
          <Grid item xs={12} className="noPrint">
            <ImageAlbum
              jobid={job.id}
              images={job.images}
              // setImages={setImages}
              adminApproved={job.adminApproved}
              jobNumber={job.jobNumber}
            />
          </Grid>

        <Grid item xs={12}>
          <JobSheetTable
            className="noPrint"
            jobDetail={job.details}
          />
        </Grid>


        <Grid
          className="noPrint"
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid className="noPrint" item xs={12}>
            {pdf && pdf !== "" && showPdf && (
              <Button
                variant="contained"
                color="secondary"
                className={clsx(classes.button, "noPrint")}
                startIcon={<PictureAsPdfIcon />}
                onClick={() => setUploadPdf(true)}
              >
                Save Map
              </Button>
            )}
          </Grid>
          {/* <Grid item xs={12} className={clsx(classes.sheet, "noPrint")}>
            {pdf && pdf !== "" && showPdf && (
              <PdfComponent
                src={pdf}
                jobid={jobid}
                setSheetItems={setSheetItems}
                sheetItems={sheetItems}
                pdfItemAdded={pdfItemAdded}
                setPdfItemAdded={setPdfItemAdded}
                uploadPdf={uploadPdf}
                setUploadPdf={setUploadPdf}
                pdfKey={pdfKey}
              />
            )}
          </Grid> */}
        </Grid>


        <Grid item xs={12} className="noPrint">
          <Document job={job} />
        </Grid>

      </Grid>


    </div>
  )
}

// eslint-disable-next-line react/no-children-prop
Show.layout = (page) => <MaterialUiLayout children={page} />;

export default Show
