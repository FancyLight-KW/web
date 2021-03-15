import React, { useState } from "react";
import "./Request.css";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Radio } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import axios from "axios";
import Datepicker from "../Datepicker";
import SkeletonImage from "antd/lib/skeleton/Image";

// border: 1px solid black;
const RateBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  padding: 30px;
  border-radius: 5px;
`;
const RadioBlock = styled.div`
  position: relative;
  top: 8px;
`;
const MarginBlock = styled.div`
  position: relative;
  top: 5px;
`;

function Request() {
  const 법인코드 = "법인코드";
  const CSR진행상태 = "CSR진행상태";
  const 임시저장 = "w";

  const [TargetCode, setTargetCode] = useState("업무시스템");
  const [SystemGroupCode, setSystemGroupCode] = useState("test");
  const [TMApprovalReqYN, setTMApprovalReqYN] = useState("true");
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [File, setFile] = useState("");

  const dateChanger = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month > 9 ? month : "0" + month;
    day = day > 9 ? day : "0" + day;

    return String(year + month + day);
  };

  const [ReqFinishDate, setReqFinishDate] = useState(dateChanger(new Date()));

  // const [RegUserID, setRegUserID] = useState("");

  const targetCodeHandler = (e) => {
    console.log(e.target.value);
    setTargetCode(e.target.value);
  };

  const dropdownOnChange = (e) => {
    console.log(e.target.value);
    setSystemGroupCode(e.target.value);
  };

  const tMApporvalonChange = (e) => {
    setTMApprovalReqYN(!TMApprovalReqYN);
    console.log(TMApprovalReqYN);
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const file = new FormData();

  const fileHandler = (e) => {
    file.append("filename", e.target.files[0]);
    setFile(file);
    console.log(file.name);
    console.log(File);
    console.log(imagefile);
  };

  const finishDateHandler = (date) => {
    setReqFinishDate(date);
    // console.log(ReqFinishDate);
  };

  const onSubmitHandler = (e) => {
    // Form 제출
    e.preventDefault();

    let body = {
      TARGET_CODE: TargetCode,
      SYSTEM_GROUP_CODE: SystemGroupCode,
      TM_APPROVAL_REQ_YN: TMApprovalReqYN,
      TITLE: Title,
      CONTENT: Content,
      REQ_FINISH_DATE: ReqFinishDate,
      CORP_CODE: 법인코드,
      CSR_STATUS: CSR진행상태,
      IMSI_YN: 임시저장,
    };

    console.log(body);

    axios
      .post("http://localhost:5000/requests/newRequest/", body)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <RateBlock>
      <form onSubmit={onSubmitHandler}>
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
              <Radio value={"QA장비"}>QA장비 </Radio>
            </Radio.Group>
          </RadioBlock>
        </Form.Group>
        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            시스템명
          </Form.Label>
          <Col sm="3">
            <Form.Control as="select" onChange={dropdownOnChange}>
              <option value={"test"}>0</option>
              <option value={"test2"}>1</option>
            </Form.Control>
          </Col>
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
            <Form.Text className="redText">
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
          </Col>
        </Form.Group>

        <br></br>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            요청내용
          </Form.Label>
          <Col sm="10" onChange={contentHandler}>
            <Form.Control as="textarea" rows={5} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            요청만료일
          </Form.Label>
          <Col sm="2">
            <MarginBlock>
              <Datepicker change={finishDateHandler} />
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
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              name="imagefile"
              onChange={fileHandler}
            ></input>
            <Form.Text muted>
              (첨부 가능 파일 확장자: jpg, png, doc, docx)
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="1">
            요청자
          </Form.Label>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="1">
            요청자이름
          </Form.Label>
        </Form.Group>

        <button>요청하기</button>
      </form>
    </RateBlock>
  );
}

export default Request;
