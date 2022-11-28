/* eslint-disable object-curly-newline */
import React from "react";
import { useController } from "react-hook-form";
import "./TextArea.scss";

const TextArea = ({
  children,
  name = "",
  row = "",
  control,
  cols = "",
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      className="textarea"
      id={name}
      row={row}
      cols={cols}
      {...field}
      {...props}
    >
      {children}
    </textarea>
  );
};

export default TextArea;
