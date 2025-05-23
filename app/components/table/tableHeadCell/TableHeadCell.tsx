"use client";

import React from "react";
import "./table-head-cell.css";

interface ITableHeadCellProps {
  children?: React.ReactNode;
}

const TableHeadCell = ({ children }: ITableHeadCellProps) => {
  return <th className={"table-head-cell"}>{children}</th>;
};

export default TableHeadCell;
