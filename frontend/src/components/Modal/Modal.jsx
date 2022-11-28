import { Dialog } from "@mui/material";
import React from "react";

const Modal = ({ children, onClose, open }) => {
  const handleOnClose = () => {
    if (!onClose) return;
    onClose(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};

export default Modal;
