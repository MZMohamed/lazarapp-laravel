import React, { useEffect, useState } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import {
  InputBase,
  InputLabel,
  // Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  muiButton: {
    margin: theme.spacing(1),
  },

  button: {
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
    color: "#333",
    backgroundColor: "#40ae49",
    boxShadow: "0 1px 4px rgba(0, 0, 0, .6)",
    transition: "background 0.8s",
  },
}));

const createDocInDb = async (key, jobId) => {
  const apiName = "backendapi";
  const path = "/documentuploads";
  const myInit = {
    // OPTIONAL
    body: { ...key, jobId }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };
  //   console.log(apiName, path, myInit)
  return await API.post(apiName, path, myInit);
};

const DocumentUpload = ({ jobNumber, jobid, setIsUpdated }) => {
  const classes = useStyles();

  async function onChange(e) {
    const file = e.target.files[0];
    const folderName = "document";

    const fileUploadPath = `${jobNumber.toString()}/${folderName}`
    try {
      await Storage.put(`${fileUploadPath}/${file.name}`, file, {})
        .then( async (key) => {
          await createDocInDb(key, jobid);
          setIsUpdated(true)
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <>
      <InputLabel id="upload" htmlFor="fileupload" className={classes.button}>
        ADD
      </InputLabel>
      <InputBase
        inputProps={{
          accept: ".pdf"
        }}
        id="fileupload"
        type="file"
        style={{ display: "none" }}
        onChange={onChange}
        // className={classes.button}
        placeholder="Upload Doc"
      />

      {/* TODO: add proper mui button with onchange functionality, same as above */}
      {/* https://material-ui.com/components/buttons/#upload-button */}
      {/* <input
        type="file"
        hidden
        id="contained-button-file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="secondary"
          className={classes.muiButton}
          startIcon={<AddBoxIcon />}
        >
          Add
        </Button>
      </label> */}
    </>
  );
};

export default DocumentUpload;
