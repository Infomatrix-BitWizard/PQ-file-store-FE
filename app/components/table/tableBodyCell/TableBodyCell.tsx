"use client";

import React from "react";
import "./table-body-cell.css";

interface ITableBodyCellProps {
  children?: React.ReactNode;
}

const TableBodyCell = ({ children }: ITableBodyCellProps) => {
  return <td className={"table-body-cell"}>{children}</td>;
};

export default TableBodyCell;
