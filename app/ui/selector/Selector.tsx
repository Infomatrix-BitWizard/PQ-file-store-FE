import React from "react";
import "./selector.css";
import classNames from "classnames";

interface IInputTextProps {
  value: string;
  onChange: (str: string) => void;
  className?: string;
  defaultEmpty?: boolean;
  options: {
    value: string;
    name: string;
  }[];
}

export const Selector = ({
  value,
  onChange,
  className,
  options,
  defaultEmpty,
}: IInputTextProps) => {
  const handlerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={classNames("input-text", className)}
      value={value}
      onChange={handlerChange}
    >
      {defaultEmpty && <option value="">--Please choose an option--</option>}

      {options.map(item => (
        <option
          key={item.value}
          value={item.value}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};
