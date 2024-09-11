import React from "react";
import type { StatisticProps } from "antd";
import { Flex, Row, Statistic } from "antd";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

const formatter: StatisticProps["formatter"] = (value) => {

  return (
    <CountUp end={value as number} decimals={2} decimal="." separator="," />
  );
};

const ResultCard: React.FC = () => {
  const { gameBet } = useSelector((state: any) => {
    return state.game;
  });
  return (
    <Flex
      style={{ width: "100%", height: "100%", padding: '8rem 0' }}
      justify={"center"}
      gap={32}
      align={"middle"}
    >
      <Row>
        <Statistic
          title="The Multiplier is:"
          value={gameBet}
          precision={2}
          formatter={formatter}
        />
      </Row>
    </Flex>
  );
};
export default ResultCard;
