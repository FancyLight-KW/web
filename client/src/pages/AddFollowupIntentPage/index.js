import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { List } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import styled, { css } from "styled-components";
import cookie from "react-cookies";
import arrow from "../../assets/arrow.png";

const TopContainer = styled.div`
  display: flex;
  height: 80px;
  background-color: aliceblue;
  color: #0069c0;
  font-weight: bold;
  flex-direction: column;
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
const BiggerBlank = styled.div`
  width: 5%;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const ManageInetnetContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 40px;
`;
const Arrow = styled.img`
  margin-top: -10px;
  margin-right: 3px;
  margin-left: ${(props) =>
    props.childDegree === 1
      ? "0px"
      : props.childDegree === 2
      ? "8px"
      : props.childDegree === 3
      ? "16px"
      : props.childDegree === 4
      ? "24px"
      : props.childDegree === 4
      ? "32px"
      : props.childDegree === 5
      ? "40px"
      : "48px"};
`;

function AddFollowupIntentPage() {
  let history = useHistory();
  const [intents, setIntents] = useState([]);
  const { parentName } = useParams();

  const deleteIntentHandler = (intentName) => {
    const displayName = {
      intentName,
    };
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .post(
          `${process.env.REACT_APP_API_HOST}/dialogflow/deleteIntent`,
          displayName,
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
            window.location.reload();
          }
        });
    }
  };

  // Intent Name
  const [intentName, setIntentName] = useState("");
  //   const intentNameHandler = (e) => {
  //     setIntentName(e.target.value);
  //   };
  // TrainingPhrases
  const [trainingPhrasesVisible, setTrainingPhrasesVisible] = useState(false);
  const [trainingPhrasesInput, setTrainingPhrasesInput] = useState("");
  const [trainingPhrases, setTrainingPhrases] = useState([
    {
      id: null,
      text: "",
    },
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
    {
      id: null,
      respond: "",
    },
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

  const saveHandler = async () => {
    // 값입력 안됐을 때 빈값으로 바꿔서 보내기
    if (trainingPhrases[0].text === "") {
      setTrainingPhrases([]);
    }
    if (responses[0].respond === "") {
      setResponses([]);
    }

    let intentPhrasesToDialogflow = [];
    trainingPhrases.forEach((e) => {
      intentPhrasesToDialogflow.push(e.text);
    });

    let intentResponsesToDialogflow = [];
    responses.forEach((e) => {
      intentResponsesToDialogflow.push(e.respond);
    });

    let newIntent = {
      displayName: intentName,
      trainingPhrasesParts: intentPhrasesToDialogflow,
      messageTexts: intentResponsesToDialogflow,
      parentName: parentName,
    };
    let registerDialogflow = await axios.post(
      `${process.env.REACT_APP_API_HOST}/dialogflow/createIntent`,
      newIntent,
      {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    );

    if (registerDialogflow.data.resultCode === 0) {
      alert("Followup 인텐트가 등록됐습니다.");
      window.location.reload();
    } else {
      alert(
        "인텐트를 등록하지 못했습니다. 입력한 내용을 한번 더 확인해주세요."
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/dialogflow/listIntent`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        let indexToFindDegree;
        for (let i = 0; i < response.data.result.length; i++) {
          if (response.data.result[i].intentName === parentName) {
            indexToFindDegree = i;
            break;
          }
        }
        setIntents([...response.data.result]);
        if (response.data.result[indexToFindDegree].cardinalityNum > 0) {
          setIntentName(
            parentName +
              " - custom" +
              String(response.data.result[indexToFindDegree].cardinalityNum + 1)
          );
        }else if (response.data.result[indexToFindDegree].childDegree) {
          // childDegree 있으면 ?
          let customNum = response.data.result[indexToFindDegree].childDegree;
          let customString = " - custom";
          //for (let i = 0; i < customNum; i++) {
          //  customString += " - custom";
          //}
          setIntentName(parentName + customString);
        } else {
          // 없으면
          setIntentName(parentName + " - custom");
        }
      });
  }, [parentName]);

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
                  title="새로운 intent 추가"
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
                  <>
                    <div>
                      {item.childDegree ? (
                        <Arrow
                          src={arrow}
                          width="10"
                          childDegree={item.childDegree}
                        />
                      ) : null}
                      {item.intentName}
                    </div>
                    <div>
                      {!item.childDegree ||
                      (item.childDegree < 6 && item.childDegree > 0) ? (
                        <PlusSquareOutlined
                          title="Followup intent 추가"
                          onClick={() => {
                            history.push(
                              `/addfollowupintent/${item.intentName}`
                            );
                          }}
                        />
                      ) : null}

                      <EyeOutlined
                        title="Intent 수정"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          history.push(`/manageintent/${item.intentName}`);
                        }}
                      />
                      <DeleteOutlined
                        title="Intent 삭제"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          deleteIntentHandler(item.intentName);
                        }}
                      ></DeleteOutlined>
                    </div>
                  </>
                }
              ></List.Item>
            )}
            style={{ marginLeft: "-15px" }}
          ></List>
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
              <Form.Control plaintext readOnly defaultValue={intentName} />
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
                item.respond === "" ? null : (
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
        <Blank />
      </IntentContainer>
    </>
  );
}

export default AddFollowupIntentPage;
