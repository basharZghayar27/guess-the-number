import React, { useState } from "react";
import { Input, Button, List, Typography, Row, Col } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

interface Message {
  id: number;
  user: string;
  content: string;
}

const ChatComponent: React.FC = () => {
  const { isStarted } = useSelector((state: any) => {
    return state.game;
  });
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: "CPU 1", content: "hi guys" },
    { id: 2, user: "CPU 2", content: "Hiiiiiiiii men" },
    { id: 3, user: "CPU 1", content: "I could play this game for hours!" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: "You",
        content: inputValue.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div>
      <List
        dataSource={isStarted ? messages : []}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text
              strong
              style={{ color: item.user === "CPU 1" ? "#ff69b4" : "#00bfff" }}
            >
              {item.user}:
            </Typography.Text>{" "}
            <Typography.Text style={{ color: "#ffffff" }}>
              {item.content}
            </Typography.Text>
          </List.Item>
        )}
        style={{ height: "200px", overflowY: "auto", marginBottom: "10px" }}
      />
      <Row justify={"space-between"}>
        <Col md={21}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            style={{ marginBottom: "10px" }}
            placeholder="Type a message..."
          />
        </Col>
        <Col md={2}>
          <Button icon={<SendOutlined />} onClick={handleSend}>
            Start
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ChatComponent;
