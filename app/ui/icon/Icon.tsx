"use client";

import React from "react";
import "./icon.css";
import classNames from "classnames";

interface IIconProps {
  children?: React.ReactNode;
  className?: string;
  size?: 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32;
}

const Icon = ({ children, className, size = 24 }: IIconProps) => {
  return (
    <span
      className={classNames("icon", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {children}
    </span>
  );
};

export default Icon;
