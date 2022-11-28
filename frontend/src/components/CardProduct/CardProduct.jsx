/* eslint-disable object-curly-newline */
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "../Button/Button";
import "./CardProduct.scss";

const CardProduct = ({ show, handleDeleteConfirm, product }) => {
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: 259 }} className="card-body">
      <CardContent className="card-body__items">
        <img
          className="card-body__image"
          src={`http://localhost:5000/v1/${product.image}`}
          aria-hidden="true"
          alt=""
          onClick={() => {
            history.push(`/homePage/detailProduct/${product._id}`);
          }}
        />
        <h2 className="card-body__name">{product.name}</h2>
        {show ? (
          <p className="card-body__price">{`$ ${product.price.toLocaleString()}`}</p>
        ) : (
          <div className="card-body__action">
            <Button type="button" buttonStyle="btn--success-outline">
              <NavLink to={`/managerProduct/editProduct/${product._id}`}>
                Cập nhật
              </NavLink>
            </Button>
            <Button
              buttonStyle="btn--error-outline"
              onClick={() => {
                handleDeleteConfirm(product._id);
              }}
            >
              Xóa
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardProduct;
