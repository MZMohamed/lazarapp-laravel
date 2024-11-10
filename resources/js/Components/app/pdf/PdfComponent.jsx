import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import jsPDF from 'jspdf';

//aws
import { Storage } from 'aws-amplify';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   "../../../node_modules/pdfjs-dist/build/pdf.worker.js";

const SCALE = 1.0
const OFFSET = 0


const PdfComponent = ({ src, setSheetItems, sheetItems, jobid, pdfItemAdded, setPdfItemAdded, uploadPdf, setUploadPdf, pdfKey}) => {

  let randomNumber
  const [pins, setPins] = useState([])

  const canvasRef = useRef(null)
  const canvasOverlayRef = useRef(null)
  
  const [pdfFile, setPdfFile] = useState({})

  useEffect(() => {
    
    setSheetItems && sheetItems ?  setSheetItems([...pins])  : (randomNumber = 1);
  }, [pins])
 

  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(src);

      const pdf = await loadingTask.promise;

      // setPdfFile(pdf)

      const firstPageNumber = 1;

      const page = await pdf.getPage(firstPageNumber);

      const scale = 1.5;
      const viewport = page.getViewport({scale: scale});

      // Prepare canvas using PDF page dimensions
      const canvas = canvasRef.current;

      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      return (await renderTask.promise,{ pdf, viewport});
    };

    fetchPdf()
    .then((c) => {
      setPdfFile(c.pdf)
      const topCanvas = canvasOverlayRef.current;

      if (topCanvas.getContext) {
        const ctx = topCanvas.getContext('2d')
        topCanvas.height = c.viewport.height;
        topCanvas.width = c.viewport.width;
      }

    })
    .catch(() => {
      alert('could not fetch pdf')
    })
  }, [src]);

  const draw = ((ctx, location, pinNumber) => {
    ctx.fillStyle = 'lime';
    ctx.save();
    ctx.scale(SCALE, SCALE)  
  
    //draw circle
    ctx.beginPath();
    ctx.arc(location.x, location.y, 10, 0, 2 * Math.PI);
    ctx.fill();
  
    ctx.fillStyle = '#333';
    ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET)
    // draw number
    ctx.fillText(pinNumber, 0, 0)
    ctx.restore()

    setPdfItemAdded(true)
  })

  useEffect(() => {
    uploadPdf && saveCanvasToPdf() 
  }, [uploadPdf])

  const saveCanvasToPdf = async() => {
    const mainCanvas = canvasRef.current
    const mapPointCanvas = canvasOverlayRef.current

    if (mainCanvas.getContext && mapPointCanvas.getContext) {
      const mainCtx = mainCanvas.getContext('2d')
      const pointsCtx = mapPointCanvas.getContext('2d')

      mainCtx.drawImage(mapPointCanvas, 0, 0)

      const imgData = mainCanvas.toDataURL('image/png')

      const map = new jsPDF('l', 'in', [mainCanvas.width / 1.3, mainCanvas.height / 1.3]);

      map.addImage(imgData, 'PNG', 0, 0)


      const blob = map.output('blob')
      // map.save('test.pdf')

      // console.log({blob})

      Storage.put(pdfKey, blob, {
        contentType: 'application/pdf',
      })
      .then (() => alert('Map Saved')) // {key: "test.txt"}
      .catch(err => alert('Map not saved:' + err));

      setUploadPdf(false)


    }

  }
  return (
    <>
      <canvas style={{
        zIndex: 1,
        position : 'absolute',
        margin: '16px',
        left: '16px',
      }}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <canvas style={{
        zIndex: 2,
        position : 'absolute',
        margin: '16px',
        left: '16px',
      }}
              ref={canvasOverlayRef}
              onClick={e => {

                const canvas = canvasOverlayRef.current;

                if (canvas.getContext) {
                  const rect = canvas.getBoundingClientRect();
                  const ctx = canvas.getContext("2d");
                  const location = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                  };
                  const pinNumber = pins.length + 1;
                  draw(ctx, location, pinNumber);

                  setPins([...pins, location]);
                }
              }}
            />  
    </>
  );
}

PdfComponent.propTypes = {
  src: PropTypes.string
};

export default PdfComponent;