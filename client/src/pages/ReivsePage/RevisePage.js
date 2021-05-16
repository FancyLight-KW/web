import React, { useState, useEffect } from "react";
import "./RevisePage.css";
import { Row, Col, Button } from "react-bootstrap";
import styled, { css } from "styled-components";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router";
import { Radio } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import axios from "axios";
import Datepicker from "../../components/Datepicker";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import dotenv from "dotenv";
dotenv.config();

// border: 1px solid black;
const ITSRBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px 0 40px;
  border-radius: 5px;
`;
const Header = styled.span`
  font-weight: 700;
  color: #0069c0;
  font-size: 20px;
  margin-left: -15px;
  margin-bottom: 20px;
`;
const RadioBlock = styled.div`
  position: relative;
  top: 8px;
`;
const MarginBlock = styled.div`
  position: relative;
  top: 5px;
  right: 10px;
`;
const InfoBlock = styled.div`
  font-weight: 600;
  margin: 5px 0 0 3px;
`;

function RevisePage() {
  let history = useHistory();
  const { reqNo } = useParams();
  console.log(reqNo);

  //
  const [Requests, setRequests] = useState([{}]);
  const [userName, setUserName] = useState("홍길동");
  let Username;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/requests/search?reqNo=${reqNo}`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response);

        setRequests([...response.data]);
        setTitle(response.data[0].TITLE);
        setContent(response.data[0].CONTENT);
        setTMApprovalReqYN(response.data[0].TM_APPROVAL_REQ_YN);
        //setRequests([...response.data]);
        //    Username = Requests[0].REG_USER.User_name;
        setUserName(response.data[0].REG_USER.User_name);
        setReqFinishDate(response.data[0].REQ_FINISH_DATE);
      });
  }, []);

  const 법인코드 = "법인코드";
  const CSR진행상태 = "접수";
  const 임시저장 = "w";

  const [TargetCode, setTargetCode] = useState("업무시스템");
  const [SystemGroupCode, setSystemGroupCode] = useState("test");
  const [TMApprovalReqYN, setTMApprovalReqYN] = useState("N");
  const [CheckboxData, setCheckboxData] = useState("false");
  const [Title, setTitle] = useState();
  const [Content, setContent] = useState("");
  const [File, setFile] = useState("");
  const [changeDate, setChangeDate] = useState(false);
  const [ReqFinishDate, setReqFinishDate] = useState();
  // const dateChanger = (date) => {
  //   let year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   let day = date.getDate();

  //   month = month > 9 ? month : "0" + month;
  //   day = day > 9 ? day : "0" + day;

  //   return String(year + month + day);
  // };
  // Error
  const [titleError, setTitleError] = useState({});
  const [contentError, setConentError] = useState({});
  const [dateError, setDateError] = useState({});

  const formValidation = () => {
    // validation
    const titleError = {};
    const contentError = {};
    const dateError = {};
    let isValid = true;
    if (Title === "") {
      isValid = false;
      titleError.mustInput = "제목을 입력해주세요.";
    }
    if (Content === "") {
      isValid = false;
      contentError.mustInput = "내용을 입력해주세요.";
    }
    if (!ReqFinishDate) {
      isValid = false;
      dateError.mustSelect = "희망완료일을 설정해주세요.";
    }
    setTitleError(titleError);
    setConentError(contentError);
    setDateError(dateError);
    return isValid;
  };

  const targetCodeHandler = (e) => {
    console.log(e.target.value);
    setTargetCode(e.target.value);
  };

  const dropdownOnChange = (e) => {
    console.log(e.target.value);
    setSystemGroupCode(e.target.value);
  };

  const tMApporvalonChange = (e) => {
    setCheckboxData(!CheckboxData);
    if (CheckboxData) {
      setTMApprovalReqYN("Y");
    } else {
      setTMApprovalReqYN("N");
    }
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const finishDateHandler = (date) => {
    setReqFinishDate(date);
    // console.log("ReqFinishDate" + ReqFinishDate);
  };
  const changeDateHandler = () => {
    setChangeDate(true);
    setReqFinishDate(false);
  };

  const fileHandler = (e) => {
    // let file = e.target.files[0];
    // console.log(file.name);

    setFile(e.target.files[0]);
    //console.log(File);
    //setFile(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(ReqFinishDate);

    let isValid = formValidation();
    if (isValid === false) {
      return;
    }
    const formData = new FormData();

    let body = JSON.stringify({
      REQ_SEQ: reqNo,
      TITLE: Title,
      CONTENT: Content,
      CORP_CODE: 법인코드,
      TARGET_CODE: TargetCode,
      SYSTEM_GROUP_CODE: SystemGroupCode,
      TM_APPROVAL_REQ_YN: TMApprovalReqYN,
      CSR_STATUS: Requests[0].CSR_STATUS,
      REQ_FINISH_DATE: ReqFinishDate,
      MOD_USER_ID: Requests[0].MOD_USER_ID,
      REQ_IMG_PATH: Requests[0].REQ_IMG_PATH,
      createdAt: Requests[0].createdAt,
      updatedAt: Requests[0].updatedAt,
      REG_USER: Requests[0].REG_USER.User_name,
    });

    console.log("a" + Requests[0].REG_USER.User_name);

    formData.append("imagefile", File);
    formData.append("body", body);
    // console.log("수정" + formData);
    // console.log("수정" + body);
    //  console.log("Added" + body);

    axios
      .put(`${process.env.REACT_APP_API_HOST}/requests/${reqNo}`, formData, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.resultcode === 0) {
          alert("수정되었습니다.");
          history.push("/mysr");
        }
      });
  };

  return (
    <ITSRBlock>
      <Header>※ 나의 요청 수정</Header>
      <Form.Group as={Row} controlId="normalForm">
        <Form.Label column sm="1" className="labelColor">
          요청자
        </Form.Label>
        <label className="marginleft" />

        <InfoBlock>{userName}</InfoBlock>
      </Form.Group>
      <Form.Group as={Row} controlId="normalForm">
        <Form.Label column sm="1" className="labelColor">
          요청 등록일
        </Form.Label>
        <label className="marginleft" />
        <InfoBlock>{(Requests[0].createdAt || "").split(" ")[0]} </InfoBlock>
      </Form.Group>
      <form>
        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            문의대상
          </Form.Label>
          <label className="marginleft" />
          <InfoBlock>{Requests[0].TARGET_CODE}</InfoBlock>
        </Form.Group>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            팀장 승인
          </Form.Label>
          <label className="marginleft" />
          <InfoBlock>
            {Requests[0]["TM_APPROVAL_REQ_YN"] === "Y" ? "Y" : "N"}
          </InfoBlock>
        </Form.Group>

        <br></br>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            제목
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" onChange={titleHandler} value={Title} />
            {Object.keys(titleError).map((key) => {
              return (
                <div style={{ color: "red", fontSize: "13px" }}>
                  {titleError[key]}
                </div>
              );
            })}
          </Col>
        </Form.Group>

        <br></br>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            요청내용
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              maxLength="500"
              required
              rows={5}
              onChange={contentHandler}
              value={Content}
            />
            {Object.keys(contentError).map((key) => {
              return (
                <div style={{ color: "red", fontSize: "13px" }}>
                  {contentError[key]}
                </div>
              );
            })}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            희망완료일
          </Form.Label>

          {changeDate ? (
            <Col sm="2">
              <MarginBlock>
                <Datepicker change={finishDateHandler} />
                {Object.keys(dateError).map((key) => {
                  return (
                    <div
                      style={{
                        color: "red",
                        fontSize: "13px",
                        marginTop: "5px",
                        marginLeft: "7px",
                      }}
                    >
                      {dateError[key]}
                    </div>
                  );
                })}
              </MarginBlock>
            </Col>
          ) : (
            <>
              <Col sm="1">
                <InfoBlock>
                  {(Requests[0].REQ_FINISH_DATE || "").substring(0, 4) +
                    "/" +
                    (Requests[0].REQ_FINISH_DATE || "").substring(4, 6) +
                    "/" +
                    (Requests[0].REQ_FINISH_DATE || "").substring(6, 8)}
                </InfoBlock>
              </Col>
              <Button variant="secondary" size="sm" onClick={changeDateHandler}>
                변경
              </Button>
            </>
          )}
        </Form.Group>

        <br></br>

        <Form.Group as={Row}>
          <Form.Label column sm="1" className="labelColor">
            첨부파일
          </Form.Label>
          <Col sm="5">
            <input
              type="file"
              name="imagefile"
              accept=".gif, .jpg, .png"
              onChange={fileHandler}
            ></input>
            <Form.Text muted>(첨부 가능 파일 확장자: jpg, gif, png)</Form.Text>
          </Col>
        </Form.Group>

        <Button
          variant="primary"
          size="sm"
          id="marginReverse"
          onClick={onSubmitHandler}
        >
          저장
        </Button>
      </form>
    </ITSRBlock>
  );
}
//   onClick={onSubmitHandler}
export default RevisePage;
