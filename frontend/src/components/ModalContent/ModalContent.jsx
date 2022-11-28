import React from "react";
import "./ModalContent.scss";

const ModalContent = ({ title, image, onClickClose }) => {
  const handelOnClickClose = () => {
    onClickClose();
  };
  return (
    <div className="modal">
      <div className="modal-header">
        <i
          className="bx bx-x-circle"
          onClick={() => handelOnClickClose()}
          aria-hidden="true"
        />
      </div>
      <div className="modal-center">
        <img src={image} alt="" className="modal-content__image" />
        <p className="modal-content__title">{title}</p>
      </div>
    </div>
  );
};

export default ModalContent;
