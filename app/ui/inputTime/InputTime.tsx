import React from "react";
import "./input-time.css";
import classNames from "classnames";

interface IInputDateProps {
  value: string;
  onChange: (str: string) => void;
  className?: string;
  placeholder?: string;
}

export const InputTime = ({ value, onChange, className, placeholder }: IInputDateProps) => {
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="time"
      className={classNames("input-time", className)}
      value={value}
      placeholder={placeholder}
      onChange={handlerChange}
    />
  );
};
