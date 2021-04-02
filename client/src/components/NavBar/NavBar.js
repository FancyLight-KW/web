import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import Logo from "../../assets/800px-Hyundai_Transys_logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import cookie from "react-cookies";
import { logOutUser } from "../../actions/auth";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  margin-right: 40px;
  color: rgb(116, 116, 123);
  font-size: 16px;
  letter-spacing: -0.3px;
`;

function NavBar() {
  //  let dispatch = useDispatch();
  let history = useHistory();
  const [LoginModalVisible, setLoginModalVisible] = useState(false);
  const [RegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLastLogin, setUserLastLogin] = useState(null);

  const userInfos = useSelector((state) => state.auth.userInfos);

  console.log("UserInfo:" + JSON.stringify(userInfos) + userInfos);

  useEffect(() => {
    if (cookie.load("token")) {
      setAuthenticated(true);
      setUserName(
        JSON.stringify(jwt_decode(cookie.load("token")).User_name).split('"')[1]
      );
      setUserLastLogin(
        JSON.stringify(jwt_decode(cookie.load("token")).User_lastlogin).split(
          '"'
        )[1]
      );
    } else {
      setAuthenticated(false);
    }
    //  console.log(cookie.load("token"));
  }, [userInfos]);

  //  console.log(authenticated);

  const loginOpenModal = () => {
    setLoginModalVisible(true);
  };
  const loginCloseModal = () => {
    setLoginModalVisible(false);
  };
  const registerOpenModal = () => {
    setRegisterModalVisible(true);
  };
  const registerCloseModal = () => {
    setRegisterModalVisible(false);
  };
  const logOut = () => {
    cookie.remove("token");
    setAuthenticated(false);
    //  dispatch(logOutUser());
    history.push("/");
  };

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
              {authenticated ? (
                <>
                  <StyledSpan>{userName}</StyledSpan>
                  <StyledSpan>
                    최근 로그인:
                    <h9 style={{ color: "#0069c0", marginLeft: "5px" }}>
                      {userLastLogin}
                    </h9>
                  </StyledSpan>
                </>
              ) : (
                <Button
                  variant="outline-secondary"
                  onClick={registerOpenModal}
                  style={{ marginRight: "5px" }}
                >
                  회원가입
                </Button>
              )}

              {authenticated ? (
                <Button variant="outline-secondary" onClick={logOut}>
                  로그아웃
                </Button>
              ) : (
                <Button variant="outline-secondary" onClick={loginOpenModal}>
                  로그인
                </Button>
              )}

              {LoginModalVisible && (
                <LoginModal
                  visible={LoginModalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={loginCloseModal}
                />
              )}

              {RegisterModalVisible && (
                <RegisterModal
                  visible={RegisterModalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={registerCloseModal}
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div>
        <Navbar collapseOnSelect expand="lg" variant="dark" id="NavSecondRow">
          <Nav.Link id="collasible-nav">
            {authenticated ? (
              <Link to="/servicerequest" id="textcolorwhite">
                요청/접수
              </Link>
            ) : (
              <Link to="/" id="textcolorwhite">
                {" "}
                요청/접수
              </Link>
            )}
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
