"use client";

import React from "react";
import "./table-body-row.css";

interface ITableBodyRowProps {
  children: React.ReactNode;
}

const TableBodyRow = ({ children }: ITableBodyRowProps) => {
  return <tr className={"table-body-row"}>{children}</tr>;
};

export default TableBodyRow;
