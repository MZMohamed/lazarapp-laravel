import React, { useEffect, useState } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  TextField,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadTwoToneIcon from "@material-ui/icons/CloudDownloadTwoTone";
import red from "@material-ui/core/colors/red";
// components
import CreateJobFormContainer from "../admin/jobs/CreateJobFormContainer";

// image compress
import imageCompression from "browser-image-compression";

//dropzone
// https://github.com/Yuvaleros/material-ui-dropzone
import { DropzoneArea } from "material-ui-dropzone";

// aws css
import "./imagealbum.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  album: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  image: {
    border: "1px solid #ddd" /* Gray border */,
    borderRadius: "4px" /* Rounded border */,
    padding: "5px" /* Some padding */,
    width: "200px" /* Thumbnail width */,
    height: "auto",
    objectFit: "cover",
    cursor: "pointer",
  },
  s3imageItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  uploader: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  textBox: {
    margin: theme.spacing(1),
    alignSelf: "flex-start",
  },
  imageActions: {
    display: "flex",
    alignSelf: "flex-end",
  },
  imageFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

const createImageinDb = async (key, jobId) => {
  // const apiName = "backendapi";
  // const path = "/images";
  // const myInit = {
  //   // OPTIONAL
  //   body: { ...key, jobId }, // replace this with attributes you need
  //   headers: {}, // OPTIONAL
  // };

  // await API.post(apiName, path, myInit);
};

const deleteImageFromDb = async (key, jobId) => {
  // const apiName = "backendapi";
  // const path = "/images";
  // const myInit = {
  //   // OPTIONAL
  //   body: { id: key.id, jobId }, // replace this with attributes you need
  //   headers: {}, // OPTIONAL
  // };

  // await API.del(apiName, path, myInit);
};

const fetchImages = async (jobid) => {
  // const apiName = "backendapi";
  // const path = `/images/${jobid}`;
  // const myInit = {
  //   // OPTIONAL
  //   headers: {}, // OPTIONAL
  //   response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
  //   queryStringParameters: {
  //     // OPTIONAL
  //     // name: 'param'
  //   },
  // };
  // return await API.get(apiName, path, myInit);
};

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.addEventListener("click", clickHandler, false);
  a.click();
  return a;
};

const ImageAlbum = ({ jobid, images, adminApproved, jobNumber }) => {
  const classes = useStyles();

  // use the below to add extensions to files for renaming purposes use js object property
  const [filetypes, setFiletypes] = useState({
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  });

  const [downloadingImage, setDownloadingImage] = useState(false);

  const [renameDisabled, setRenameDisabled] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [files, setFiles] = useState([]);
  const [numercicKey, setNumericKey] = useState(0);
  const [uploadImages, setUploadImages] = useState(false);
  const [groups, setGroups] = useState([]);

  // useEffect(() => {
  //   if (files && files.length > 0 && renameDisabled) {
  //     saveFile();
  //   }
  // }, [files, renameDisabled, saveFile]);

  // const deleteImage = (image) => {
  //   Storage.remove(image.key).then((result) =>
  //     deleteImageFromDb(image, jobid)
  //       .then((res) => {
  //         alert("Image was removed");
  //       })
  //       .catch((err) => alert(`Error: ${err}`))
  //       .catch((err) => alert(`Error: ${err}`))
  //   );
  // };

  // const deleteAllJobImages = () => {
  //   images && images.length > 0
  //     ? images.forEach((image, i) => {
  //         Storage.remove(image.key).then((result) =>
  //           deleteImageFromDb(image, jobid)
  //             .then((res) => {
  //               alert("All images were removed");
  //             })
  //             .catch((err) => alert(`Delete from Database Error: ${err}`))
  //             .catch((err) => alert(`Delete from Storage Error: ${err}`))
  //         );
  //       })
  //     : alert("there are no images");
  // };

  const imageList = images.map((image) => {
    const imageName = image.key.split("/")[2];

    return (
      <div className={classes.s3imageItem} key={image.id}>
        <img alt={image.key} src={image.url || image.key} className={classes.image} />
        {/* <AmplifyS3Image
          imgKey={image.key}
          className={classes.image}
          theme={MyTheme}
        /> */}
        <div className={classes.imageFooter}>
          <Typography variant="body1" color="secondary">
            <em>{imageName}</em>
          </Typography>
          {groups && !groups.includes("client") && (
            //revert below
            
            <div className={classes.imageActions}>
              <Tooltip title="Download">
                <IconButton
                  className={classes.button}
                  color="secondary"
                  aria-label="download-image"
                  component="span"
                  onClick={async () => {
                    await Storage.get(image.key, { download: true })
                      .then((res) => downloadBlob(res.Body, imageName))
                      .catch((err) => alert(`Could not download: ${err}`));
                  }}
                >
                  <CloudDownloadTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  className={classes.button}
                  aria-label="delete-image"
                  component="span"
                  onClick={() => {
                    deleteImage(image);
                    // setImages(images.filter((img) => img.key !== image.key));
                  }}
                >
                  <DeleteSweepIcon
                    style={{ color: red[500] }}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    );
  });

  const addExtension = () => {
    const temparr = [];

    files.forEach((f, i) => {
      temparr.push(
        new File([f], `${f.name}.${filetypes[f.type]}`, { type: f.type })
      );
    });

    setFiles(temparr);

    setRenameDisabled(true);
  };

  const saveFile = async (e) => {
    const folderName = "images";

    const fileUploadPath = `${jobNumber.toString()}/${folderName}`;

    jobNumber && files && files.length > 0
      ? await files.forEach(async (f, i) => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          };

          try {
            const compressedFile = await imageCompression(f, options);

            Storage.put(`${fileUploadPath}/${f.name}`, compressedFile, {
              progressCallback(progress) {
                // use for loading bar
                // console.log(`${f.name} Uploading: ${progress.loaded}/${progress.total}`);
              },
            })
              .then((key) => {
                createImageinDb(key, jobid)
                  .then(() =>
                    fetchImages(jobid).then((images) => {
                      setImages(images);
                      i === files.length - 1 &&
                        alert("files uploaded and mapped to database");
                    })
                  )
                  .catch((err) => alert("Fetch Image Error: ", err))
                  .catch((err) => alert("Create Image in DB Error: ", err));
              })
              .catch((err) => alert("Storage Upload Error: ", err));
          } catch (error) {
            alert(
              `Unable to compress and upload image file, Please contact the administrator: ${error}`
            );
          }
        })
      : alert("Job Number not set");

    setNumericKey(numercicKey + 1);
    setFiles([]);
    setRenameDisabled(false);
  };

  const dropZoneChange = (droppedFiles) => {
    const temparr = [];

    droppedFiles.forEach((file, i) => {
      temparr.push(
        new File([file], file.name.slice(0, file.name.lastIndexOf(".")), {
          type: file.type,
        })
      );
    });
    setFiles(temparr);
  };

  const handleFilenameChange = (i) => (e) => {
    const temparr = [...files];
    const tempFile = new File([temparr[i]], `${e.target.value}`, {
      type: temparr[i].type,
    });
    temparr[i] = tempFile;
    setFiles(temparr);
  };

  const handleDownloadAllClick = () => {
    images.forEach(async (image) => {
      const imageName = image.key.split("/")[2];

      await Storage.get(image.key, { download: true })
        .then((res) => downloadBlob(res.Body, imageName))
        .catch(() => alert("Error downloading all images"));
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="secondary">
        Image Options
      </Typography>
      <div className={classes.buttons}>
        {/* Hide this button if there are no images */}
        {images && images.length > 0 && (
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<PhotoLibraryIcon />}
            onClick={() => setShowImages(!showImages)}
          >
            {showImages ? "Hide Images" : "Show Images"}
          </Button>
        )}

        {/* Hide this button if user is agent */}
        {groups && !groups.includes("client") && !adminApproved && (
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            startIcon={<CloudUploadIcon />}
            onClick={() => setUploadImages(!uploadImages)}
          >
            {uploadImages ? "Hide Uploader" : "Show Uploader"}
          </Button>
        )}

        {/* Hide this button if there are no images */}
        {images && images.length > 0 && (
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            startIcon={<GetAppIcon />}
            onClick={handleDownloadAllClick}
          >
            Download All
          </Button>
        )}

        {/* Hide this button if user is agent */}
        {groups &&
        !groups.includes("client") &&
        images &&
        images.length > 0 &&
        !adminApproved ? (
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<DeleteSweepIcon />}
            onClick={() => {
              deleteAllJobImages();
              setImages();
            }}
          >
            Delete All
          </Button>
        ) : null}
      </div>
      <div className={classes.album}>{showImages && imageList}</div>

      {uploadImages && !adminApproved && (
        <div className={classes.uploader}>
          <DropzoneArea
            key={numercicKey}
            onChange={dropZoneChange}
            acceptedFiles={["image/*"]}
            dropzoneText={"Drop or Select images here"}
            filesLimit={30}
            showFileNames
            maxFileSize={100000000} //10mb
          />

          {/* file renaming section */}
          {!(files && files.length > 0) || (
            <CreateJobFormContainer>
              <Typography variant="h6">Rename Files</Typography>
              {files.map((f) => (
                <div className={classes.textBox} key={files.indexOf(f)}>
                  <TextField
                    disabled={renameDisabled}
                    variant="outlined"
                    fullWidth
                    placeholder="Type filename here"
                    id={`filename-${files.indexOf(f)}`}
                    label={`Image #${files.indexOf(f) + 1}`}
                    name={`${files.indexOf(f)}`}
                    color="secondary"
                    value={files[files.indexOf(f)].name}
                    onChange={handleFilenameChange(files.indexOf(f))}
                  />
                </div>
              ))}
            </CreateJobFormContainer>
          )}

          {files && files.length > 0 && (
            <Button
              className={classes.button}
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={addExtension}
            >
              Upload
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

ImageAlbum.defaultProps = {
  jobid: -1,
};

export default ImageAlbum;
