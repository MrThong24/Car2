import React from "react";
import "./Label.scss";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label className="label" htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

export default Label;
