import React, { useState, useEffect } from "react";
import "./ITSRPage.css";
import { Row, Col, Button } from "react-bootstrap";
import styled, { css } from "styled-components";
import Form from "react-bootstrap/Form";
import { Radio } from "antd";
import { useHistory } from "react-router";
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

function ITSRPage() {
  let history = useHistory();

  const 법인코드 = "법인코드";
  const CSR진행상태 = "접수";
  const 임시저장 = "w";

  const [TargetCode, setTargetCode] = useState("업무시스템");
  const [SystemGroupCode, setSystemGroupCode] = useState("test");
  const [TMApprovalReqYN, setTMApprovalReqYN] = useState("N");
  const [CheckboxData, setCheckboxData] = useState("false");
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [File, setFile] = useState("");
  const [ReqFinishDate, setReqFinishDate] = useState();
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
  };
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let isValid = formValidation();
    if (isValid === false) {
      return;
    }

    const formData = new FormData();

    let body = JSON.stringify({
      TARGET_CODE: TargetCode,
      SYSTEM_GROUP_CODE: SystemGroupCode,
      TM_APPROVAL_REQ_YN: TMApprovalReqYN,
      TITLE: Title,
      CONTENT: Content,
      REQ_FINISH_DATE: ReqFinishDate,
      CORP_CODE: 법인코드,
      CSR_STATUS: "접수대기",
      //  REG_USER_ID: userID,
    });

    formData.append("imagefile", File);
    formData.append("body", body);

    console.log(formData);
    console.log(body);

    axios
      .post(`${process.env.REACT_APP_API_HOST}/requests`, formData, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      });

    alert("요청이 접수되었습니다.");
    history.push("/servicerequest");
  };

  return (
    <ITSRBlock>
      <Header>※ IT서비스 요청</Header>
      <form>
        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            문의대상
          </Form.Label>
          <label className="marginleft" />
          <RadioBlock>
            <Radio.Group onChange={targetCodeHandler} value={TargetCode}>
              <Radio value={"업무시스템"}>업무시스템</Radio>
              <label className="marginleft" />
              <Radio value={"IT인프라"}>IT인프라 </Radio>
              <label className="marginleft" />
              <Radio value={"OA장비"}>OA장비 </Radio>
            </Radio.Group>
          </RadioBlock>
        </Form.Group>
        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            팀장 승인
          </Form.Label>
          <label className="marginleft" />
          <RadioBlock>
            <Checkbox onChange={tMApporvalonChange}></Checkbox>
            <label className="marginleft">
              체크박스를 선택하시면 팀장에게 승인요청이 됩니다.
            </label>
            <Form.Text style={{ color: "red" }}>
              ※ 승인 필요 사항 : 업무프로세스 변경에 따른 시스템 개선, 중요
              데이터의 변경, 투자 필요 사항
            </Form.Text>
          </RadioBlock>
        </Form.Group>

        <br></br>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            제목
          </Form.Label>
          <Col sm="10" onChange={titleHandler}>
            <Form.Control type="text" />
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
          <Col sm="10" onChange={contentHandler}>
            <Form.Control as="textarea" maxLength={500} required rows={5} />
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
          <Col sm="2">
            <MarginBlock>
              <Datepicker change={finishDateHandler} />
              {Object.keys(dateError).map((key) => {
                return (
                  <div
                    style={{
                      color: "red",
                      fontSize: "13px",
                      marginLeft: "6px",
                    }}
                  >
                    {dateError[key]}
                  </div>
                );
              })}
            </MarginBlock>
          </Col>
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
          요청하기
        </Button>
      </form>
    </ITSRBlock>
  );
}

export default ITSRPage;
