"use client";

import React from "react";
import "./table-body.css";

interface ITableBodyProps {
  children?: React.ReactNode;
}

const TableBody = ({ children }: ITableBodyProps) => {
  return <tbody className={"table-body"}>{children}</tbody>;
};

export default TableBody;
