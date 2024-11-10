import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import LocationSection from "./LocationSection";
import SheetNumbersList from "./sheetNumbersList";
import DumpingLocationActions from "./dumpingLocationActions";


const Index = ({ jobid, dumpingLocation }) => {
  // use to update sheet number list
  const [isEdited, setIsEdited] = useState(false);

  return (
    <>
      <Typography variant="h6" color="secondary">
        Dumping Location and Sheet Numbers
      </Typography>
      <LocationSection dumpingLocation={dumpingLocation} />
      <SheetNumbersList
        jobid={jobid}
        isEdited={isEdited}
        setIsEdited={setIsEdited}
      />
      <DumpingLocationActions jobid={jobid} setIsEdited={setIsEdited} />
    </>
  );
};

export default Index;
