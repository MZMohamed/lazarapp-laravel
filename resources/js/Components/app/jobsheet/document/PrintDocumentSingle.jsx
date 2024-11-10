import React, { useState, useRef, useEffect } from "react";
import "./ReactPdf.css";
import throttle from "lodash.throttle";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PrintDocumentSingle = ({ doc }) => {
  const [numPages, setNumPages] = useState(null);

  const [initialWidth, setInitialWidth] = useState(null);
  const pdfWrapper = useRef(null);

  const setPdfSize = () => {
    if (pdfWrapper && pdfWrapper.current) {
      setInitialWidth(pdfWrapper.current.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", throttle(setPdfSize, 3000));
    setPdfSize();
    return () => {
      window.removeEventListener("resize", throttle(setPdfSize, 3000));
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log("doc loaded");
  }

  return (
    <div className="container">
      <div id="pdfWrapper" className="pdfWrapper" ref={pdfWrapper}>
        <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={index}>
              <div className="pagebreak"></div>
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PrintDocumentSingle;
