/* eslint-disable object-curly-newline */
import React from "react";
import { useController } from "react-hook-form";
import "./Select.scss";

const Select = ({ options, name, control, defaultValue, ...props }) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <select {...field} {...props} className="select">
      <option value={defaultValue} hidden>
        {defaultValue}
      </option>
      {options.map((items) => (
        <option key={items.value} value={items.value}>
          {items.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
