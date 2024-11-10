import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function PrintMenu({ setPrintOption, printOption }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    // if print option already set then reset it
    printOption > 0 && setPrintOption(0)
  };

  const handleClose = (value) => {
    setPrintOption(value)

    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="outlined"
        color="secondary"
        onClick={handleClick}
      >
        Print
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose(1)}>Worksheet Only</MenuItem>
        <MenuItem onClick={() => handleClose(2)}>Full</MenuItem>
        {/* <MenuItem onClick={() => handleClose(3)}>Worksheet + Document</MenuItem>
        <MenuItem onClick={() => handleClose(4)}>All</MenuItem> */}
      </Menu>
    </div>
  );
}
