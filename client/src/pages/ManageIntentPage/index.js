import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import cookie from "react-cookies";
import {
  EyeOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { List } from "antd";
import arrow from "../../assets/arrow.png";

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
  width: 40%;
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
//   font-size: ${(props) => (props.fontSize === "big" ? "32px" : "16px")};
function ManageIntentPage() {
  let history = useHistory();
  const { intentname } = useParams();
  const [intents, setIntents] = useState([]);
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
            if (intentName === intentname) {
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
  // const intentNameHandler = (e) => {
  //   setIntentName(e.target.value);
  // };
  // TrainingPhrases
  const [trainingPhrasesVisible, setTrainingPhrasesVisible] = useState(false);
  const [trainingPhrasesInput, setTrainingPhrasesInput] = useState("");
  const [trainingPhrases, setTrainingPhrases] = useState([]);
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
  const [responses, setResponses] = useState([]);
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
    // 전체 데이터
    axios
      .get(`${process.env.REACT_APP_API_HOST}/dialogflow/listIntent`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.result);
        setIntents([...response.data.result]);
        //      setIntentName(response.data.result.intentName);
        setIntentName(intentname);
        let indexOfResult;
        for (let i = 0; i < response.data.result.length; i++) {
          if (response.data.result[i].intentName === intentname) {
            indexOfResult = i;
            break;
          }
        }
        console.log(response.data.result[indexOfResult]);
        console.log(typeof response.data.result[indexOfResult]);
        if (response.data.result[indexOfResult].trainingPhrases === undefined) {
          setTrainingPhrases([{ id: null, text: "" }]);
        } else {
          let tmp = [];
          response.data.result[indexOfResult].trainingPhrases.forEach((e) => {
            tmp.push({
              id: nextTPId.current,
              text: e,
            });
            nextTPId.current += 1;
          });
          setTrainingPhrases(tmp);
        }
        if (response.data.result[indexOfResult].messageTexts === undefined) {
          setResponses([{ id: null, respond: "" }]);
        } else {
          let tmp2 = [];
          response.data.result[indexOfResult].messageTexts.forEach((e) => {
            tmp2.push({
              id: nextResponseId.current,
              respond: e,
            });
            nextResponseId.current += 1;
          });
          setResponses(tmp2);
        }
      });
  }, [intentname]);

  const saveHandler = async () => {
    let intentPhrasesToDialogflow = [];
    trainingPhrases.forEach((e) => {
      intentPhrasesToDialogflow.push(e.text);
    });

    let intentResponsesToDialogflow = [];
    responses.forEach((e) => {
      intentResponsesToDialogflow.push(e.respond);
    });
    let updatedIntent = {
      displayName: intentName,
      updatedTrainingPhrasesParts: intentPhrasesToDialogflow,
      updatedMessageTexts: intentResponsesToDialogflow,
    };
    let manageDialogflow = await axios.post(
      `${process.env.REACT_APP_API_HOST}/dialogflow/updateIntent`,
      updatedIntent,
      {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    );
    if (manageDialogflow.data.resultCode === 0) {
      alert("인텐트가 수정됐습니다.");
      window.location.reload();
    }else{
      alert("인텐트를 수정하지 못했습니다. 입력한 내용을 한번 더 확인해주세요.");
    }
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
                      <>
                        {item.text}
                        <DeleteOutlined
                          onClick={() => {
                            traingingPhrasesDeleteHandler(item.id);
                          }}
                        />
                      </>
                    }
                  ></List.Item>
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
                      <>
                        {item.respond}
                        <DeleteOutlined
                          onClick={() => {
                            responsesDeleteHandler(item.id);
                          }}
                        />
                      </>
                    }
                  ></List.Item>
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
