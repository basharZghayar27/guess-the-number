import React from "react";
import { Card, Table } from "react-bootstrap";

export type TResultTable = {
  columns: Array<string>;
  data: Array<any>;
  header?: string;
};

const ResultTable: React.FC<TResultTable> = ({ columns, data, header }) => {
  return (
    <>
      {header && <Card.Title>{header}</Card.Title>}
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            {columns.map((column) => {
              return <th>{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((_, index) => (
            <tr key={index}>
              {columns.map((column) => {
                return <td>{_[column]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ResultTable;
