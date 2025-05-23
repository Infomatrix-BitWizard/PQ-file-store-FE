import React from "react";
import "./input-text.css";
import classNames from "classnames";

export const InputText = ({ value, onChange, className, placeholder, label, required }: IInputTextProps) => {
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={classNames('qis-input', className)}>
      {label && <div className="qis-input__label">{label}{required ? '*' : ''}</div>}
      <input className="qis-input__input" value={value} onChange={handlerChange} placeholder={placeholder} />
    </div>
  );
};

interface IInputTextProps {
  value: string;
  onChange: (str: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}
