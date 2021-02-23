import React, { useState } from "react";
import "./ServiceRequest.css";
import { Row, Col } from "react-bootstrap";
import styled, { css } from "styled-components";
import Form from "react-bootstrap/Form";
import { Radio } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

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

function ServiceRequestPage() {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
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
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>업무시스템</Radio>
              <label className="marginleft" />
              <Radio value={2}>IT인프라 </Radio>
              <label className="marginleft" />
              <Radio value={3}>QA장비 </Radio>
            </Radio.Group>
          </RadioBlock>
        </Form.Group>
        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            시스템명
          </Form.Label>
          <Col sm="3">
            <Form.Control as="select">
              <option>0</option>
              <option>1</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            팀장 승인
          </Form.Label>
          <label className="marginleft" />
          <RadioBlock>
            <Checkbox></Checkbox>
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
          <Col sm="10">
            <Form.Control type="text" />
          </Col>
        </Form.Group>

        <br></br>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            요청내용
          </Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" rows={5} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="normalForm">
          <Form.Label column sm="1" className="labelColor">
            요청만료일
          </Form.Label>
          <Col sm="1">
            <Form.Control type="text" placeholder="2021/01/01" />
          </Col>
        </Form.Group>

        <br></br>

        <Form.Group as={Row}>
          <Form.Label column sm="1" className="labelColor">
            첨부파일
          </Form.Label>
          <Col sm="5">
            <Form.File id="formcheck-api-regular">
              <Form.File.Input />
            </Form.File>
            <Form.Text muted>
              (첨부 가능 파일 확장자: jpg, doc, docx){" "}
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
      </form>
    </RateBlock>
  );
}

export default ServiceRequestPage;
