import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";

import PrintMenu from "./PrintMenu";

const Index = ({ setPrintOption, printOption }) => {
  return (
    <div>
      <PrintMenu
        className="noPrint"
        setPrintOption={setPrintOption}
        printOption={printOption}
      />
    </div>
  );
};

export default Index;
