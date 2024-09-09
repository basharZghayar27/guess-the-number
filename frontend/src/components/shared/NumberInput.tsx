import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button, Card, CardBody, Col, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export type TNumberInput = {
  label?: string;
  initialValue: number;
  step?: number;
  precision: number;
};

const NumberInput: React.FC<TNumberInput> = ({
  label,
  initialValue = 0,
  step = 1,
  precision = 2,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    setValue((prevValue) => Number((prevValue + step).toFixed(precision)));
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue((prevValue) =>
        Number((prevValue - step).toFixed(precision)) > 0
          ? Number((prevValue - step).toFixed(precision))
          : 0
      );
    }
  };

  return (
    <Card className="bg-dark text-white mb-2">
      <CardBody className="p-2">
        <h6 className=" mb-1">{label}</h6>
        <Row className="mb-3">
          <Col md={2} className="d-flex flex-column">
            <Button
              variant="outline-secondary"
              className="p-0 text-secondary"
              onClick={handleIncrement}
              style={{
                border: "unset",
              }}
            >
              <ChevronUp size={16} />
            </Button>
          </Col>
          <Col md={8} className="d-flex flex-column">
            {value}
          </Col>
          <Col md={2} className="d-flex flex-column">
            <Button
              variant="outline-secondary"
              className="p-0 text-secondary"
              onClick={handleDecrement}
              style={{
                border: "unset",
              }}
            >
              <ChevronDown size={16} />
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default NumberInput;
