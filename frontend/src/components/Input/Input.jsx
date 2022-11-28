/* eslint-disable object-curly-newline */
import React from "react";
import { useController } from "react-hook-form";
import "./Input.scss";

const Input = ({ name = "", type = "text", control, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <input className="input" id={name} type={type} {...field} {...props} />
  );
};

export default Input;
