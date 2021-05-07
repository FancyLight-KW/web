import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import cookie from "react-cookies";
import {
  EyeOutlined,
  PlusOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { List } from "antd";

const TopContainer = styled.div`
  display: flex;
  height: 80px;
  background-color: aliceblue;
  color: #0069c0;
  font-weight: bold;
  flex-direction: row;
  border-bottom: solid #0069c0;
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
`;
const Blank = styled.div`
  width: 1%;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;
const BiggerBlank = styled.div`
  width: 5%;
`;
const ManageInetnetContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 40px;
`;

function ManageIntentPage() {
  const { intentid } = useParams();

  let history = useHistory();

  const [intents, setIntents] = useState([]);

  const deleteIntentHandler = (intentID) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete(
          `${process.env.REACT_APP_API_HOST}/scenario/intents/${intentID}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.load("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.resultCode === 0) {
            alert("인텐트가 삭제되었습니다.");
            if (intentID == intentid) {
              history.push("/intentmain");
            } else {
              window.location.reload();
            }
          }
        });
    }
  };

  // Intent Name
  const [intentName, setIntentName] = useState();
  const intentNameHandler = (e) => {
    setIntentName(e.target.value);
  };
  // TrainingPhrases
  const [trainingPhrasesVisible, setTrainingPhrasesVisible] = useState(false);
  const [trainingPhrasesInput, setTrainingPhrasesInput] = useState("");
  const [trainingPhrases, setTrainingPhrases] = useState([
    // {
    //   id: null,
    //   text: "",
    // },
  ]);
  const nextTPId = useRef(0);

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
        id: nextTPId.current,
        text: trainingPhrasesInput,
      };
      if (newTrainingPhrase.id === 0) {
        setTrainingPhrases(trainingPhrases.splice(0, 1));
      }
      setTrainingPhrases(trainingPhrases.concat(newTrainingPhrase));
      setTrainingPhrasesInput("");

      nextTPId.current += 1;
    }
  };
  // Responses
  const [responsesVisible, setResponsesVisible] = useState(false);
  const [responsesInput, setResponsesInput] = useState("");
  const [responses, setResponses] = useState([
    // {
    //   id: null,
    //   response: "",
    // },
  ]);
  const nextResponseId = useRef(0);

  const responsesVisibleHandler = () => {
    setResponsesVisible(!responsesVisible);
  };

  const responsesInputHandler = (e) => {
    setResponsesInput(e.target.value);
  };
  const responsesDeleteHandler = (id) => {
    if (responses.length === 1) {
      setResponses([{ id: null, respond: "" }]);
    } else {
      setResponses(responses.filter((response) => response.id !== id));
    }
  };

  const responsesKeyPress = (e) => {
    if (e.key === "Enter") {
      if (responsesInput === "") {
        return;
      }
      let newResponse = {
        id: nextResponseId.current,
        respond: responsesInput,
      };
      if (newResponse.id === 0) {
        setResponses(responses.splice(0, 1));
      }
      setResponses(responses.concat(newResponse));
      setResponsesInput("");

      nextResponseId.current += 1;
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/scenario/intents`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        setIntents([...response.data]);
      });
  }, []);

  useEffect(() => {
    // intent name 가져오기
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/scenario/intents?id=${intentid}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIntentName(response.data[0].INTENT_TITLE);
      });
  }, [intentid]);

  useEffect(() => {
    // phrases 가져오기
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/scenario/phrases?rid=${intentid}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      )
      .then((response) => {
        //  console.log(response.data);
        response.data.forEach((e) => {
          trainingPhrases.push({
            id: nextTPId.current,
            text: e.PHRASE,
          });
          nextTPId.current += 1;
        });
      });
  }, [intentid]);

  useEffect(() => {
    // responses 가져오기
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/scenario/responses?rid=${intentid}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        response.data.forEach((e) => {
          responses.push({
            id: nextResponseId.current,
            respond: e.RESPONSE,
          });
          nextResponseId.current += 1;
        });
      });
  }, [intentid]);

  const saveHandler = async () => {
    const intentTitle = {
      INTENT_TITLE: intentName,
    };
    let titleResult = await axios.put(
      `${process.env.REACT_APP_API_HOST}/scenario/intents`,
      intentTitle,
      {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    );
    // let intentID = titleResult.data.result[0].INTENT_ID;
    // let intentPhrases = {
    //   data: [],
    // };
    // trainingPhrases.forEach((e) => {
    //   intentPhrases.data.push({ PHRASES_INTENT_ID: intentID, PHRASE: e.text });
    // });

    // let phrasesResult = await axios.post(
    //   `${process.env.REACT_APP_API_HOST}/scenario/phrases`,
    //   intentPhrases,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${cookie.load("token")}`,
    //     },
    //   }
    // );
    // let intentResponses = {
    //   data: [],
    // };
    // responses.forEach((e) => {
    //   intentResponses.data.push({
    //     RESPONSES_INTENT_ID: intentID,
    //     RESPONSE: e.respond,
    //   });
    // });

    // let responseResult = await axios.post(
    //   `${process.env.REACT_APP_API_HOST}/scenario/responses`,
    //   intentResponses,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${cookie.load("token")}`,
    //     },
    //   }
    // );
    // if (
    //   phrasesResult.data.resultCode === 0 &&
    //   responseResult.data.resultCode === 0
    // ) {
    //   alert("인텐트가 수정됐습니다.");
    //   window.location.reload();
    // }
  };

  return (
    <>
      <TopContainer>
        <PageNameWrapper>
          <span style={{ marginLeft: "16px", fontSize: "18px" }}>
            ※ 챗봇 시나리오 관리
          </span>
        </PageNameWrapper>
      </TopContainer>

      <IntentContainer>
        <Blank />
        <TableContainer>
          <List
            size="large"
            bordered
            header={
              <div
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Intent 목록
                <PlusOutlined
                  onClick={() => {
                    history.push("/registerintent");
                  }}
                />
              </div>
            }
            dataSource={intents}
            renderItem={(item) => (
              <List.Item
                extra={
                  <div>
                    <EyeOutlined
                      onClick={() => {
                        history.push(`/manageintent/${item.INTENT_ID}`);
                      }}
                    />
                    <DeleteOutlined
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        deleteIntentHandler(item.INTENT_ID);
                      }}
                    ></DeleteOutlined>
                  </div>
                }
              >
                {item.INTENT_TITLE}
              </List.Item>
            )}
            style={{ marginLeft: "-15px" }}
          ></List>
          <Blank />
        </TableContainer>

        <BiggerBlank />

        <ManageInetnetContainer>
          <Form.Group as={Row} controlId="normalForm">
            <Form.Label
              column
              sm="3"
              className="labelColor"
              style={{ borderRadius: "5px" }}
            >
              Intent name
            </Form.Label>
            <Col sm="7">
              <Form.Control
                type="text"
                value={intentName}
                onChange={intentNameHandler}
              />
            </Col>
            <Button
              variant="primary"
              size="md"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                saveHandler();
              }}
            >
              저장하기
            </Button>
          </Form.Group>
          <Form.Group
            as={Row}
            controlId="normalForm"
            style={{ marginTop: "20px" }}
          >
            <Form.Label
              column
              sm="3"
              className="labelColor"
              style={{ borderRadius: "5px" }}
            >
              Training phrases
            </Form.Label>
            <Col sm="8">
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
            <Form.Label
              column
              sm="3"
              className="labelColor"
              style={{ borderRadius: "5px" }}
            >
              Responses
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={responsesInput}
                placeholder="Enter a text response"
                onChange={responsesInputHandler}
                onKeyPress={responsesKeyPress}
              />
            </Col>

            {responsesVisible ? (
              <CaretUpOutlined
                onClick={() => {
                  responsesVisibleHandler();
                }}
                style={{ fontSize: "20px", marginTop: "10px" }}
              />
            ) : (
              <CaretDownOutlined
                onClick={() => {
                  responsesVisibleHandler();
                }}
                style={{ fontSize: "20px", marginTop: "10px" }}
              />
            )}
          </Form.Group>
          {responsesVisible ? (
            <List
              size="small"
              bordered
              dataSource={responses}
              renderItem={(item) =>
                item.response === "" ? null : (
                  <List.Item
                    extra={
                      <DeleteOutlined
                        onClick={() => {
                          responsesDeleteHandler(item.id);
                        }}
                      />
                    }
                  >
                    {item.respond}
                  </List.Item>
                )
              }
              style={{ marginLeft: "-15px" }}
            ></List>
          ) : null}
        </ManageInetnetContainer>
      </IntentContainer>
    </>
  );
}

export default ManageIntentPage;
