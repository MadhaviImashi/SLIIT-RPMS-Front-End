import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.css';
import logo from '../../assets/Logo.svg';
import { useNavigate } from "react-router-dom";

const Head = () => {
  const [expand, setexpand] = React.useState(false);
  const [pathstate, setpathstate] = React.useState('#home');
  let navigate = useNavigate();
  window.onscroll = function () {
    if (window.pageYOffset === 0) {
      setpathstate('#home');
    }
  };

  React.useEffect(() => {
    const element = document.getElementById(pathstate);
    if (element) {
      element.scrollIntoView();
    }
  }, [pathstate]);

  const click=()=>{
    navigate("/login")
  }

  return (
      <Navbar expanded={expand} fixed="top" expand="md" className={'navbar'}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} className="img-fluid logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              onClick={() => setexpand(expand ? false : 'expanded')}>
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" defaultActiveKey="#home" id="items">
              <Nav.Item>
                <Nav.Link onClick={(() => setexpand(false), () => setpathstate('#home'))}>
                  <p /> Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={(() => setexpand(false), () => setpathstate('#about'))}>
                  <p /> About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={(() => setexpand(false), () => setpathstate('#faq'))}>
                  <p /> FAQ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <button className="bn632-hover bn26" onClick={click}>
                  Login
                </button>

              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default Head;











