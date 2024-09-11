import React from "react";
import { Button, Col, Flex, Row, Slider, Typography } from "antd";
import NumberInput from "../shared/NumberInput";
import ResultTable from "../shared/ResultTable";
import { useDispatch, useSelector } from "react-redux";
import { setRoundPoints, setRoundDetectedValue } from "../../store/playerSlice";
import { useSocket } from "../../hooks/use-socket/useSocket";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { startGame } = useSocket();
  const { currentPlayer } = useSelector((state: any) => {
    return state.player;
  });
  const { isStarted, gameResult } = useSelector((state: any) => {
    return state.game;
  });
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
      dataIndex: "playerName",
      key: "name",
    },
    {
      title: "Round Points",
      dataIndex: "roundPoints",
      key: "points",
    },
    {
      title: "Multiplier",
      dataIndex: "detectedValue",
      key: "multiplier",
    },
  ];
  const setThisRoundPoints = (v: number) => {
    dispatch(setRoundPoints({ betPoints: v }));
  };
  const setThisRoundDetectedValue = (v: number) => {
    dispatch(setRoundDetectedValue({ detectedValue: v }));
  };

  const startRound = () => {
    startGame(
      currentPlayer.playerName,
      currentPlayer.betPoints,
      currentPlayer.detectedValue
    );
  };
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
              setNumberValue={setThisRoundPoints}
            />
          </Col>
          <Col md={12}>
            <NumberInput
              label="Multiplier"
              initialValue={0}
              step={0.25}
              precision={2}
              setNumberValue={setThisRoundDetectedValue}
            />
          </Col>
        </Row>

        <Button
          block
          onClick={startRound}
          disabled={
            currentPlayer.detectedValue <= 0 ||
            currentPlayer.betPoints <= 0 ||
            isStarted
          }
        >
          Start
        </Button>

        <ResultTable
          columns={columns}
          data={gameResult}
          header={"Current Round"}
        />
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
