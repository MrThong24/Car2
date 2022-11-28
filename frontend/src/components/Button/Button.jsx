/* eslint-disable react/button-has-type */
/* eslint-disable object-curly-newline */
import React from "react";
import "./Button.scss";

const STYLE = [
  "btn--success-outline",
  "btn--error-outline",
  "btn--close-addProduct",
  "btn--add-addProduct",
  "btn--close-editProduct",
  "btn--add-editProduct",
  "btn--update-delete-editProduct",
];

const Button = ({ type = "button", children, buttonStyle, ...props }) => {
  const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];

  return (
    <button type={type} {...props} className={`btn ${checkButtonStyle} `}>
      {children}
    </button>
  );
};

export default Button;
