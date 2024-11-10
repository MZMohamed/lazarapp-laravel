import React, { useState } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

//dropzone
// https://github.com/Yuvaleros/material-ui-dropzone
import { DropzoneArea } from "material-ui-dropzone";

//aws
import { Amplify, API, Auth, Storage } from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },

  pdfOptions: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  uploader: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const deletePdfs = async (jobid) => {
  const apiName = "backendapi";
  const path = "/pdfs";
  const myInit = {
    // OPTIONAL
    body: { jobId: jobid },
    headers: {}, // OPTIONAL
  };
  return await API.del(apiName, path, myInit);
};

const fetchPdf = async (jobid) => {
  const apiName = "backendapi";
  const path = `/pdfs/${jobid}`;
  const myInit = {
    // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      // OPTIONAL
      // name: 'param'
    },
  };
  return await API.get(apiName, path, myInit);
};

const createPdfInDb = async (key, jobId) => {
  const apiName = "backendapi";
  const path = "/pdfs";
  const myInit = {
    // OPTIONAL
    body: { ...key, jobId }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  return await API.post(apiName, path, myInit);
};

const PdfDetail = ({
  pdf,
  setPdf,
  pdfKey,
  setPdfKey,
  showPdf,
  setShowPdf,
  jobid,
  jobNumber,
}) => {
  const classes = useStyles();
  const [groups, setGroups] = useState(
    Auth.user.signInUserSession.accessToken.payload["cognito:groups"]
  );
  const [showMapUploader, setShowMapUploader] = useState(false);
  const [numericKey, setNumericKey] = useState(0);
  const [files, setFiles] = useState([]);

  const handleDelete = () => {
    setShowPdf(false);

    deletePdfs(jobid)
      .then((res) => {
        setPdfKey("");
        setPdf("");
        Storage.remove(pdfKey)
          .then((result) => alert("Map Deleted"))
          .catch((err) => alert("Map was not deleted"));
      })

      .catch((res) => console.log("Error:", res));
  };

  const saveFile = async () => {
    const folderName = "pdf";

    const fileUploadPath = `${jobNumber.toString()}/${folderName}`

    jobNumber &&
      files &&
      files.length > 0 &&
      files.forEach((f, i) => {
        Storage.put(`${fileUploadPath}/${f.name}`, f, {
          progressCallback(progress) {
            // TODO: Add Loading animation
            console.log(
              `${f.name} Uploading: ${progress.loaded}/${progress.total}`
            );
          },
        })
          .then((key) => {
            createPdfInDb(key, jobid)
              .then(() => fetchPdf(jobid).then((res) => setPdfKey(res.key)))
              .catch((err) => console.log("Fetch Pdf Error:", err))
              .catch((err) => console.log("Create pdf in DB Error:", err));
          })
          .catch((err) => console.log("Pdf Storage Upload Error:", err));
      });

    setNumericKey(numericKey + 1);
    setFiles([]);
  };

  const dropZoneChange = (droppedFile) => {
    setFiles(droppedFile);
  };

  return (
    <div className={classes.pdfOptions}>
      {/* Header */}
      <Typography variant="h6" color="secondary">
        Map Options
      </Typography>

      <div className={classes.buttons}>
        {/* Show or Hide Map Uploader Button */}
        {groups &&
          (groups.includes("admin") || groups.includes("driver")) &&
          pdfKey === "" && (
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                setShowMapUploader(!showMapUploader);
              }}
            >
              {showMapUploader ? "Hide Uploader" : "Show Uploader"}
            </Button>
          )}

        {/* Show or Hide Map Button */}
        {pdfKey !== "" && (
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<PictureAsPdfIcon />}
            onClick={() => {
              setShowPdf(!showPdf);
            }}
          >
            {showPdf && !pdfKey !== "" ? "Hide" : "Show"}
          </Button>
        )}

        {/* Download Button */}
        {pdfKey !== "" && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<GetAppIcon />}
            href={pdf}
            // onClick={()=>{
            //   Storage.get(pdfKey)
            //   .then(result => console.log(result))
            //   .catch(err => console.log(err));
            // }}
          >
            Download
          </Button>
        )}

        {/* Delete Button - only show to admins and drivers */}
        {groups &&
          (groups.includes("admin") || groups.includes("driver")) &&
          pdf &&
          pdfKey &&
          pdfKey !== "" && (
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<DeleteSweepIcon />}
              onClick={(e) => {
                e.preventDefault();
                window.confirm("Are you sure?")
                  ? handleDelete()
                  : alert("Map was not removed");
              }}
            >
              Delete
            </Button>
          )}
      </div>

      {showMapUploader && (
        <div className={classes.uploader}>
          <DropzoneArea
            key={numericKey}
            onChange={dropZoneChange}
            acceptedFiles={[".pdf"]}
            dropzoneText={"Drop or Select Map  here"}
            filesLimit={1}
            maxFileSize={200000000} //20mb
          />
          {files && files.length > 0 && (
            <Button
              className={classes.button}
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => saveFile()}
            >
              Upload
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfDetail;
