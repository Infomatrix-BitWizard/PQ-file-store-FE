"use client";

import React from "react";
import "./popup-container.css";

interface IPopupContainerProps {
  children?: React.ReactNode;
}

const PopupContainer = ({ children }: IPopupContainerProps) => {
  return (
    <div className={"popup-container"}>
      {children}
    </div>
  );
};

export default PopupContainer;
