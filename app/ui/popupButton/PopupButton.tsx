"use client";

import React from "react";
import "./popup-button.css";

interface IPopupButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const PopupButton = ({ children, onClick }: IPopupButtonProps) => {
  return (
    <button
      className={"popup-button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PopupButton;
