import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Card, Col, ConfigProvider, Row, theme } from "antd";
import SignUp from "./components/sign-up/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import RankingBoard from "./components/ranking-board/RankingBoard";
import { useSocket } from "./hooks/use-socket/useSocket";

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
        },
      }}
    >
      <Row gutter={[16, 24]} justify={"space-between"} align={"middle"}>
        <Col md={12} xl={8}>
          <Card style={{ width: "100%" }}>
            {!isConnected ? <SignUp /> : <Dashboard />}
          </Card>
        </Col>
        <Col md={12} xl={16}>
          <Card style={{ width: "100%" }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col md={12} lg={12}>
          <Card style={{ width: "100%" }}>
            <RankingBoard />
          </Card>
        </Col>
        <Col md={12} lg={12}>
          <Card style={{ width: "100%" }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default App;
