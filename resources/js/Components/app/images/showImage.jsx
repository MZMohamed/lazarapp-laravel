import React from "react";
// mui
import { makeStyles } from "@material-ui/core/styles";
// import { AmplifyS3Album } from "legacy";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  text: {
    color: "whiteSmoke",
    fontSize: "2rem",
    display: "flex",
    flexDirection: "column",
  },
}));

const MyTheme = {
  photoPickerButton: {
    display: "inline-block",
    // padding: "6px 12px",
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
    color: "white",
    backgroundColor: "#40ae49",
    boxShadow: "0 1px 4px rgba(0, 0, 0, .6)",
    transition: "background 0.8s",
  },
  photoImg: {
    border: "1px solid #40ae49" /* Gray border */,
    borderRadius: "4px" /* Rounded border */,
    padding: "5px" /* Some padding */,
    width: "300px" /* Set a small width */,
    height: "auto",
  },
  pickerPreview: {
    width: 480,
    height: "auto",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

function ShowImage() {
  const classes = useStyles();

  const albumPath = "2020/3/8351/images/";

  const showError = (e) => {
    console.error(e);
  };

  const showLoad = () => {
    console.info("Album Loaded");
  };

  return (
    <div className={classes.text}>
      TopTest
      {/* imgKey={image.key} className={classes.image} theme={MyTheme}  */}
      {/* <AmplifyS3Album
        path="2020/3/8351/images/"
        // theme={MyTheme}
        handleOnError={showError}
        handleOnLoad={() => console.log('loaded in line')}
        picker={false}
      /> */}
      BottomTest
    </div>
  );
}

export default ShowImage;
