import React from "react";
import "./Landing.css";
import styled, { css } from "styled-components";
import { Row, Col, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ITServiceImg from "../../assets/ITSP.png";

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
const TextContainer = styled.div`
  height: 100px;
  margin-left: 100px;
  line-height: 100px;
  font-weight: bold;
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

// <TextContainer>
//               <h5>Welcome to </h5>
//               <h2>IT Servic Portal</h2>
//             </TextContainer>
function LandingPage() {
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
            <CardGroup>
              <Card style={{ width: "14rem" }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's contents.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card style={{ width: "14rem" }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "14rem" }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "14rem" }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "14rem" }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col xs={6} md={4}>
            ?
          </Col>
        </Row>
      </SecondRowContainer>
      <ThridRowContainer>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </ThridRowContainer>
    </LandingWrapper>
  );
}

export default LandingPage;
