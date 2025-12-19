import React, { useState, useEffect } from "react";

import PrintDocumentSingle from "./PrintDocumentSingle";

// mui
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// aws css
import "../imagealbum.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
}));

const fetchDocKeys = async (jobid) => {
  const apiName = "backendapi";
  const path = `/documentuploads/${jobid}`;
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

const PrintDocuments = ({ jobid }) => {
  const classes = useStyles();

  const [docFiles, setDocFiles] = useState([]);
  const [docKeys, setDocKeys] = useState([]);

  useEffect(() => {
    console.log('printing')
  }, [])

  useEffect(() => {
    jobid && console.log("processing doc keys");

    jobid &&
      fetchDocKeys(jobid)
        .then((keys) => {
          setDocKeys(keys);
        })
        .catch((err) => alert(`Error fetching document keys: ${err}`));
  }, [jobid]);

  useEffect(() => {
    const promises = docKeys.map((doc) => Storage.get(doc.key));

    Promise.all(promises).then((res) => setDocFiles(res));
  }, [docKeys]);

  // get all documents and print them
  const documentList = docFiles.map((doc) => {

    console.log({doc})
    return (
      <div key={docFiles.indexOf(doc)}>
        <PrintDocumentSingle doc={doc} />
      </div>
    );
  });

  return (
    <>
      {jobid && docFiles.length > 0 && (
        <>
          <div className="pagebreak"></div>
          <div style={{ width: "100%" }}>
            <Box
              // display="none"
              displayPrint="block"
              m={1}
            >
              {documentList}
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default PrintDocuments;
