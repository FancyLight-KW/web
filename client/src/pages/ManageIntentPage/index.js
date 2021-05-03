import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Menu, List } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import styled, { css } from "styled-components";

const { SubMenu } = Menu;

const TopContainer = styled.div`
  display: flex;
  height: 80px;
  background-color: aliceblue;
  color: #0069c0;
  font-weight: bold;
  flex-direction: column;
`;
const PageNameWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const IntentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  border-top: solid #0069c0;
`;
const ShowIntent = styled.div`
  display: flex;
  width: 14%;
`;
const BlankBlock = styled.div`
  display: flex;
  width: 10%;
`;
const ManageInetnetContainer = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  margin-top: 15px;
  margin-left: 40px;
`;
const ButtonConatiner = styled.div`
  display: flex;
  width: 10%;
  flex-direction: column;
`;

const ButtonBlock = styled.div`
  margin-top: 15px;
`;

function handleClick(e) {
  // console.log("click", e);
  // console.log(e.key);
}

function ManageIntentPage() {
  // Intent Name
  const [intentName, setIntentName] = useState("");
  const intentNameHandler = (e) => {
    setIntentName(e.target.value);
  };
  // TrainingPhrases
  const [trainingPhrasesVisible, setTrainingPhrasesVisible] = useState(false);
  const [trainingPhrasesInput, setTrainingPhrasesInput] = useState("");
  const [trainingPhrases, setTrainingPhrases] = useState([
    {
      id: null,
      text: "",
    },
  ]);
  const nextId = useRef(0);

  const trainingPhrasesVisibleHandler = () => {
    setTrainingPhrasesVisible(!trainingPhrasesVisible);
  };

  const traingingPhrasesInputHandler = (e) => {
    setTrainingPhrasesInput(e.target.value);
  };
  const traingingPhrasesDeleteHandler = (id) => {
    if (trainingPhrases.length === 1) {
      setTrainingPhrases([{ id: null, text: "" }]);
    } else {
      setTrainingPhrases(trainingPhrases.filter((phrase) => phrase.id !== id));
    }
  };

  // 보낼 때는 trainingPhrases[0].text === "" 이면 안보내도록 ,,?

  const trainingPhrasesKeyPress = (e) => {
    if (e.key === "Enter") {
      if (trainingPhrasesInput === "") {
        return;
      }
      let newTrainingPhrase = {
        id: nextId.current,
        text: trainingPhrasesInput,
      };
      if (newTrainingPhrase.id === 0) {
        setTrainingPhrases(trainingPhrases.splice(0, 1));
      }
      setTrainingPhrases(trainingPhrases.concat(newTrainingPhrase));
      setTrainingPhrasesInput("");

      nextId.current += 1;
    }
  };

  return (
    <>
      <TopContainer>
        <>
          <PageNameWrapper>
            <span style={{ marginLeft: "16px", fontSize: "18px" }}>
              ※ 챗봇 시나리오 관리
            </span>
          </PageNameWrapper>
          <span style={{ marginLeft: "15px", marginBottom: "10px" }}>
            시나리오
          </span>
        </>
      </TopContainer>

      <IntentContainer>
        <ShowIntent>
          <Menu onClick={handleClick} style={{ width: 250 }}>
            <Menu.Item key="5">
              Option 5asdddddddddddddddasdddddddddddddddddddd
            </Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </Menu>
        </ShowIntent>
        <BlankBlock />
        <ManageInetnetContainer>
          <Form.Group as={Row} controlId="normalForm">
            <Form.Label column sm="2" className="labelColor">
              Intent name
            </Form.Label>
            <Col sm="5">
              <Form.Control type="text" onChange={intentNameHandler} />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            controlId="normalForm"
            style={{ marginTop: "20px" }}
          >
            <Form.Label column sm="2" className="labelColor">
              Training phrases
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                value={trainingPhrasesInput}
                placeholder="Add user expression"
                onChange={traingingPhrasesInputHandler}
                onKeyPress={trainingPhrasesKeyPress}
              />
            </Col>
            {trainingPhrasesVisible ? (
              <CaretUpOutlined
                onClick={() => {
                  trainingPhrasesVisibleHandler();
                }}
                style={{ fontSize: "20px", marginTop: "10px" }}
              />
            ) : (
              <CaretDownOutlined
                onClick={() => {
                  trainingPhrasesVisibleHandler();
                }}
                style={{ fontSize: "20px", marginTop: "10px" }}
              />
            )}
          </Form.Group>
          {trainingPhrasesVisible ? (
            <List
              size="small"
              bordered
              dataSource={trainingPhrases}
              renderItem={(item) =>
                item.text === "" ? null : (
                  <List.Item
                    extra={
                      <DeleteOutlined
                        onClick={() => {
                          traingingPhrasesDeleteHandler(item.id);
                        }}
                      />
                    }
                  >
                    {item.text}
                  </List.Item>
                )
              }
              style={{ marginLeft: "-15px" }}
            ></List>
          ) : null}

          <Form.Group
            as={Row}
            controlId="normalForm"
            style={{ marginTop: "20px" }}
          >
            <Form.Label column sm="2" className="labelColor">
              Responses
            </Form.Label>
          </Form.Group>
        </ManageInetnetContainer>

        <ButtonConatiner>
          <ButtonBlock>
            <Button variant="primary" size="md" onClick={() => {}}>
              저장하기
            </Button>
          </ButtonBlock>
        </ButtonConatiner>
      </IntentContainer>
    </>
  );
}

export default ManageIntentPage;
