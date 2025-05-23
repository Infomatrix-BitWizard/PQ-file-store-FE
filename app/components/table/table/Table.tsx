"use client";

import React, { useCallback } from "react";
import "./table.css";

interface ITableProps {
  children: React.ReactNode;
  columns: number;
}

const Table = ({ children, columns = 1 }: ITableProps) => {
  const generateColumns = useCallback(() => {
    let gridTemplateColumns = "minmax(150px, 1fr)";

    if (columns > 1) {
      for (let i = 0; i < columns - 1; i++) {
        gridTemplateColumns += " minmax(150px, 1.67fr)";
      }
    }

    return gridTemplateColumns;
  }, [columns]);

  return (
    <div className={"table-wrapper"}>
      <table
        className={"table"}
        style={{
          gridTemplateColumns: generateColumns(),
        }}
      >
        {children}
      </table>
    </div>
  );
};

export default Table;
