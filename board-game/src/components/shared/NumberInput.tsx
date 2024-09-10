import React, { useState } from "react";
import { Button, Card, Col, Flex, Space, Typography } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

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
    <Card>
      <Flex vertical gap={4}>
        {label && (
          <>
            <Flex justify="center" align="center">
              <Typography.Text>{label}</Typography.Text>
            </Flex>
          </>
        )}
        <Flex justify="space-between">
          <Button
            onClick={handleDecrement}
            icon={<CaretDownOutlined />}
          ></Button>

          <Space>
            <Col md={12}>{value}</Col>
          </Space>
          <Button onClick={handleIncrement} icon={<CaretUpOutlined />}></Button>
        </Flex>
      </Flex>
    </Card>
  );
};
export default NumberInput;
