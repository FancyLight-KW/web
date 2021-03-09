import React from "react";
import "./NavBar.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import Logo from "../../800px-Hyundai_Transys_logo.png";
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
          <NavDropdown title="요청/접수" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/servicerequest" id="DropdownWidth">
              요청/접수
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              요청/접수(처리자)
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">처리이력정보</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              처리이력정보(관리자)
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.5">나의 결재함</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="장애관리" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" id="DropdownWidth">
              장애관리
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="변경관리" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" id="DropdownWidth">
              변경관리
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              나의 결재함(변경)
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="통계정보" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" id="DropdownWidth">
              서비스요청 적기접수율
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              서비스요청 적기처리율
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              서비스 만족도
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="게시판" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" id="DropdownWidth">
              공지사항
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">IT정책</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">질의응답</NavDropdown.Item>

            <NavDropdown.Item href="#action/3.4">FAQ</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">자료실</NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </div>
    </>
  );
}

export default NavBar;
