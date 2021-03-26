import React from "react";
import "./NavBar.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import Logo from "../../assets/800px-Hyundai_Transys_logo.png";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div>
        <Navbar variant="dark" className="NavFirstRow">
          <Navbar.Brand href="/" className="NavLogo">
            <img
              src={Logo}
              width="140"
              height="30"
              className="d-inline-block align-top"
            />
            <label className="logo-text">IT Service Portal</label>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Link to="/login">
                <Button variant="outline-secondary">Sign in</Button>
              </Link>

              <span className="left-margin"></span>

              <Link to="/signup">
                <Button variant="outline-secondary">Sign up</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div>
        <Navbar collapseOnSelect expand="lg" variant="dark" id="NavSecondRow">
          <Nav.Link id="collasible-nav">
            <Link to="/servicerequest" id="textcolorwhite">
              요청/접수
            </Link>
          </Nav.Link>
          <Nav.Link id="collasible-nav">
            <Link to="" id="textcolorwhite">
              요청/접수(처리자)
            </Link>
          </Nav.Link>
          <Nav.Link id="collasible-nav">
            <Link to="" id="textcolorwhite">
              처리이력정보
            </Link>
          </Nav.Link>
          <Nav.Link id="collasible-nav">
            <Link to="" id="textcolorwhite">
              처리이력정보(관리자)
            </Link>
          </Nav.Link>
          <Nav.Link id="collasible-nav">
            <Link to="" id="textcolorwhite">
              나의 결재함
            </Link>
          </Nav.Link>
        </Navbar>
      </div>
    </>
  );
}

export default NavBar;
