import React, { useState, useEffect, useRef } from "react";

import pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// mui
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// aws css
import "./imagealbum.css";

//aws
import { Amplify }from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const SCALE = 1.0;
const OFFSET = 0;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
}));

const PrintJobMap = ({ src }) => {
  const classes = useStyles();

  const canvasRef = useRef(null);
  const [pdfFile, setPdfFile] = useState({});

  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(src);

      const pdf = await loadingTask.promise;

      // setPdfFile(pdf)

      const firstPageNumber = 1;

      const page = await pdf.getPage(firstPageNumber);

      const scale = 1.0;
      const viewport = page.getViewport({ scale: scale });

      // Prepare canvas using PDF page dimensions
      const canvas = canvasRef.current;

      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      const renderTask = page.render(renderContext);

      return await renderTask.promise, { pdf, viewport };
    };

    src &&
      src !== "" &&
      fetchPdf()
        .then((c) => {
          setPdfFile(c.pdf);
        })
        .catch(() => {
          alert("could not fetch map");
        });
  }, [src]);

  const pdfCanvas = (
    <canvas
      style={{
        zIndex: 1,
        position: "absolute",
        margin: "16px",
        left: "16px",
      }}
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );

  return (
    <>
      {src && src !== "" && (
        <>
          <div className="pagebreak"></div>
          <div style={{ width: "100%" }}>
            <Box display="none" displayPrint="block" m={1}>
              <div className={classes.root}>{pdfCanvas}</div>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default PrintJobMap;
