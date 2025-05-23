"use client";

import React from "react";
import "./modal-container.css";

interface IModalContainerProps {
  title: string;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
}

const ModalContainer = ({ children, buttons, title }: IModalContainerProps) => {
  return (
    <div className={"modal-container"}>
      <div className={"modal-container__title"}>{title}</div>
      <div className={"modal-container__body"}>{children}</div>
      <div className={"modal-container__buttons"}>{buttons}</div>
    </div>
  );
};

export default ModalContainer;
