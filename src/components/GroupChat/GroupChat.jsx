import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  Card,
  Col,
  InputGroup,
  Row,
  Button,
} from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import ChatReceive from "./ChatReceive";
import ChatSend from "./ChatSend";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const groupId = useSelector((state) => state.group.id);
  const senderId = useSelector((state) => state.login.userID);
  const senderName = useSelector((state) => state.login.name);
  const [refresh, setRefresh] = useState(false);

  const ref = useRef();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Required field"),
    }),

    onSubmit: (values) => {
      ref.current?.scrollIntoView();
      fetch("http://localhost:4000/api/chat/sendMessage", {
        method: "POST",
        body: JSON.stringify({
          groupId,
          senderId,
          senderName,
          message: values.message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Registration Failed ! Try again");
          }
        })
        .then((result) => {

          setRefresh((prev) => !prev);

        })
        .catch((err) => {
        });

      formik.handleReset();
    },
  });

  useEffect(() => {
    
    fetch("http://localhost:4000/api/chat/getGroupChat", {
      method: "POST",
      body: JSON.stringify({
        groupId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("fetch Failed");
        }
      })
      .then((result) => {

        setMessages(result.messages[0].messages);

      })
      .catch((err) => {
      });
      
      ref.current?.scrollIntoView();

  }, [refresh, groupId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prev) => !prev);
      console.log("😁 Background chat sync");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Row>
      <Col>
        <Card
          className=" mt-2  pt-3 border-0"
          style={{ width: "100%", height: "50vh", backgroundColor: "white" }}
        >
          {/* chat area */}
          <Row className="">
            <Col xs={1}></Col>
            <div className="col-10" style={{ height: "38vh" }}>
              <PerfectScrollbar
                options={{ suppressScrollX: true, useBothWheelAxes: false }}
              >
                {messages.length > 0 &&
                  messages.map((message, index) => {
                    if (message.senderId === senderId) {
                      return (
                        <ChatSend
                          key={index}
                          message={message.message}
                          name={message.senderName}
                        />
                      );
                    } else {
                      return (
                        <ChatReceive
                          key={index}
                          message={message.message}
                          name={message.senderName}
                        />
                      );
                    }
                  })}
                  <div ref={ref} className="py-3"></div>
              </PerfectScrollbar>
            </div>
            <Col xs={1}></Col>
          </Row>
          <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
            <Row className="mt-2">
              <Col xs={1}></Col>
              <Col
                xs={10}
                className="d-flex  border border-1 p-1 rounded-pill ps-2 pe-3"
              >
                <InputGroup className="">
                  <FormControl
                    placeholder="Type a message"
                    className={`input border-0${
                      formik.touched.message && formik.errors.message
                        ? "input-error"
                        : ""
                    }`}
                    type="text"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />
                </InputGroup>
                <div className="d-flex border border-1 rounded-pill ms-1">
                  <Button
                    variant=""
                    title="Group"
                    type="submit"
                    name="submit"
                    className="rounded-pill"
                  >
                    Send
                  </Button>
                </div>
              </Col>
              <Col xs={1}></Col>
            </Row>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default GroupChat;
