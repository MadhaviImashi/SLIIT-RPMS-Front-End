import './Question.css';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Question = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
      <div className="x">
        <Container>
          <Row>
            <Col md="3"></Col>
            <Col md="6">
              <h3 className="align-content-center fw-bold">FAQ</h3>
            </Col>
            <Col md="4"></Col>
          </Row>
          <Row>
            <Col>
              <Card className="shadow p-3 mb-5 bg-body rounded">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Question 1</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do emus
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Question 2</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do emus
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Question 3</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do emus
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Question 4</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do emus
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card>
            </Col>
            <Col className="showall">
              <div
                  className={`${pulsing ? 'pulse' : ''} loadable `}
                  style={{ width: '500px', background: '#ccc' }}>
                <motion.img
                    initial={{ height: '400px', opacity: 0 }}
                    animate={{
                      height: imageLoading ? '400px' : '400px',
                      opacity: imageLoading ? 0 : 1
                    }}
                    transition={
                      ({ height: { delay: 0, duration: 0.4 } },
                          { opacity: { delay: 0.5, duration: 0.4 } })
                    }
                    onLoad={imageLoaded}
                    width="100%"
                    src="https://source.unsplash.com/random/600x500/?university"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default Question;
