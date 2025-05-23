import React from "react";
import "./input-text.css";
import classNames from "classnames";

export const InputText = ({ appearance, value, onChange, className, placeholder, label, required }: IInputTextProps) => {
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={classNames('qis-input', appearance, className)}>
      {label && <div className="qis-input__label">{label}{required ? '*' : ''}</div>}
      <input className="qis-input__input" value={value} onChange={handlerChange} placeholder={placeholder} />
    </div>
  );
};

interface IInputTextProps {
  appearance?: 'default' | 'clear';
  value: string;
  onChange: (str: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}
