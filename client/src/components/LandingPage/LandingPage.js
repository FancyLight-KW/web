import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import styled, { css } from "styled-components";
import { Row, Col, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ITServiceImg from "../../assets/ITSP.png";
import axios from "axios";

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
const FastSRBox = styled.div`
  background-color: #23adeb;
  height: 300px;
  color: white;
  text-align: center;
  line-height: 280px;
  font-weight: bold;
  font-size: large;
`;
const MySRBox = styled.div`
  background-color: #ffc600;
  height: 300px;
  color: white;
  text-align: center;
  line-height: 280px;
  font-weight: bold;
  font-size: large;
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

function LandingPage() {
  const [CSRInfos, setCSRInfos] = useState([]);
  const [CSRCount, setCSRCount] = useState("0");

  useEffect(() => {
    // const endpoint = "http://localhost:5000/requests/getAllRequest?";
    axios.get("http://localhost:5000/csrstatus").then((response) => {
      console.log(response);
      setCSRInfos(response.data);
      countCSR(response.data);
    });
  }, []);

  const countCSR = (val) => {
    let count = 0;
    Object.values(val).forEach((e) => {
      count += e;
    });
    setCSRCount(count);
  };

  // {CSRInfos.map((info, index) => (
  //   <Card style={{ width: "14rem" }} key={index}>
  //     <Card.Body>
  //       <Card.Subtitle className="mb-2 text-muted">
  //         Card Subtitle
  //       </Card.Subtitle>
  //       <Card.Text>{info}</Card.Text>
  //     </Card.Body>
  //   </Card>
  // ))}

  return (
    <LandingWrapper>
      <FirstRowContainer>
        <Row>
          <Col xs={12} md={8}>
            <ImageContainer>
              <img src={ITServiceImg} width="72%" height="300px"></img>
            </ImageContainer>
          </Col>

          <Col xs={3} md={2} id="padding-zero">
            <Link to="/itsr">
              <FastSRBox id="padding-zero"> 빠른 요청/접수</FastSRBox>
            </Link>
          </Col>
          <Col xs={3} md={2} id="padding-zero">
            <MySRBox>내 요청목록</MySRBox>
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
                  <Card.Title id="bold">결제 건수</Card.Title>

                  <Card.Text>
                    <div id="text_yellow">{CSRCount}</div>
                    <div id="text_gray">건</div>
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: "14rem", backgroundColor: "#f2f4f6" }}>
                <Card.Body>
                  <Card.Title id="bold">접수 대기중</Card.Title>

                  <Card.Text>
                    <div id="text_black">
                      {CSRInfos.접수대기 ? CSRInfos.접수대기 : "0"}
                    </div>
                    <div id="text_gray">건</div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "14rem", backgroundColor: "#e5f5e5" }}>
                <Card.Body>
                  <Card.Title id="bold">접수완료</Card.Title>

                  <Card.Text>
                    <div id="text_green">
                      {CSRInfos.완료 ? CSRInfos.완료 : "0"}
                    </div>
                    <div id="text_gray">건</div>
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: "14rem", backgroundColor: "#dbf5fe" }}>
                <Card.Body>
                  <Card.Title id="bold"> 요청 처리중</Card.Title>

                  <Card.Text>
                    <div id="text_blue">
                      {CSRInfos.진행 ? CSRInfos.진행 : "0"}
                    </div>
                    <div id="text_gray">건</div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "14rem", backgroundColor: "#fff0ee" }}>
                <Card.Body>
                  <Card.Title id="bold"> 처리 지연중</Card.Title>

                  <Card.Text>
                    <div id="text_red">0</div>
                    <div id="text_gray">건</div>
                  </Card.Text>
                </Card.Body>
              </Card>
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
  );
}

export default LandingPage;
