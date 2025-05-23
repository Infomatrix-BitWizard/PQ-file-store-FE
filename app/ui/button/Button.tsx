import React from "react";
import classNames from "classnames";
import "./button.css";

interface ButtonProps {
  onClick?: () => void;
  style?: any,
  children?: React.ReactNode;
  className?: string;
  componentType?: "button" | "label";
}

export const Button: React.FC<ButtonProps> = ({ style, children, onClick, className, componentType }) => {
  if (componentType === "label") {
    return (
      <label
        style={style}
        onClick={onClick}
        className={classNames("qis-button white", className)}
      >
        {children}
      </label>
    );
  }

  return (
      <button
        style={style}
        onClick={onClick}
        className={classNames("qis-button white", className)}
      >
        {children}
      </button>
  );
};
