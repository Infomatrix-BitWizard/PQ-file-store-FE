"use client";

import React from "react";
import "./table-head.css";

interface ITableHeadProps {
  children: React.ReactNode;
}

const TableHead = ({ children }: ITableHeadProps) => {
  return (
    <thead className={"table-head"}>
      <tr className={"table-head__row"}>{children}</tr>
    </thead>
  );
};

export default TableHead;
