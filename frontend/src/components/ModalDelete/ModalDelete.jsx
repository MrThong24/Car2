/* eslint-disable object-curly-newline */
import React from "react";
import Button from "../Button";
import "./ModalDelete.scss";

const ModalDelete = ({ handleDelete, onClickClose, product }) => {
  return (
    <div className="contentModalDelete">
      <div className="contentModalDelete-header">
        <img src="./Shape.png" alt="" />
        <p>
          Bạn có chắc muốn xóa sản phẩm <span>{product.name}</span>?
        </p>
        <p>
          Sản phẩm sẽ bị <span>xóa vĩnh viễn.</span>
        </p>
      </div>
      <div className="contentModalDelete-action">
        <Button
          type="button"
          buttonStyle="btn--close-addProduct"
          onClick={() => onClickClose()}
        >
          Hủy
        </Button>
        <Button
          type="button"
          buttonStyle="btn--error-outline"
          onClick={() => {
            handleDelete(product._id);
          }}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default ModalDelete;
