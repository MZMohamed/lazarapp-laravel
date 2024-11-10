import React, { useState, useEffect } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// aws css
import "./imagealbum.css";

//aws
import { Amplify }from "aws-amplify";
// import { AmplifyS3Image } from "legacy";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
}));

const PrintJobImages = ({ images }) => {
  const classes = useStyles();

  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleOnLoad = () => {
    // console.log({ images });
    // console.log("image loaded");

    setImagesLoaded(imagesLoaded + 1);
  };

  useEffect(() => {
    imagesLoaded === images.length && window.print();
  }, [imagesLoaded]);

  const imageList = images.map((img) => (
    <div key={img.id}>
      <img alt={img.key} src={img.key}/>
      {/* <AmplifyS3Image
        imgKey={img.key}
        handleOnLoad={handleOnLoad}
        // className={classes.image}
        // theme={MyTheme}
      /> */}
    </div>
  ));

  return (
    <>
      {images.length > 0 && (
        <>
          <div className="pagebreak"></div>
          <div style={{ width: "100%" }}>
            <Box display="none" displayPrint="block" m={1}>
              <div className={classes.root}>{imageList}</div>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default PrintJobImages;
