import React from "react";
import "./App.css";
import { Card, Col, ConfigProvider, Row, theme } from "antd";
import SignUp from "./components/sign-up/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import RankingBoard from "./components/ranking-board/RankingBoard";
import { useSocket } from "./hooks/use-socket/useSocket";
import ResultCard from "./components/result/Result";
import ChatComponent from "./components/chat/Chat";

const App: React.FC = () => {
  const { isConnected } = useSocket();
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        components: {
          Card: {
            colorBgContainer: "#181b20",
          },
          Button: {
            colorPrimaryBg: "#ff416c",
            colorPrimary: "#fff",
            colorPrimaryHover: "#fff",
            colorBgContainer: "#ff416c",
          },
          Statistic: {
            contentFontSize: 72,
          },
        },
      }}
    >
      <Row gutter={[16, 24]} justify={"space-between"} align={"middle"}>
        <Col md={12} xl={8}>
          <Card style={{ width: "100%" }}>
            {!isConnected ? <SignUp /> : <Dashboard />}
          </Card>
        </Col>
        <Col md={12} xl={16} style={{ height: "461px" }}>
          <Card
            style={{ width: "100%", height: "100%" }}
            styles={{
              body: {
                height: "100%",
              },
            }}
          >
            <ResultCard />
          </Card>
        </Col>
        <Col md={12} lg={12}>
          <Card style={{ width: "100%" }}>
            <RankingBoard />
          </Card>
        </Col>
        <Col md={12} lg={12}>
          <Card style={{ width: "100%" }}>
            <ChatComponent />
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default App;
