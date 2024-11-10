import React, { useState, useEffect, useContext } from "react";
import CollectionContainer from "../collectionContainer";

const ComponentType = "district";

const Districts = ({ districts }) => {
  return (
    <CollectionContainer collection={districts} itemType={ComponentType} />
  );
};

export default Districts;
