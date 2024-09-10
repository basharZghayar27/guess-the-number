import React from "react";
import { Flex, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export type TResultTable<T> = {
  columns: ColumnsType<T>; // Correct type for columns
  data: T[]; // Data array should match the generic type T
  header?: string; // Optional header
};

const ResultTable = <T extends object>({
  columns,
  data,
  header,
}: TResultTable<T>) => {
  return (
    <>
      <Flex vertical justify="center" align="center">
        {header && <p>{header}</p>}
      </Flex>
      <Table
        bordered
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};

export default ResultTable;
