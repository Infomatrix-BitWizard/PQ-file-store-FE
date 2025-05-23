import React from "react";
import "./input-date.css";
import classNames from "classnames";

interface IInputDateProps {
  value: string;
  onChange: (str: string) => void;
  className?: string;
  placeholder?: string;
}

export const InputDate = ({ value, onChange, className, placeholder }: IInputDateProps) => {
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="date"
      className={classNames("input-date", className)}
      value={value}
      placeholder={placeholder}
      onChange={handlerChange}
    />
  );
};
