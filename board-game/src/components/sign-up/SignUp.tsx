import React from "react";
import {
  changeConnectionStatusAction,
  setUserNameAction,
} from "../../store/user/userAaction";
import { useAppDispatch } from "../../store";
import { Button, Flex, Input, Row, Typography } from "antd";
import { useSocket } from "../../hooks/use-socket/useSocket";
const { Text, Title } = Typography;

const SignUp = () => {
  const [userName, setUsername] = React.useState("");
  const dispatch = useAppDispatch();
  const { createPlayer } = useSocket();

  const onChange = (e: string) => {
    setUsername(e);
  };
  function register() {
    createPlayer(userName);
    dispatch(setUserNameAction({ userName }));
    dispatch(changeConnectionStatusAction({ val: true }));
  }
  return (
    <React.Fragment>
      <Flex vertical gap={32}>
        <Row justify={"center"} align={"top"}>
          <Title>Welcome</Title>
        </Row>
        <Row justify={"center"} align={"middle"}>
          <Text>{"Please Insert Your Name"}</Text>
        </Row>
        <Row justify={"center"} align={"middle"}>
          <Input
            size="large"
            showCount
            value={userName}
            maxLength={20}
            onChange={(e) => onChange(e.target.value)}
          />
        </Row>
        <Row justify={"center"} align={"middle"}>
          <Button
            block
            size="large"
            disabled={userName.length < 3}
            onClick={register}
          >
            {"Accept"}
          </Button>
        </Row>
      </Flex>
    </React.Fragment>
  );
};

export default SignUp;
