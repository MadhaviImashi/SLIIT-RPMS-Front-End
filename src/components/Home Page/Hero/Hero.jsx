import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import mainImg from '../../../assets/main.svg';
import './Hero.css';

const Hero = () => {
  return (
    <Container fluid className="hero-section" id="home">
      <Container className="hero-content">
        <Row>
          <Col md={7} className="hero-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
              Research with easy management and collaboration
            </h1>
            <h4 className="desc">Research management tool for students and academic staff </h4>
          </Col>
          <Col md={5} style={{ paddingBottom: 20 }}>
            <img src={mainImg} alt="Hero image" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
