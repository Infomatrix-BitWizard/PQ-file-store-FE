"use client";

import React from "react";
import "./modal.css";
import classNames from "classnames";
import { createPortal } from "react-dom";

interface IModalProps {
  isOpen: boolean;
  onClose: (status: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export const Modal = ({
                        isOpen,
                        onClose,
                        children,
                        className,
                      }: IModalProps) => {
  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <div className={classNames("modal", className)}>
      <div
        className={"modal__backdrop"}
        onClick={() => onClose(false)}
      />
      <div className={"modal__content"}>{children}</div>
    </div>,
    document.getElementById("modal-root") as Element,
  );
};
