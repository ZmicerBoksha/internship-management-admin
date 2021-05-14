import React, { useState } from "react";
import { Dialog } from "@material-ui/core";

const PopUpCalender: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);


  return (   <>
    <Dialog open={open}  aria-labelledby="form-dialog-title">
<h1>Hello</h1>
    </Dialog>
  </>)
}

export default PopUpCalender;