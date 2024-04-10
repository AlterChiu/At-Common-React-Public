import React, { useState } from "react";
import "./style.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AtLoading = (props: { isOpen: boolean }) => {
  /*
  


  */
  //#region 對外回傳
  return (
    <Backdrop sx={{ color: "#fff" }} open={props.isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default AtLoading;
