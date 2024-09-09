import React from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import {
  changeConnectionStatusAction,
  setUserNameAction,
} from "../../store/user/userAaction";
import { useAppDispatch } from "../../store";

const SignUp = () => {
  const [userName, setUsername] = React.useState("");
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Card className="bg-dark text-light mb-3 flex-grow-1">
        <Card.Body>
          <Stack direction="vertical" gap={3}>
            <Card.Title className="m-5">Welcome</Card.Title>
            <Form
              className="d-grid"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(setUserNameAction({ userName }));
                dispatch(changeConnectionStatusAction({ val: true }));
              }}
            >
              <Form.Group className="m-3">
                <Form.Label className="mx-5">
                  {"Please Insert Your Name"}
                </Form.Label>
                <Form.Control
                  type="text"
                  className="bg-dark text-light"
                  onChange={(v) => {
                    setUsername(v.target.value);
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="m-3"
                type="submit"
                disabled={userName.length < 3}
              >
                Accept
              </Button>
            </Form>
          </Stack>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default SignUp;
