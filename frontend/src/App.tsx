import React from "react";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import SignUp from "./components/sign-up/SignUp";
import { Provider, useSelector } from "react-redux";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  const isConnected = useSelector(
    (state: any) => state?.userStore?.isConnected
  );
  return (
    <div className="App">
      <Container fluid className="bg-dark text-light vh-100 p-5">
        <Row className="mb-3" style={{ height: "calc(65% - 0.5rem)" }}>
          <Col md={4} className="d-flex flex-column">
            {!isConnected ? <SignUp /> : <Dashboard />}
          </Col>
          <Col md={8} className="d-flex flex-column">
            <Card className="bg-dark text-light mb-3 flex-grow-1">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="display-1 mb-4">0.00x</h1>
                <div className="w-100 bg-secondary" style={{ height: "2px" }}>
                  <div
                    className="bg-warning"
                    style={{ width: "10%", height: "100%" }}
                  ></div>
                </div>
                <div className="w-100 d-flex justify-content-between mt-2">
                  {[...Array(11)].map((_, index) => (
                    <span key={index}>{index}</span>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ height: "calc(35% - 0.5rem)" }}>
          <Col md={6} className="d-flex flex-column">
            <Card className="bg-dark text-light h-100">
              <Card.Body>
                <Card.Title>Ranking</Card.Title>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex flex-column">
            <Card className="bg-dark text-light h-100">
              <Card.Body>
                <Card.Title>Chat</Card.Title>
                <div
                  className="chat-area"
                  style={{ height: "150px", overflowY: "auto" }}
                >
                  {/* Chat messages would go here */}
                </div>
                <Form className="mt-3 d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    className="me-2"
                  />
                  <Button variant="danger">Start</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
