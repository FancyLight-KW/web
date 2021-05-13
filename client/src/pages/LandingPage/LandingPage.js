import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import styled from "styled-components";
import { Row, Col, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "../../components/LoginModal";
import ITServiceImg from "../../assets/ITSP.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import cookie from "react-cookies";
import dotenv from "dotenv";
const env = dotenv.config();

const LandingWrapper = styled.div`
  overflow: hidden;
`;
const FirstRowContainer = styled.div`
  margin-top: 20px;
  height: 300px;
`;
const SecondRowContainer = styled.div`
  margin-top: 20px;
`;
const ThridRowContainer = styled.div`
  height: 200px;
`;
const ImageContainer = styled.div`
  background-color: #e0f6ff;
  text-align: center;
`;
const FastBox = styled.div`
  background-color: #23adeb;
  height: 300px;
  color: white;
  text-align: center;
  line-height: 280px;
  font-weight: bold;
  font-size: large;
  background-color: ${(props) =>
    props.typeOf === "fastSR" ? "#23adeb" : "#ffc600"};
`;
const LiBox = styled.div`
  text-align: start;
  margin-top: 12.5px;
  margin-left: 10px;
  font-size: 15px;
`;
const OABox = styled.div`
  text-align: center;
  font-size: 23px;
  font-weight: 300px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const RestBox = styled.div`
  text-align: center;
  font-size: 12px;
`;
const CountBox = styled.div`
  display: inline-flex;
  font-size: 60px;
  color: ${(props) =>
    props.type === "접수대기"
      ? "black"
      : props.type === "접수완료"
      ? "#65b67f"
      : props.type === "요청처리중"
      ? "#488dc0"
      : "#f9816c"};
`;

function LandingPage() {
  const [CSRInfos, setCSRInfos] = useState([]);
  const [CSRCount, setCSRCount] = useState("0");
  const [authenticated, setAuthenticated] = useState(false);
  const [LoginModalVisible, setLoginModalVisible] = useState(false);
  //  const userInfos = useSelector((state) => state.auth.userInfos);
  const csrStatusTypes = [
    {
      id: 0,
      text: "접수대기",
    },
    {
      id: 1,
      text: "접수완료",
    },
    {
      id: 2,
      text: "요청처리중",
    },
    {
      id: 3,
      text: "처리완료",
    },
  ];

  useEffect(() => {
    if (cookie.load("token")) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    //   console.log(cookie.load("token"));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/csrstatus`)
      .then((response) => {
        console.log(response);
        let tmp = [];
        csrStatusTypes.forEach((e) => {
          tmp.push({
            typeName: e.text,
            count:
              response.data[e.text] === undefined ? 0 : response.data[e.text],
          });
        });
        setCSRInfos(tmp);
        countCSR(response.data);
      });
  }, []);

  const loginOpenModal = () => {
    setLoginModalVisible(true);
    console.log(CSRInfos);
  };
  const loginCloseModal = () => {
    setLoginModalVisible(false);
  };

  const countCSR = (val) => {
    let count = 0;
    Object.values(val).forEach((e) => {
      count += e;
    });
    setCSRCount(count);
  };

  return (
    <>
      <LandingWrapper>
        <FirstRowContainer>
          <Row>
            <Col xs={12} md={8}>
              <ImageContainer>
                <img src={ITServiceImg} width="72%" height="300px"></img>
              </ImageContainer>
            </Col>

            <Col xs={3} md={2} id="padding-zero">
              {cookie.load("token") ? (
                <Link to="/itsr">
                  <FastBox id="padding-zero" typeOf="fastSR">
                    {" "}
                    빠른 요청/접수
                  </FastBox>
                </Link>
              ) : (
                <FastBox
                  id="padding-zero"
                  typeOf="fastSR"
                  onClick={loginOpenModal}
                >
                  {" "}
                  빠른 요청/접수
                </FastBox>
              )}
              {LoginModalVisible && (
                <LoginModal
                  visible={LoginModalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={loginCloseModal}
                />
              )}
            </Col>
            <Col xs={3} md={2} id="padding-zero">
              <FastBox>공지사항</FastBox>
            </Col>
          </Row>
        </FirstRowContainer>
        <SecondRowContainer>
          <Row>
            <Col xs={12} md={8}>
              <CardGroup style={{ height: "200px" }}>
                <Card
                  style={{
                    width: "14rem",
                    backgroundColor: "#ffffb6",
                  }}
                >
                  <Card.Body>
                    <div>
                      <Card.Title style={{ fontWeight: "600" }}>
                        결제 건수
                      </Card.Title>

                      <Card.Text>
                        <div
                          style={{
                            display: "inline-flex",
                            fontSize: "60px",
                            color: "#bfbf34",
                          }}
                        >
                          {CSRCount}
                        </div>
                        <div
                          style={{
                            marginTop: "38px",
                            display: "inline-flex",
                            color: "#727272",
                            fontSize: "28px",
                          }}
                        >
                          건
                        </div>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
                {CSRInfos.map((type, index) => (
                  <Card
                    key={index}
                    style={{
                      width: "14rem",
                      backgroundColor:
                        type.typeName === "접수대기"
                          ? "#f2f4f6"
                          : type.typeName === "접수완료"
                          ? "#e5f5e5"
                          : type.typeName === "요청처리중"
                          ? "#dbf5fe"
                          : "#fff0ee",
                    }}
                  >
                    <Card.Body>
                      <Card.Title style={{ fontWeight: "600" }}>
                        {type.typeName}
                      </Card.Title>
                      <Card.Text>
                        <CountBox type={type.typeName}>{type.count}</CountBox>
                        <div
                          style={{
                            marginTop: "38px",
                            display: "inline-flex",
                            color: "#727272",
                            fontSize: "28px",
                          }}
                        >
                          건
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </CardGroup>
            </Col>

            <Col xs={6} md={4} id="padding-zero">
              <CardGroup style={{ height: "200px" }}>
                <Card
                  style={{
                    width: "14rem",
                  }}
                >
                  <Card.Body>
                    <OABox> OA 서비스 센터 </OABox>

                    <RestBox>
                      PC/노트북 워크스테이션 활용
                      <br />
                      전산소모품 지급, 전산장비 대여
                      <br />
                      IP발급, 인터넷/영상회의/메신저 활용 등
                      <br />
                      <div style={{ color: "red" }}>
                        {" "}
                        긴급건 제외, IT서비스포털 접수 필요
                      </div>
                    </RestBox>
                  </Card.Body>
                </Card>
                <Card>
                  <LiBox>
                    <li>오토웨이 지원(031-369-9980)</li>
                  </LiBox>
                  <LiBox>
                    <li>동탄/판교(031-369-9980)</li>
                  </LiBox>
                  <LiBox>
                    <li>성연(041-661-7325)</li>
                  </LiBox>
                  <LiBox>
                    <li>지곡(041-661-3712)</li>
                  </LiBox>
                  <LiBox>
                    <li>화성(031-369-5100)</li>
                  </LiBox>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </SecondRowContainer>
        <ThridRowContainer>
          <Row>
            <Col></Col>
          </Row>
        </ThridRowContainer>
      </LandingWrapper>
    </>
  );
}

export default LandingPage;
