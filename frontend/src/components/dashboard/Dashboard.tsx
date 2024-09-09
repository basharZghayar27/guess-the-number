import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import NumberInput from "../shared/NumberInput";
import ResultTable from "../shared/ResultTable";
import SpeedSlider from "../shared/SpeedSlider";

const Dashboard: React.FC = () => {
  const data = [
    { Name: "Alice", Points: 150, Multiplier: 1.5 },
    { Name: "Bob", Points: 120, Multiplier: 1.2 },
    { Name: "Charlie", Points: 180, Multiplier: 2.0 },
    { Name: "Diana", Points: 110, Multiplier: 1.1 },
    { Name: "Eve", Points: 200, Multiplier: 2.5 },
  ];
  console.log();
  
  return (
    <Card className="bg-dark text-light mb-3 flex-grow-1">
      <Card.Body>
        <Row className="mb-3">
          <Col xs={6}>
            <NumberInput
              label="Points"
              initialValue={0}
              step={25}
              precision={0}
            />
          </Col>
          <Col xs={6}>
            <NumberInput
              label="Multiplier"
              initialValue={0}
              step={0.25}
              precision={2}
            />
          </Col>
        </Row>

        <Button
          className="mb-3 w-100"
          style={{
            background: "linear-gradient(to right, #ff416c, #ff4b2b)",
            border: "unset",
          }}
        >
          Start
        </Button>
        <ResultTable
          columns={Object.keys(data[0])}
          data={data}
          header="Current round"
        />
        <SpeedSlider />
      </Card.Body>
    </Card>
  );
};
export default Dashboard;
