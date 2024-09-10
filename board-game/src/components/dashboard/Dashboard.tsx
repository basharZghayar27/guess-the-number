import { Button, Col, Flex, Row, Slider, Typography } from "antd";
import React from "react";
import NumberInput from "../shared/NumberInput";
import ResultTable from "../shared/ResultTable";

const Dashboard = () => {
  const data = [
    { Name: "Alice", Points: 150, Multiplier: 1.5 },
    { Name: "Bob", Points: 120, Multiplier: 1.2 },
    { Name: "Charlie", Points: 180, Multiplier: 2.0 },
    { Name: "Diana", Points: 110, Multiplier: 1.1 },
    { Name: "Eve", Points: 200, Multiplier: 2.5 },
  ];
  const speedMarks = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "Points",
      dataIndex: "Points",
      key: "points",
    },
    {
      title: "Multiplier",
      dataIndex: "Multiplier",
      key: "multiplier",
    },
  ];
  return (
    <>
      <Flex vertical gap={8}>
        <Row justify={"space-between"} gutter={16}>
          <Col md={12}>
            <NumberInput
              label="Points"
              initialValue={0}
              step={25}
              precision={0}
            />
          </Col>
          <Col md={12}>
            <NumberInput
              label="Multiplier"
              initialValue={0}
              step={0.25}
              precision={2}
            />
          </Col>
        </Row>

        <Button block>Start</Button>

        <ResultTable columns={columns} data={data} header={"Current Round"} />
        <Flex justify="center" align="center">
          <Typography.Text>{"Game Speed"}</Typography.Text>
        </Flex>
        <Slider
          marks={speedMarks}
          min={1}
          max={5}
          onChange={(val) => console.log(val)}
        />
      </Flex>
    </>
  );
};

export default Dashboard;
